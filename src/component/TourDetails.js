import React, { useContext, useEffect, useState } from 'react';
import { request } from '../js/axios';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiTrendingUp, BiUser } from 'react-icons/bi';
import { BsStar } from 'react-icons/bs';
import { getMonthYear } from '../js/date';
import Map from './Map';
// import { showAlert } from '../js/alert';
import { myContext } from '../Context';
import { useParams } from 'react-router';

function TourDetails() {
  // const { state } = useLocation();
  // let id;
  // if (state) id = state.tourId;
  const { slug } = useParams();

  const { currentUser, allTours } = useContext(myContext);

  const [reviews, setReviews] = useState([]);

  const tour = allTours.find((tour) => tour.slug === slug);
  // if (!tour) showAlert('fail', 'tour not found', 3);

  useEffect(() => {
    const getReviews = async () => {
      if (tour) {
        const data = await request('GET', `/api/v1/tours/${tour.id}/reviews`);
        if (data.data.status === 'success') {
          setReviews(data.data.data.reviews);
        }
      }
    };
    getReviews();
  }, [tour]);

  // if there is a response
  if (tour) {
    document.title = `Natours | ${tour.name} `;
    const { month, year } = getMonthYear(tour.startDates[0]);

    return (
      <div className='tour_details'>
        <div className='hero_container'>
          <div className='hero_img_container'>
            <img
              className='hero_img'
              src={`http://localhost:5000/public/img/tours/${tour.imageCover}`}
              alt={tour.name}
            />
          </div>
          <div className='hero_details'>
            <h3 className='hero_name'>
              <span>{tour.name} tour</span>
            </h3>
          </div>
        </div>
        <section className='tour-description-container'>
          <div className='overview-box'>
            <div className='overview-box__group'>
              <h2 className='overview-box__group__heading'>quick facts</h2>
              <div className='overview-box__group__el'>
                <AiOutlineCalendar className='overview-box__group__el__img' />
                <p className='overview-box__group__el__p'>
                  <span>next date</span>
                  {month} {year}
                </p>
              </div>
              <div className='overview-box__group__el'>
                <BiTrendingUp className='overview-box__group__el__img' />
                <p className='overview-box__group__el__p'>
                  <span>difficulty</span>
                  {tour.difficulty}
                </p>
              </div>
              <div className='overview-box__group__el'>
                <BiUser className='overview-box__group__el__img' />
                <p className='overview-box__group__el__p'>
                  <span>participants</span>
                  {tour.maxGroupSize} people
                </p>
              </div>
              <div className='overview-box__group__el'>
                <BsStar className='overview-box__group__el__img' />
                <p className='overview-box__group__el__p'>
                  <span>rating</span>
                  {tour.ratingsAverage} / 5
                </p>
              </div>
            </div>
            <div className='overview-box__group'>
              <h2 className='overview-box__group__heading'>your tour guides</h2>
              {tour.guides.map((guide, i) => {
                return (
                  <div key={i} className='overview-box__group__el'>
                    <img
                      className='overview-box__group__el__img__user'
                      src={`http://localhost:5000/public/img/users/${guide.photo}`}
                      alt={guide.name}
                    />
                    <p className='overview-box__group__el__p'>
                      <span>
                        {guide.role === 'lead guide'
                          ? 'lead guide'
                          : 'tour guide'}
                      </span>
                      {guide.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='description-box'>
            <h2 className='overview-box__group__heading'>
              about {tour.name} tour
            </h2>
            <p className='description-box__p'>{tour.description}</p>
          </div>
        </section>
        <section className='tour-details__imgs-container'>
          <div className='tour-details__imgs-container__imgs'>
            {tour.images.map((img, i) => {
              return (
                <img
                  key={i}
                  src={`http://localhost:5000/public/img/tours/${img}`}
                  alt={img}
                  className='tour-details__imgs-container__img'
                />
              );
            })}
          </div>
        </section>
        <section className='tour-details__map'>
          <Map locations={tour.locations} />
        </section>
        <section className='tour-details__reviews'>
          <div className='tour-details__reviews-container'>
            {reviews.map((review, i) => {
              const userImg = review.user.photo;
              return (
                <div key={i} className='review-card'>
                  <div className='review-card__user'>
                    <img
                      className='review-card__user-img'
                      src={`http://localhost:5000/public/img/users/${userImg}`}
                      alt={review.user.name}
                    />
                    <p>{review.user.name}</p>
                  </div>
                  <div className='review-card__p-1'>
                    <div className='review-card__p-2'>{review.review}</div>
                  </div>
                  <div className='review-card__rating'>
                    {[1, 2, 3, 4, 5].map((star, i) => {
                      return (
                        <BsStar
                          key={i}
                          className={
                            review.rating >= star
                              ? 'active star'
                              : 'inactive star'
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className='section-cta'>
          <div className='section-cta__imgs'>
            <div className='section-cta__imgs__logo-container'>
              <img
                className='section-cta__logo'
                src={`http://localhost:5000/public/img/logo/logo-white.png`}
                alt='logo'
              />
            </div>
            <img
              className='section-cta__img section-cta__img-1'
              src={`http://localhost:5000/public/img/tours/${tour.images[1]}`}
              alt='tour-img'
            />
            <img
              className='section-cta__img section-cta__img-2'
              src={`http://localhost:5000/public/img/tours/${tour.images[2]}`}
              alt='tour-img'
            />
          </div>
          <div className='section-cta__q'>
            <h2>what are you waiting for?</h2>
            <p>
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
          </div>
          {currentUser ? (
            <button className='booking-btn'>book tour now!</button>
          ) : (
            <button
              onClick={() => (window.location.href = '/login')}
              className='booking-btn'
            >
              log in to book tour
            </button>
          )}
        </section>
      </div>
    );
  } else {
    return null;
  }
}

export default TourDetails;
