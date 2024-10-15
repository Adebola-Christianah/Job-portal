import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        // If user is not authenticated, redirect to login
        if (!user) {
            const currentJobUrl = `/description/${jobId}`; // Capture the specific job URL
            navigate(`/login?redirect=${currentJobUrl}`);
            console.log(currentJobUrl)
            return;
        }

        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const formattedDate = singleJob?.createdAt ? format(new Date(singleJob.createdAt), 'dd-MM-yyyy') : '';

    return (
       <div>
        <Navbar/>
         <div className='max-w-7xl mx-auto my-10 p-4'>
            <div className='flex items-center justify-between mb-6'>
                <button onClick={() => navigate(-1)} className='flex items-center text-gray-600 hover:text-gray-900'>
                    <ArrowLeft className='mr-2' />
                    <span>Back to Jobs</span>
                </button>
            </div>

            <div className='flex flex-col md:flex-row items-start justify-between'>
                <div className='w-full md:w-3/4'>
                    <h1 className='font-bold text-xl mb-4'>{singleJob?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 mb-4'>
                        <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold' variant="ghost">₦<NumericFormat value={singleJob?.salary} displayType="text" thousandSeparator={true} fixedDecimalScale /></Badge>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'} w-full md:w-auto`}>
                        {isApplied ? ' Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4 mt-8'>Job Description</h1>
            <div className='my-4'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h1 className='font-bold'>Role:</h1>
                    <span className='font-normal text-gray-800'>{singleJob?.title}</span>

                    <h1 className='font-bold'>Location:</h1>
                    <span className='font-normal text-gray-800'>{singleJob?.location}</span>

                    <h1 className='font-bold'>Description:</h1>
                    <span className='font-normal text-gray-800'>{singleJob?.description}</span>

                    <h1 className='font-bold'>Experience:</h1>
                    <span className='font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span>

                    <h1 className='font-bold'>Salary:</h1>
                    <span className='font-normal text-gray-800'>₦<NumericFormat value={singleJob?.salary} displayType="text" thousandSeparator={true} fixedDecimalScale /></span>

                    <h1 className='font-bold'>Total Applicants:</h1>
                    <span className='font-normal text-gray-800'>{singleJob?.applications?.length}</span>

                    <h1 className='font-bold'>Posted Date:</h1>
                    <span className='font-normal text-gray-800'>{formattedDate}</span>
                </div>
                
                <h1 className='font-bold mt-4'>Requirements</h1>
                <ul className="list-disc ml-5 mt-2">
                    {singleJob?.requirements?.filter(req => req !== "").map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                    ))}
                </ul>
            </div>
        </div>
       </div>
    );
};

export default JobDescription;
