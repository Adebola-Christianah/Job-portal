import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';

const Job = ({ job }) => {
    const navigate = useNavigate();

    // Calculate days ago
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    return (
        <div className='p-4 md:p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            {/* Top row with date and bookmark button */}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company logo and name */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 my-3'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div className='mt-2 sm:mt-0'>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.country}</p>
                </div>
            </div>

            {/* Job title and description */}
            <div className='mt-2'>
                <h1 className='font-bold text-lg'>{job?.title}</h1>
                <p className='text-sm text-gray-600 mt-1'>
                    {job?.description.length > 100 ? `${job?.description.substring(0, 100)}...` : job?.description}
                </p>
            </div>

            {/* Job details (badges) */}
            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">
                    ₦<NumericFormat value={job?.salary} displayType="text" thousandSeparator={true} fixedDecimalScale />
                </Badge>
            </div>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
                    Details
                </Button>
                <Button className="bg-[#7209b7] text-white">
                    Save For Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
