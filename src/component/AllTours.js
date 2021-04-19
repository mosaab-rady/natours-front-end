import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleTour from './SingleTour';

const AllTours = () => {
  document.title = 'Natours | All Tours';
  const [tours, setTours] = useState([]);

  // get the tours from back-end server
  const getData = async () => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/tours',
    });
    setTours(response.data.data.tours);
  };

  // runs after the page rendered
  useEffect(() => {
    getData();
  }, []);
  // the rendered page
  return (
    <div className='tours_container'>
      {tours.map((tour, id) => (
        <SingleTour
          key={id}
          id={tour.id}
          imageCover={tour.imageCover}
          name={tour.name}
          ratingsAverage={tour.ratingsAverage}
          ratingsQuantity={tour.ratingsQuantity}
          duration={tour.duration}
          maxGroupSize={tour.maxGroupSize}
          difficulty={tour.difficulty}
          summary={tour.summary}
          price={tour.price}
          stops={tour.locations.length}
          startLocation={tour.startLocation.description}
          startDate={tour.startDates[0]}
        />
      ))}
    </div>
  );
};

export default AllTours;
