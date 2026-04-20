import { JOB_API_END_POINT } from "@/lib/constant";
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from "../redux/companySlice";
import { useParams } from "react-router-dom";

const useGetCompanyById = () => {
   const { id: companyId } = useParams(); 
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchShingComapany = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${companyId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.comapany))
        }
      } catch (error) {
        console.log(error);
      }

    }
    fetchShingComapany();

  }, [companyId, dispatch])
}

export default useGetCompanyById