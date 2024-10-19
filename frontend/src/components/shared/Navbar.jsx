import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='bg-white'>
            <div className="text-red-700 font-medium py-3 bg-slate-100 text-center text-sm animate-breathe">
                <p className='pulse-fade'>This is a demo; all jobs and information are not real!</p>
            </div>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold'onClick={()=>navigate('/')}>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <button className="w-6 h-6 hover:cursor-pointer lg:hidden" onClick={() => setMenuOpen(true)}>
                    <Menu />
                </button>
            </div>

            {/* Full-screen menu with overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-70 h-full w-full z-50 transition-transform duration-300 ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="relative flex flex-col justify-center items-center h-full w-full bg-white p-4">
                    {/* Close Button */}
                    <button
                        className="absolute top-5 right-5 text-gray-600"
                        onClick={() => setMenuOpen(false)}
                    >
                        <X className="w-8 h-8 hover:text-red-500 transition-colors duration-200" />
                    </button>

                    {/* Menu Links */}
                    <ul className="flex flex-col justify-center items-center space-y-6 text-xl font-medium text-gray-900">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className="hover:text-gray-700 transition-colors duration-200">
                                    <Link to="/admin/companies" onClick={() => setMenuOpen(false)}>Companies</Link>
                                </li>
                                <li className="hover:text-gray-700 transition-colors duration-200">
                                    <Link to="/admin/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="hover:text-gray-700 transition-colors duration-200">
                                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                                </li>
                                <li className="hover:text-gray-700 transition-colors duration-200">
                                    <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
                                </li>
                                <li className="hover:text-gray-700 transition-colors duration-200">
                                    <Link to="/browse" onClick={() => setMenuOpen(false)}>Browse</Link>
                                </li>
                            </>
                        )}
                        {!user ? (
                            <>
                                <li className="w-full">
                                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                                        <Button className="w-full text-lg py-2 hover:bg-gray-200 transition-all duration-200" variant="outline">Login</Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link to="/signup" onClick={() => setMenuOpen(false)}>
                                        <Button className="w-full text-lg py-2 bg-[#6A38C2] hover:bg-[#5b30a6] transition-all duration-200 text-white">Signup</Button>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="w-full">
                                    <Link to="/profile" onClick={() => setMenuOpen(false)}>
                                        <Button className="w-full text-lg py-2 hover:bg-gray-200 transition-all duration-200" variant="link">View Profile</Button>
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Button onClick={() => { logoutHandler(); setMenuOpen(false); }} className="w-full text-lg py-2 hover:bg-gray-200 transition-all duration-200" variant="link">
                                        Logout
                                    </Button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
