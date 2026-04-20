import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../utils/label";
import { Input } from "../utils/input";
import { Button } from "../button";
import { useSelector } from "react-redux";
import { Select } from "../select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/lib/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    experience: "",
    salary: "",
    jobType: "",
    location: "",
    position: 0,
    companyId: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const { companies } = useSelector(store => store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id })

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs")

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }

  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl border-gray-200 shadow-lg rounded-md" >
          <div className="grid grid-cols-2 gap-2" >
            <div>
              <Label>Title</Label>
              <Input
                value={input.title}
                onChange={changeEventHandler}
                type="text "
                name="title"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={input.description}
                onChange={changeEventHandler}
                type="text "
                name="description"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                value={input.requirements}
                onChange={changeEventHandler}
                type="text "
                name="requirements"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                value={input.salary}
                onChange={changeEventHandler}
                type="text "
                name="salary"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                value={input.location}
                onChange={changeEventHandler}
                type="text "
                name="location"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                value={input.jobType}
                onChange={changeEventHandler}
                type="text "
                name="jobType"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                value={input.experience}
                onChange={changeEventHandler}
                type="text"
                name="experience"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Number of Position</Label>
              <Input
                value={input.position}
                onChange={changeEventHandler}
                type="number"
                name="position"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {
              companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}   >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Company" /> 
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>{
                      companies.map((company) => {
                        return (
                          <SelectItem value={company?.name?.toLowerCase()}  className="bg-white text-black" >{company.name}</SelectItem>
                        )
                      })
                    }

                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }
          </div>
          {/* <Button className="w-full mt-4 bg-black text-white" > Post new Job</Button> */}
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
            Post New Job
            </Button>
          )}
          {
            companies.length === 0 && <p className="font-bold text-red-600 text-center my-3" >* Please register a company first , before posting a jobs</p>
          }
        </form>
      </div>
    </div>
  );
};

export default PostJob;
