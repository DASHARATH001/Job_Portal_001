import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Navbar from "../shared/Navbar";
import { Label } from "../utils/label";
import { Input } from "../utils/input";
import { Button } from "../utils/button";
import { RadioGroup } from "../utils/radio-group";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/lib/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          email: input.email,
          password: input.password,
          role: input.role,
        },
        {
          withCredentials: true, // ✅ login me needed
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);

      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-6 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-4">
            <Label className="py-2">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-4">
            <Label className="py-2">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <RadioGroup className="flex gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-black text-white">
              Login
            </Button>
          )}
          <span className='text-sm'>
            Don't have an account?
            <Link to="/signup" className='text-blue-600'>Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
