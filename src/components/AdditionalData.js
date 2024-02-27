// SensorData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdditionalData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const page_size = 1

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/additional-data/fetch-records/db4ac844e527638d?page=${page}&page_size=${page_size}`);
      console.log(response)
      setData(response.data.records);
      setTotalPages(Math.ceil(response.data.total_count / page_size));
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>Additional Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.id} | {item.device_id} | {item.battery_percentage}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdditionalData;
