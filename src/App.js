import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const theme = {
  token: {
    colorPrimary: '#FFA500',
    colorSecondary: '#8B4513',
   
    colorBackground: '#FFFFFF',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
