import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner'
import { Loader2} from 'lucide-react' 

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, { email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.data.success) {
                toast.success('Password reset link has been sent to your email');
                navigate('/login');  // Redirect back to login page after success
            } else {
                toast.error(res.data.message || 'Unable to send reset email');
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center max-w-4xl mx-auto'>
            <form onSubmit={handleSubmit} className='w-[80%] md:w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Forgot Password</h1>

                <div className='my-2'>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {loading ? (
                    <Button className="w-full my-4">
                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Sending Email...
                    </Button>
                ) : (
                    <Button type="submit" className="w-full my-4">Send Reset Link</Button>
                )}
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
