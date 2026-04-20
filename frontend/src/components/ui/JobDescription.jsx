import React, { useEffect, useState } from "react";
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from "@/lib/constant";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { setSingleJob } from "./redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // ✅ Apply Job Handler
  const applyHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ✅ Fetch Single Job
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          // ✅ Check if already applied
          const applied = res.data.job.applications?.some(
            (application) => application.applicant === user?._id
          );

          setIsApplied(applied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">
            {singleJob?.title}
          </h1>

          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>

            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>

            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={!isApplied ? applyHandler : null}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>

      <div className="my-4 space-y-3">
        <div>
          <span className="font-bold">Role:</span>
          <span className="pl-4 text-gray-800">
            {singleJob?.title}
          </span>
        </div>

        <div>
          <span className="font-bold">Location:</span>
          <span className="pl-4 text-gray-800">
            {singleJob?.location}
          </span>
        </div>

        <div>
          <span className="font-bold">Description:</span>
          <span className="pl-4 text-gray-800">
            {singleJob?.description}
          </span>
        </div>

        <div>
          <span className="font-bold">Experience:</span>
          <span className="pl-4 text-gray-800">
            {singleJob?.experience}
          </span>
        </div>

        <div>
          <span className="font-bold">Salary:</span>
          <span className="pl-4 text-gray-800">
            {singleJob?.salary}
          </span>
        </div>

        <div>
          <span className="font-bold">Total Applicants:</span>
          <span className="pl-4 text-gray-800">
            {singleJob?.applications?.length || 0}
          </span>
        </div>

        <div>
          <span className="font-bold">Posted Date:</span>
          <span className="pl-4 text-gray-800">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;



