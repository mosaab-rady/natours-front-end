import React, { useEffect, useState } from 'react';
import '../../../css/managebooking.css';
// import { myContext } from '../../../Context';

import { request } from '../../../js/axios';

export default function ManageBookings() {
  const [bookings, setBookings] = useState();

  useEffect(() => {
    const getAllBookings = async () => {
      const response = await request('GET', '/api/v1/bookings');
      if (response) {
        if (response.data.status === 'success') {
          setBookings(response.data.data.bookings);
        }
      }
    };
    getAllBookings();
  }, []);

  console.log(bookings);

  if (bookings) {
    if (bookings.length >= 1) {
      return (
        <div className='bookings-table'>
          <table>
            <thead>
              <tr>
                <th className='table__el'>tour</th>
                <th className='table__el'>user name</th>
                <th className='table__el'>user email</th>
                <th className='table__el'>price</th>
                <th className='table__el'>paid</th>
                <th className='table__el'>time</th>
              </tr>
            </thead>
            {bookings.map((booking, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td className='table__el'>{booking.tour.name} tour</td>
                    <td className='table__el'>
                      {booking.user.name.split(' ')[0]}
                    </td>
                    <td className='table__el'>{booking.user.email}</td>
                    <td className='table__el'>{booking.price}</td>
                    <td className='table__el'>
                      {booking.paid ? 'true' : 'false'}
                    </td>
                    <td className='table__el'>
                      {booking.createdAt.split('T')[0]}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        // <div className='manage-bookings'>
        //   {bookings.map((booking, i) => {
        //     return (
        //       <div className='booking-container' key={i}>
        //         <div className='booking-container__group'>
        //           <h2>tour</h2>
        //           <h3>{booking.tour.name} tour</h3>
        //         </div>
        //         <div className='booking-container__group'>
        //           <h2>user name</h2>
        //           <h3>{booking.user.name}</h3>
        //         </div>
        //         <div className='booking-container__group'>
        //           <h2>user email</h2>
        //           <h4>{booking.user.email}</h4>
        //         </div>
        //         <div className='booking-container__group'>
        //           <h2>price</h2>
        //           <h3>
        //             <span>$</span>
        //             {booking.price}
        //           </h3>
        //         </div>
        //         <div className='booking-container__group'>
        //           <h2>paid</h2>
        //           <h3>{booking.paid ? 'true' : 'false'}</h3>
        //         </div>
        //         <div className='booking-container__group'>
        //           <h2>time</h2>
        //           <h3>{booking.createdAt.split('T')[0]}</h3>
        //         </div>
        //       </div>
        //     );
        //   })}
        // </div>
      );
    }
    if (bookings.length < 1) {
      return (
        <div className='my-reviews'>
          <h1>No Bookings</h1>
        </div>
      );
    }
  } else {
    return (
      <div className='my-reviews'>
        <div className='loading'></div>
      </div>
    );
  }
}
