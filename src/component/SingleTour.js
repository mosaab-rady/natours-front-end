import React from 'react';

export default function SingleTour({ img, name }) {
  console.log(img);
  return (
    <div className='single_tour'>
      <img src={`http://localhost:5000/public/img/tours/${img}`} alt='' />
      <h1>{name}</h1>
    </div>
  );
}
