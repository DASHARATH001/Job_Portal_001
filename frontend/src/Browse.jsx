import React, { useEffect } from 'react'
import Navbar from './components/ui/shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from './components/ui/redux/jobSlice';
import useGetAllJobs from './components/ui/Hooks/useGetAllJobs';
import { Button } from './components/ui/button';
import { useNavigate } from 'react-router-dom';


// const randomJobs = [1, 2, 3];
const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    }
  })
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10' >
        <Button onClick={() => navigate("/")} className='bg-gray-300 px-6 mx-2' >◀️ Back</Button>
        <h1 className='font-bold py-4 text-2xl text-left mx-2' > Search Results( {allJobs.length}) </h1>
        <div className='grid grid-cols-3 gap-4' >
          {
            allJobs.map((job) => {
              return (
                <Job key={job._id} job={job} />
              )
            })
          }

        </div>

      </div>
    </div>
  )
}

export default Browse