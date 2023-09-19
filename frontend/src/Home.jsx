import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Fetch student data when the component mounts and when the route changes.
    axios.get('http://localhost:3001/')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [location.pathname]); // Use location.pathname as a dependency to update when the route changes.

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        // Remove the deleted student from the data state.
        setData(prevData => prevData.filter(item => item.id !== id));
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-40 bg-white rounded p-3'>
        <h2>Student List</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Create +</Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>
                  <Link to={`/read/${item.id}`} className="btn btn-sm btn-info">
                    Read
                  </Link>
                  <Link to={`/edit/${item.id}`} className="btn btn-sm btn-primary mx-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
