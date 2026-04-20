import React, { useState } from "react";
import Navbar from "./components/ui/shared/Navbar";
import { Avatar, AvatarImage } from "./components/ui/utils/avatar";
import { Button } from "./components/ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../src/components/ui/badge";
import { Label } from "../src/components/ui/utils/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDaglog from "./UpdateProfileDaglog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "./components/ui/Hooks/useGetAppliedJobs";

const Profile = () => {
 useGetAppliedJobs()
  const [open, setOpen] = useState(false);
  const isResume = true;
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p className="text-gray-600">
                {user?.profile?.bio || "No bio added"}
              </p>
            </div>
          </div>

          <Button onClick={() => setOpen(true)} variant="outline" size="icon">
            <Pen size={18} />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5 space-y-2">
          <div className="flex items-center gap-3">  <Mail size={18} /><span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3"> <Contact size={18} /><span>{user?.phoneNumber || "NA"}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h1 className="font-bold text-md mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0 ? (user.profile.skills.map((item, index) => (<Badge key={index} className="bg-black text-white rounded-2xl">
              {item}
            </Badge>
            ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="grid w-full max-w-sm gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4">
        <h1 className="text-xl font-bold mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDaglog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
