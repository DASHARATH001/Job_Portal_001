import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './components/ui/dialog'
import { Label } from './components/ui/utils/label'
import { Input } from './components/ui/utils/input'
import { Button } from '../src/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from './components/ui/redux/authSlice'
import { toast } from 'sonner'
import { USER_API_END_POINT } from "@/lib/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    resume: user?.profile?.resume,
    skills: user?.profile?.skills?.join(", ") // ✅ small safe fix
  })

  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0] // ✅ FIX
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData() // ✅ FIX
    formData.append("fullName", input.fullName)
    formData.append("email", input.email) // ✅ FIX
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)

    if (input.file) {
      formData.append("file", input.file)
    }

    try {
      setLoading(true)
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        { withCredentials: true }
      )

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }

    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px] bg-white text-black"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className='grid gap-4 py-4'>

            {/* Name */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Name</Label>
              <Input
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Email */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Email</Label>
              <Input
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Phone */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Number</Label>
              <Input
                name="phoneNumber"   // ✅ MAIN FIX
                type="tel"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Bio */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Bio</Label>
              <Input
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Skills */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Skills</Label>
              <Input
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>

            {/* Resume */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className="text-right">Resume</Label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={changeFileHandler}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full my-4 bg-black text-white">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog


