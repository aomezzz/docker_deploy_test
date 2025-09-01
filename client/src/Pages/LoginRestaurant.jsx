
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../Component/Navbar';
import authService from '../service/auth.service';
import { useAuthContext } from '../context/authcontext';
import Swal from 'sweetalert2';

const LoginRestaurant = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login: contextLogin } = useAuthContext();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
        const currentUser = await authService.login(login.username, login.password);
        if (currentUser.status === 200)  {
            // Use AuthContext login
            contextLogin(currentUser.data);
            
            await Swal.fire({
                title: 'Login Successful',
                text: `Welcome back, ${currentUser.data.username}!`,
                icon: 'success',
                confirmButtonText: 'Continue',
                confirmButtonColor: '#10B981',
                background: '#1f2937',
                color: '#ffffff',
                showClass: {
                    popup: 'animate__animated animate__fadeInUp'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown'
                },
                timer: 3000,
                timerProgressBar: true
            });
            navigate('/');
        }
    } catch (error) {
        setError(error.response?.data?.message || 'An error occurred during login');
        Swal.fire({
            title: 'Login Failed',
            text: error.response?.data?.message || 'An error occurred during login',
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#EF4444',
            background: '#1f2937',
            color: '#ffffff'
        });
    } finally {
        setLoading(false);
    }
  }


  return (
    <div className='container mx-auto'>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-primary mb-2">Welcome Back!</h1>
                <p className="text-base-content/70">Sign in to your Grab Restaurant account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={login.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-control mt-6">
                  <button 
                    type="submit" 
                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </div>
              </form>

              <div className="divider">OR</div>

              <div className="text-center">
                <p className="text-base-content/70">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => navigate('/register')}
                    className="link link-primary font-semibold"
                  >
                    Create one here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRestaurant;