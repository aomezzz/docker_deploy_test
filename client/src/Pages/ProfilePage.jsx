import React from "react";
import { useAuthContext } from "../context/authcontext";
import { useNavigate } from "react-router";
import Navbar from "../Component/Navbar";
import Swal from "sweetalert2";

const ProfilePage = () => {
    const { user, logout, isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    // Check if user is authenticated
    React.useEffect(() => {
        if (!isAuthenticated) {
            Swal.fire({
                title: 'Access Denied',
                text: 'You need to login to view your profile.',
                icon: 'error',
                confirmButtonText: 'Go to Login',
                confirmButtonColor: '#EF4444',
                background: '#1f2937',
                color: '#ffffff'
            }).then(() => {
                navigate('/login');
            });
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!',
            background: '#1f2937',
            color: '#ffffff'
        });

        if (result.isConfirmed) {
            logout();
            await Swal.fire({
                title: 'Logged Out! 👋',
                text: 'See you soon!',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                background: '#1f2937',
                color: '#ffffff',
                confirmButtonColor: '#10B981'
            });
            navigate('/login');
        }
    };

    if (!isAuthenticated) {
        return null; // Don't render anything while redirecting
    }

    return (
        <div className="container mx-auto">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="text-center mb-6">
                                <div className="avatar">
                                    <div className="w-24 rounded-full">
                                        <img 
                                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" 
                                            alt="Profile"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-primary mt-4">User Profile</h1>
                            </div>

                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Username</span>
                                    </label>
                                    <div className="input input-bordered flex items-center">
                                        {user?.username || 'N/A'}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email</span>
                                    </label>
                                    <div className="input input-bordered flex items-center">
                                        {user?.email || 'N/A'}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Role</span>
                                    </label>
                                    <div className="input input-bordered flex items-center">
                                        <span className="badge badge-primary">{user?.roleId === 2 ? 'Moderator' : user?.roleId > 2 ? 'Admin' : 'User'}</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-2">Role ID: {user?.roleId ?? '-'}</p>
                            </div>

                            <div className="card-actions justify-center mt-6">
                                <button 
                                    onClick={handleLogout}
                                    className="btn btn-error w-full"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
