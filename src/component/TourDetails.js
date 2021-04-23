// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Alert from './Alert';
import Error from './Error';
import { getData } from '../js/axios';

import { AiOutlineCalendar } from 'react-icons/ai';
import { BiTrendingUp, BiUser } from 'react-icons/bi';
import { BsStar } from 'react-icons/bs';
import { getMonthYear } from '../js/date';
import Map from './Map';

function TourDetails() {
  const { id } = useParams();
  const [response, setResponse] = useState();
  const [reviews, setReviews] = useState([]);

  let tour = {};
  let err;

  useEffect(() => {
    const getTour = async () => {
      const data = await getData(
        'GET',
        `http://localhost:5000/api/v1/tours/${id}`
      );
      setResponse(data);
    };
    getTour();

    const getReviews = async () => {
      const data = await getData(
        'GET',
        `http://localhost:5000/api/v1/tours/${id}/reviews`
      );
      if (data.data.status === 'success') {
        setReviews(data.data.data.reviews);
      }
    };
    getReviews();
  }, [id]);

  // if there is a response
  if (response) {
    // check if the res is success
    if (response.data.status === 'success') {
      // get the tour from response
      tour = response.data.data.tour;
      // set the page title
      document.title = `Natours | ${tour.name} `;
      const { month, year } = getMonthYear(tour.startDates[0]);
      const paragraphs = tour.description.split('\n');
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
                <h2 className='overview-box__group__heading'>
                  your tour guides
                </h2>
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
              {paragraphs.map((p, i) => {
                return (
                  <p key={i} className='description-box__p'>
                    {p}
                  </p>
                );
              })}
            </div>
          </section>
          <section className='tour-details__imgs-container'>
            {tour.images.map((img, i) => {
              return (
                <div
                  key={i}
                  className='tour-details__imgs-container__img-container'
                >
                  <img
                    src={`http://localhost:5000/public/img/tours/${img}`}
                    alt={img}
                    className='tour-details__imgs-container__img'
                  />
                </div>
              );
            })}
          </section>
          <section className='tour-details__map'>
            <Map locations={tour.locations} />
          </section>
          <section className='tour-details__reviews-container'>
            {reviews.map((review, i) => {
              return (
                <div
                  key={i}
                  className='tour-details__reviews-conyainer__review-container'
                ></div>
              );
            })}
          </section>
        </div>
      );
    }
    // if there is an error
    if (response.data.status === 'fail' || response.data.status === 'error') {
      err = response.data.data;
      if (response.data.status === 'error') {
        return <Error err={err} />;
      }
      if (response.data.status === 'fail') {
        return <Alert error={err} status='fail' />;
      }
    }
  } else {
    return null;
  }
}

export default TourDetails;
