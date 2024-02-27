import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SensorData = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchId, setSearchId] = useState('');
  const page_size = 10

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
      let url = `http://localhost:5000/sensor/fetch-records/${searchId.trim()}?page=${page}&page_size=${page_size}`;
      // if (searchId.trim() !== '') {
      //   url += `&id=${searchId}`;
      // }
      const response = await axios.get(url);
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

  const handleSearch = () => {
    setCurrentPage(1); // Reset pagination to first page when searching
    fetchData(1);
  };

  return (
    <div>
      <h2>Sensor Data</h2>
      <div>
        <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Enter Device Id" />
        <button onClick={handleSearch}>Search</button>
      </div>
      <h4>Sensor records for Device ID: {searchId}</h4>
      <ul>
        {data.map((item) => (
          <li key={item.id}><b>{(new Date(item._ts*1000)).toUTCString()}</b> || Sensor Data changed - Sensor Data changed - SensorType: {sensor_mapping[item.sensor_type]}, Values: {item.sensor_values}</li>
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
