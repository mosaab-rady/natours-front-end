import React from 'react';
import '../../../css/managetour.css';
import { getMonthYear } from '../../../js/date';
import { BiUser } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FiFlag, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ManageTour({
  id,
  imageCover,
  name,
  ratingsAverage,
  ratingsQuantity,
  duration,
  maxGroupSize,
  difficulty,
  summary,
  price,
  stops,
  startLocation,
  startDate,
  slug,
}) {
  const { month, year } = getMonthYear(startDate);
  return (
    <div className='manage-tours__single-tour'>
      {/* display the image cover and name of the tour */}
      <div className='single-tour__header'>
        <div className='single-tour__img-container'>
          <img
            className='single-tour__img'
            src={`http://localhost:5000/public/img/tours/${imageCover}`}
            alt={name}
          />
        </div>
        <h3 className='single-tour__name'>
          <span>{name}</span>
        </h3>
      </div>
      {/* for the over view details of the tour */}
      <div className='single-tour__details-container'>
        <h4>
          {difficulty} {duration}-day tour
        </h4>
        <p>{summary}</p>
        <div className='single-tour__card-data'>
          <div className='single-tour__card-el'>
            <FiMapPin className='single-tour__card-el__icon' />
            <span>{startLocation}</span>
          </div>
          <div className='single-tour__card-el'>
            <AiOutlineCalendar className='single-tour__card-el__icon' />
            <span>
              {month} {year}
            </span>
          </div>
          <div className='single-tour__card-el'>
            <FiFlag className='single-tour__card-el__icon' />
            <span>{stops} stops</span>
          </div>
          <div className='single-tour__card-el'>
            <BiUser className='single-tour__card-el__icon' />
            <span>{maxGroupSize} people</span>
          </div>
        </div>
      </div>
      {/* for the price and booking bottun */}
      <div className='single-tour__card-footer'>
        <div className='single-tour__footer-data'>
          <div className='single-tour__footer-data__el'>
            <span className='single-tour__footer__price'>${price}</span>
            <span className='single-tour__footer-data__el__detail'>
              per person
            </span>
          </div>
          <div className='single-tour__footer-data__el'>
            <span className='single-tour__footer__price'>{ratingsAverage}</span>
            <span className='single-tour__footer-data__el__detail'>
              rating({ratingsQuantity})
            </span>
          </div>
        </div>
        <Link
          to={{ pathname: `/tour/${slug}`, state: { tourId: id } }}
          className='single-tour__link '
        >
          details
        </Link>
      </div>
      <div className='single-tour__buttons'>
        <button className='single-tour__button'>update</button>
        <button className='single-tour__button'>delete</button>
      </div>
    </div>
  );
}
