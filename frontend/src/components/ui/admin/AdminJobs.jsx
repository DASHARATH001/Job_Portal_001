import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../utils/input'
import { Button } from '../button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchJobByText}  from '../redux/jobSlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../Hooks/useGetAdminJobs'


const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobByText(input))

  }, [input])
  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto my-18' >
        <div className='flex items-center justify-between my-5' >
          <Input onChange={(e) => setInput(e.target.value)} className="w-fit" placeholder="Filter by name , role" ></Input>
          <Button className="bg-black text-white" onClick={() => navigate("/admin/jobs/create")} >New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </>
  )
}

export default AdminJobs