import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../utils/label'
import { Input } from '../utils/input'
import { Button } from '../utils/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from "@/lib/constant"
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'


const CompinesCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);

        const CompanyId = res?.data?.company?._id;
        navigate(`/admin/companies/${CompanyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>

          <Button
            onClick={registerNewCompany}
            className="bg-black text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompinesCreate