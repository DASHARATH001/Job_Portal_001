import React, { useEffect } from 'react'
import Navbar from './components/ui/shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from './components/ui/Hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Home = () => {
  useGetAllJobs()
  const { user } = useSelector(store => store.auth);
  const naviagte = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      naviagte("/admin/companies")
    }
  }, [])

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>

  )
}

export default Home