import React from 'react';
import '../../../css/manageusers.css';
import { request } from '../../../js/axios';
import { showAlert } from '../../../js/alert';

export default function ManageUsers({ users }) {
  // const handleUpdateUser = (id) => async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.role.value);
  //   console.log(id);
  //   // const response = await request('PATCH', `/api/v1/users/${id}`);
  //   // if (response) {
  //   //   if (response.data.status === 'success') {
  //   //     showAlert('success', 'user updated', 1.5);
  //   //   }
  //   //   if (response.data.status !== 'success') {
  //   //     showAlert('fail', response.data.message, 3);
  //   //   }
  //   // }
  // };

  const deleteUser = (id) => async (e) => {
    e.preventDefault();
    const response = await request('DELETE', `/api/v1/users/${id}`);
    if ((response.status = 204)) {
      showAlert('success', 'user deleted', 1.5);
    }
    if (response.status !== 204) {
      showAlert('fail', response.data.message, 3);
    }
  };

  if (users) {
    return (
      <div className='users-container'>
        {users.map((user, i) => {
          return (
            <div className='users-container___user' key={i}>
              <div className='user-container__user__header'>
                <img
                  className='signup__photo'
                  src={`http://localhost:5000/public/img/users/${user.photo}`}
                  alt={user.name.split(' ')[0]}
                />
                <h2>{user.name}</h2>
              </div>
              <div className='user-container__user__email'>
                <label>email</label>
                <input value={user.email} readOnly></input>
              </div>

              <div className='user-container__user__role'>
                <label>role</label>
                <input value={user.role || ''} readOnly></input>
              </div>
              <form>
                <label>make {user.name.split(' ')[0]}</label>
                 <input type="radio" id="male" name="gender" value="male">
                                  <label for="male">Male</label><br>
                    <input type="radio" id="female" name="gender" value="female">
                    <label for="female">Female</label><br>
                    <input type="radio" id="other" name="gender" value="other">
                    <label for="other">Other</label>
              </form>

              <button
                className='delete-user__btn'
                onClick={deleteUser(user._id)}
              >
                delete user
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <h1>no users yet</h1>;
  }
}
