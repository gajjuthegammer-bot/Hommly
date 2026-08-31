import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home/Home';
import Blogs from './Blogs/Blogs';
import Properties from './Properties/Properties';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import About_us from './About_us/About_us';
import ScrollToTop from './ScrollToTop';
import LoginModal from './LoginModal';
import RagistrationModal from "./RagistrationModal"
import Profile from './UserProfile/Profile';
import Propertiesdetails from './Propertiesdetails/Propertydetails';
import AdminDashboard from './admin/page';
// import RootLayout from './admin/layout';
// import App from './admin/realty-complete/app/page';
// import RootLayout from './admin/realty-complete/app/layout';
// import AdminDashboard from './admin/dashboard';
import Contact from './Contact/Contact';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
  <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/About_us" element={<About_us />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/properties" element={<Properties />} />
       <Route path="/login" element={<LoginModal />} />
       <Route path="/ragistration" element={<RagistrationModal />} />
      <Route path="/Property-details" element={<Propertiesdetails />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/contact" element={<Contact/>} />

    </Routes>
  </BrowserRouter>
  
 
  </>
  
);



