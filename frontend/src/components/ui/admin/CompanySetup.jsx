import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "../utils/input";
import { COMPANY_API_END_POINT } from "@/lib/constant";
import { Label } from "../utils/label";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "../Hooks/useGetCompanyById";

const CompanySetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // ✅ Fill form when redux data arrives
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        location: singleCompany.location || "",
        website: singleCompany.website || "",
        file: null, 
      });
    }
  }, [singleCompany]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto my-12 bg-white shadow-lg rounded-2xl p-8">
        <form onSubmit={submitHandler}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </Button>

            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm font-semibold">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="py-2"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label className="text-sm font-semibold">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="py-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button
              disabled
              className="w-full mt-8 bg-black text-white hover:bg-black"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-8 bg-black text-white hover:bg-gray-900"
            >
              Update Company
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;

