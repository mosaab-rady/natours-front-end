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
    <div className='all_tours'>
      {tours.map((tour, id) => (
        <SingleTour key={id} img={tour.imageCover} name={tour.name} />
      ))}
    </div>
  );
};

export default AllTours;
