import React, { useState } from 'react';
import '../../../css/createtour.css';
import { createTour } from '../../../js/createTour';

export default function CreateTour() {
  const [imageCover, setImageCover] = useState('default-tour.jpg');
  const [img_1, setImg_1] = useState('default-tour.jpg');
  const [img_2, setImg_2] = useState('default-tour.jpg');
  const [img_3, setImg_3] = useState('default-tour.jpg');
  const [num, setNum] = useState(0);

  let locations = [];
  for (let i = 0; i < num; i++) {
    locations.push(i);
  }

  const handlePhoto = (img) => (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (img === 'cover') setImageCover(e.target.result);
        if (img === 'img_1') setImg_1(e.target.result);
        if (img === 'img_2') setImg_2(e.target.result);
        if (img === 'img_3') setImg_3(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createTour(e);
  };

  return (
    <form
      className='create-tour-container'
      encType='multipart/form-data'
      onSubmit={handleSubmit}
    >
      <div className='input-group'>
        <label htmlFor='name'>name</label>
        <input type='text' required name='name' id='name' minLength='5' />
      </div>
      <div className='section-input'>
        <div className='input-group'>
          <label htmlFor='duration'>duration</label>
          <input
            type='number'
            required
            name='duration'
            id='duration'
            minLength='1'
            min='1'
          />
        </div>
        <div className='input-group'>
          <label htmlFor='maxGroupSize'>max group size</label>
          <input
            type='number'
            required
            name='maxGroupSize'
            id='maxGroupSize'
            minLength='1'
            min='1'
          />
        </div>
        <div className='input-group'>
          <label htmlFor='difficulty'>difficulty</label>
          <input
            list='list'
            required
            name='difficulty'
            id='difficulty'
            minLength='1'
            min='1'
          />
          <datalist id='list'>
            <option value='easy'></option>
            <option value='medium'></option>
            <option value='difficult'></option>
          </datalist>
        </div>
        <div className='input-group'>
          <label htmlFor='price'>price</label>
          <input
            type='number'
            required
            name='price'
            id='price'
            minLength='1'
            min='1'
          />
        </div>
      </div>
      <div className='input-group summary'>
        <label htmlFor='summary'>summary</label>
        <textarea
          name='summary'
          id='summary'
          required
          minLength='10'
        ></textarea>
      </div>
      <div className='input-group description'>
        <label htmlFor='description' minLength='10'>
          description
        </label>
        <textarea
          name='description'
          id='description'
          rows='6'
          required
        ></textarea>
      </div>
      <div className='input-group'>
        <label htmlFor='startDates'>start dates</label>
        <div className='start-dates__input'>
          <input type='datetime-local' name='startDates_1' id='startDates' />
          <input type='datetime-local' name='startDates_2' id='startDates' />
          <input type='datetime-local' name='startDates_3' id='startDates' />
        </div>
      </div>
      <div className='startLocation'>
        <h2>start location: </h2>
        <div className='input-group discriptionLocation'>
          <label htmlFor='description'>description</label>
          <input
            type='text'
            name='description_startLocation'
            id='description-location'
            minLength='1'
          />
        </div>
        <div className='input-group'>
          <label htmlFor='address'>address</label>
          <input
            type='text'
            name='address_startLocation'
            id='address'
            minLength='1'
          />
        </div>
        <div className='input-group'>
          <label htmlFor='coordinates'>coordinates</label>
          <div className='coordinates__input'>
            <input
              type='number'
              name='lag_startLocation'
              id='lag'
              step='0.00000000001'
              placeholder='longitude'
            />
            <input
              type='number'
              name='lat_startLocation'
              id='lat'
              step='0.00000000001'
              placeholder='latitude'
            />
          </div>
        </div>
      </div>

      {/*  */}
      <div className='locations'>
        <div className='locations__number'>
          <label>number of locations:</label>
          <input
            type='number'
            name='num'
            onChange={(e) => setNum(e.target.value)}
          />
        </div>
        {locations.map((num, i) => {
          return (
            <div key={i} className='locations__location-container'>
              <h2>location {i + 1}: </h2>
              <div className='input-group discriptionLocation'>
                <label htmlFor='description'>description</label>
                <input
                  type='text'
                  name={`description_location${i + 1}`}
                  id='description-location'
                  minLength='1'
                />
              </div>

              <div className='input-group'>
                <label htmlFor='coordinates'>coordinates</label>
                <div className='coordinates__input'>
                  <input
                    type='number'
                    name={`lag_location${i + 1}`}
                    id='lag'
                    step='0.00000000001'
                    placeholder='longitude'
                  />
                  <input
                    type='number'
                    name={`lat_location${i + 1}`}
                    id='lat'
                    step='0.00000000001'
                    placeholder='latitude'
                  />
                </div>
              </div>
              <div className='input-group day__number'>
                <label htmlFor='day'>day</label>
                <input
                  type='number'
                  name={`day_location${i + 1}`}
                  id='day'
                  minLength='1'
                  min='1'
                />
              </div>
            </div>
          );
        })}
      </div>
      {/*  */}

      <div className='input-group__imageCover-container'>
        <img src={imageCover} alt='' className='img-container__img' />
        <label htmlFor='imageCover' className='input-img photo-btn'>
          Cover Image
        </label>
        <input
          type='file'
          accept='image/*'
          id='imageCover'
          name='imageCover'
          required
          onChange={handlePhoto('cover')}
        />
      </div>
      <div className='input-group__images-container'>
        <div className='images-container__img-container'>
          <img src={img_1} alt='' className='img-container__img_1' />
          <label htmlFor='img_1' className='input-img photo-btn'>
            first image
          </label>
          <input
            type='file'
            accept='image/*'
            id='img_1'
            name='img_1'
            onChange={handlePhoto('img_1')}
          />
        </div>
        <div className='images-container__img-container'>
          <img src={img_2} alt='' className='img-container__img_2' />
          <label htmlFor='img_2' className='input-img photo-btn'>
            socend image
          </label>
          <input
            type='file'
            accept='image/*'
            id='img_2'
            name='img_2'
            onChange={handlePhoto('img_2')}
          />
        </div>
        <div className='images-container__img-container'>
          <img src={img_3} alt='' className='img-container__img_3' />
          <label htmlFor='img_3' className='input-img photo-btn'>
            third image
          </label>
          <input
            type='file'
            accept='image/*'
            id='img_3'
            name='img_3'
            onChange={handlePhoto('img_3')}
          />
        </div>
      </div>
      <button className='create-tour__btn'>create tour</button>
    </form>
  );
}
