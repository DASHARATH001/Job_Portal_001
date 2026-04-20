import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompinesTable from './CompinesTable.jsx'
import { Input } from '../utils/input'
import { Button } from '../button'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '../Hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../redux/companySlice'

const Compines = () => {
  useGetAllCompany();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))

  }, [input])
  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto my-18' >
        <div className='flex items-center justify-between my-5' >
          <Input onChange={(e) => setInput(e.target.value)} className="w-fit" placeholder="Filter by name" ></Input>
          <Button className="bg-black text-white" onClick={() => navigate("/admin/companies/create")} >New Company</Button>
        </div>
        <CompinesTable />
      </div>
    </>
  )
}

export default Compines