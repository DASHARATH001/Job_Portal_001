import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../utils/label";
import { Input } from "../utils/input";
import { Button } from "../utils/button";
import { RadioGroup } from "../utils/radio-group";
import axios from "axios";
import { USER_API_END_POINT } from "@/lib/constant";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ role validation
    if (!input.role) {
      toast.error("Please select a role");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true)); // ✅ missing tha

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData
      );


      console.log("API URL:", USER_API_END_POINT);
      console.log("Final URL:", `${USER_API_END_POINT}/register`);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false)); // ✅ correct
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-4">
            <Label className="py-2" >Full Name</Label>

            <Input
              type="text"
              placeholder="Dasharath"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-4">
            <Label className="py-2"  >Email</Label>
            <Input
              type="email"
              placeholder="dasharath123@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-4">
            <Label className="py-2"  >Phone Number</Label>
            <Input
              type="text"
              placeholder="0123456789"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-4">
            <Label className="py-2"  >Password</Label>
            <Input
              type="password"
              placeholder="********"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
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

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full my-4 bg-black text-white"
          >
            {loading ? "Please wait..." : "Signup"}
          </Button>

          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;



// import React, { useState } from "react";
// import Navbar from "../shared/Navbar";
// import { Label } from "../utils/label";
// import { Input } from "../utils/input";
// import { Button } from "../utils/button";
// import { RadioGroup } from "../utils/radio-group";
// import axios from "axios";
// import { USER_API_END_POINT } from "@/lib/constant";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../redux/authSlice";

// const Signup = () => {
//   const [input, setInput] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//   });

//   const { loading } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();


//     if (!input.role) {
//       toast.error("Please select a role");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("fullName", input.fullName);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", input.role);

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(
//         `${USER_API_END_POINT}/register`,
//         formData

//       );

//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.response?.data?.message || "Signup failed");
//     } finally {
//       dispatch(setLoading(false))
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-200 rounded-md p-6 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5 ">Sign Up</h1>

//           <div className="my-4">
//             <Label className="py-2">Full Name</Label>
//             <Input
//               type="text"
//               placeholder="Dasharath"
//               name="fullName"
//               value={input.fullName}
//               onChange={changeEventHandler}
//             />
//           </div>

//           <div className="my-4">
//             <Label className="py-2">Email</Label>
//             <Input
//               type="email"
//               placeholder="dasharath123@gmail.com"
//               name="email"
//               value={input.email}
//               onChange={changeEventHandler}
//             />
//           </div>

//           <div className="my-4">
//             <Label className="py-2">Phone Number</Label>
//             <Input
//               type="text"
//               placeholder="0123456789"
//               name="phoneNumber"
//               value={input.phoneNumber}
//               onChange={changeEventHandler}
//             />
//           </div>

//           <div className="my-4">
//             <Label className="py-2">Password</Label>
//             <Input
//               type="password"
//               placeholder="********"
//               name="password"
//               value={input.password}
//               onChange={changeEventHandler}
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center gap-4 my-5">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="student"
//                   checked={input.role === "student"}
//                   onChange={changeEventHandler}
//                 />
//                 <Label>Student</Label>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role === "recruiter"}
//                   onChange={changeEventHandler}
//                 />
//                 <Label>Recruiter</Label>
//               </div>
//             </RadioGroup>

//             <div className="flex items-center gap-2">
//               <Label>Profile</Label>
//               <Input
//                 accept="image/*"
//                 type="file"
//                 onChange={changeFileHandler}
//               />
//             </div>
//           </div>

//           <Button type="submit" className="w-full my-4 bg-black text-white">
//             Signup
//           </Button>

//           <p className="text-sm">
//             Already have an account?{" "}
//             <a href="/login" className="text-blue-600 hover:underline">
//               Login
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

