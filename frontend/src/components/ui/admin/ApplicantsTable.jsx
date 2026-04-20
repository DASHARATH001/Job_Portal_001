import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "../table";
import { Popover, PopoverContent, PopoverTrigger } from "../utils/popover";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/lib/constant";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)

    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>

        <TableHeader>
          <TableRow className="font-bold " >
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-right">Action</TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants?.applications.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullName}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>Na</span>
                  )}
                </TableCell>

                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>

                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => (
                        <div onClick={() => statusHandler(status, item._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
