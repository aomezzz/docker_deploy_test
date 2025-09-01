import React from "react";
import { useNavigate, Link } from "react-router";
import { useAuthContext } from "../context/authcontext";
import Swal from "sweetalert2";

const UserProfile = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    
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

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img 
                        alt="User Avatar" 
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" 
                    />
                </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                        {user?.username}
                        <span className="badge">
                          {user?.roleId === 2 ? 'Moderator' : user?.roleId > 2 ? 'Admin' : 'User'}
                        </span>
                    </a>
                </li>
                <li>
                    <Link to="/profile" className="text-blue-600 hover:text-blue-800">
                        View Profile
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default UserProfile;