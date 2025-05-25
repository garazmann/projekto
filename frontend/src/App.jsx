import { useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

function App() {
  

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
      </div>
    </>
  );
}

export default App;
