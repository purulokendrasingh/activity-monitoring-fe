// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SensorData from './components/SensorData';
import LocationData from './components/LocationData';
import DeviceState from './components/DeviceState';
import ConnectivityData from './components/ConnectivityData';
import BatteryUsage from './components/BatteryUsage';
import UsageStats from './components/UsageStats';
import AdditionalData from './components/AdditionalData';
import AccessibilityEvents from './components/AccessibilityEvents';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/sensor">Sensor Data</Link>
            </li>
            <li>
              <Link to="/location">Location Data</Link>
            </li>
            <li>
              <Link to="/device">Device State</Link>
            </li>
            <li>
              <Link to="/connectivity">Connectivity Data</Link>
            </li>
            <li>
              <Link to="/battery">Battery Usage</Link>
            </li>
            <li>
              <Link to="/usage">Usage Stats</Link>
            </li>
            <li>
              <Link to="/additional">Additional Data</Link>
            </li>
            <li>
              <Link to="/accessibility">Accessibility Events</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/"  element={<Dashboard />} />
          <Route path="/sensor" element={<SensorData />} />
          <Route path="/location" element={<LocationData />} />
          <Route path="/device" element={<DeviceState />} />
          <Route path="/connectivity" element={<ConnectivityData />} />
          <Route path="/battery" element={<BatteryUsage />} />
          <Route path="/usage" element={<UsageStats />} />
          <Route path="/additional" element={<AdditionalData />} />
          <Route path="/accessibility" element={<AccessibilityEvents />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
