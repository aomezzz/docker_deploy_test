import React from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../Component/Navbar';

const NotAllowed = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body text-center">
                            <div className="mb-6">
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-error flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h1 className="text-4xl font-bold text-error mb-2">Access Denied</h1>
                                <p className="text-base-content/70">You don't have permission to access this page.</p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-base-content/60">
                                    This page requires special permissions that your account doesn't have.
                                </p>
                                
                                <div className="card-actions justify-center gap-2">
                                    <button 
                                        onClick={() => navigate('/')}
                                        className="btn btn-primary"
                                    >
                                        Go to Home
                                    </button>
                                    <button 
                                        onClick={() => navigate(-1)}
                                        className="btn btn-ghost"
                                    >
                                        Go Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotAllowed;
