// SensorData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const page_size = 1

  const sensor_mapping = {
    1: 'Accelerometer',
    2: 'Magnetic Field',
    3: 'Orientation',
    4: 'Gyroscope',
    5: 'Light',
    6: 'Pressure',
    7: 'Temperature',
    8: 'Proximity',
    9: 'Gravity'
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/sensor/fetch-records/db4ac844e527638d?page=${page}&page_size=${page_size}`);
      console.log(response)
      if (response?.data?.records == [] || response.data.total_count == 0){
        setData([]);
        setTotalPages(1)
      }
      else{
        setData(response.data.records);
        setTotalPages(Math.ceil(response.data.total_count / page_size) );
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>Sensor Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{(new Date(item._ts*1000)).toUTCString()} | {item.device_id}</li>
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

export default SensorData;
