import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/read/${id}`)
      .then((res) => {
        console.log(res);
        setValues({
          name: res.data[0].Name || '',
          email: res.data[0].Email || '',
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/update/${id}`,values)
    .then(res => {
        console.log(res)
        navigate('/')
    }).catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleFormSubmit}>
          <h2>Update Student</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter Name'
              className='form-control'
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Enter Email'
              className='form-control'
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <button type='submit' className='btn btn-success'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
