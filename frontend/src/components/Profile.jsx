import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, User2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import ProfileEditDialog from './ui/ProfilePictureDialogue';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs(); // Fetch applied jobs
  const [open, setOpen] = useState(false); // For UpdateProfileDialog
  const [openImageModal, setOpenImageModal] = useState(false); // For ProfileEditDialog
  const { user } = useSelector((store) => store.auth); // Get user from Redux store
  console.log(user,'user')
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='relative flex justify-between'>
          <div className='flex flex-col gap-8'>
            <div className="relative">
              <Avatar className="h-24 w-24 border border-gray-200 relative">
                {user?.profile?.profilePhoto ? (
                  <AvatarImage src={user.profile.profilePhoto} alt="profile" />
                ) : (
                  <User2 className="h-full w-full" /> // Render default icon if no image
                )}
              </Avatar>
              <button 
                onClick={() => setOpenImageModal(true)} 
                className="absolute bottom-0 right-0"
              >
                <Pen />
              </button>
            </div>

            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button 
            onClick={() => setOpen(true)} 
            className="absolute bottom-0 right-0 mt-2 mr-2" 
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {user?.profile?.skills.length !== 0 ? 
              user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : 
              <span>NA</span>
            }
          </div>
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? 
            <a 
              target='_blank' 
              rel="noopener noreferrer" 
              href={user?.profile?.resume} 
              className='text-blue-500 w-full hover:underline cursor-pointer'
            >
              {user?.profile?.resumeOriginalName}
            </a> : 
            <span>NA</span>
          }
        </div>
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable />
      </div>

      {/* Modals for updating profile and profile picture */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <ProfileEditDialog isModalOpen={openImageModal} setIsModalOpen={setOpenImageModal} user={user} />
    </div>
  );
}

export default Profile;
