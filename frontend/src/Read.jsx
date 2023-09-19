import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Read = () => {
  const [items, setItems] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/read/${id}`)
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-40 bg-white rounded p-3'>
            <div className='p-2'>
          <h2>Student Detail</h2>
          <h2>ID: {items.id}</h2>
          <h2>Name: {items.Name}</h2>
          <h2>Email: {items.Email}</h2>
          </div>
          <Link to="/" className="btn btn-primary me-2">Back</Link>
          <Link to={`/edit/${items.id}`} className='btn btn-info'>Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
