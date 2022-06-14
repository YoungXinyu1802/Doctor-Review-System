import 'antd/dist/antd.min.css'
import './App.css'
import React from 'react'

import {Route,  Routes} from 'react-router-dom';

import Home from './pages/Home'
import HomePage from "./pages/HomePage/main";
import Department from "./pages/Department/department";
import DoctorHome from "./pages/DocterHome/DocterHome";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/department" element={<Department />} />
                <Route path="/doctorHome" element={<DoctorHome />} />
            </Routes>
        </div>
    );
}
export default App;
