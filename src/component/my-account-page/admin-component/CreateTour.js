import React, { useState } from 'react';
import '../../../css/createtour.css';

export default function CreateTour() {
  const [imageCover, setImageCover] = useState('default-tour.jpg');
  const [img_1, setImg_1] = useState('default-tour.jpg');
  const [img_2, setImg_2] = useState('default-tour.jpg');
  const [img_3, setImg_3] = useState('default-tour.jpg');

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
  return (
    <form className='create-tour-container'>
      <div className='input-group'>
        <label htmlFor='name'>name</label>
        <input type='text' required name='name' id='name' minLength='5' />
      </div>
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
      <div className='input-group'>
        <label htmlFor='summary'>summary</label>
        <textarea name='summary' id='summary' rows='6'></textarea>
      </div>
      <div className='input-group'>
        <label htmlFor='description'>description</label>
        <textarea name='description' id='description' rows='6'></textarea>
      </div>
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
    </form>
  );
}
