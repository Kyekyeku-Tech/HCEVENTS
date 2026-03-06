import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* LAYOUT */
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Portfolio from "./pages/Portfolio";
import PortfolioCategory from "./pages/PortfolioCategory";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";

/* ADMIN */
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import AdminApprovals from "./admin/AdminApprovals";
import Dashboard from "./admin/Dashboard";
import ManagePortfolio from "./admin/ManagePortfolio";
import UploadPortfolio from "./admin/UploadPortfolio";
import ManageServices from "./admin/ManageServices";
import EditService from "./admin/EditService";
import ManageBookings from "./admin/ManageBookings";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        <Route path="/portfolio" element={<Portfolio />} />
        <Route
          path="/portfolio/:category"
          element={<PortfolioCategory />}
        />

        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<BookAppointment />} />

        {/* ADMIN LOGIN & SIGNUP */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="approvals" element={<AdminApprovals />} />
          <Route path="portfolio" element={<ManagePortfolio />} />
          <Route path="portfolio/upload" element={<UploadPortfolio />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="services/:id" element={<EditService />} />
          <Route path="bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}
