import { useState } from "react";

import MainLayout from "../components/layout/MainLayout";
import HeroSection from "../components/home/HeroSection";

import ServicesSection from "../components/home/ServicesSection";

import { searchTrips } from "../api/tripApi";


import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();

  const handleSearch = async (data) => {
    try {

      const response = await searchTrips(data);

      navigate("/search-results", {
        state: {
          trips: response.data,
          searchData: data,
        },
      });

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <MainLayout>

      <HeroSection onSearch={handleSearch} />

      <ServicesSection/>
        
    </MainLayout>
    </>
  );
}