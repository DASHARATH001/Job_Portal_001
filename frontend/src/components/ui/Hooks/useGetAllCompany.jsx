import { COMPANY_API_END_POINT } from "@/lib/constant";
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCompanies } from "../redux/companySlice";

const useGetAllCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchAllCompany();
  }, [dispatch]);
};

export default useGetAllCompany;

