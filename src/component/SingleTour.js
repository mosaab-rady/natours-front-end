import React from 'react';

export default function SingleTour({
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
}) {
  return (
    <div className='tour_container'>
      <div className='img_container'>
        <img
          className='singleTour_img'
          src={`http://localhost:5000/public/img/tours/${imageCover}`}
          alt=''
        />
      </div>
      <div className='details_container'>
        <h1>details</h1>
      </div>
    </div>
  );
}
