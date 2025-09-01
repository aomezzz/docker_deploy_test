import { useState } from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../Component/Navbar';
import authService from '../service/auth.service';
import { useAuthContext } from '../context/authcontext';
import Swal from 'sweetalert2';

const RegisterRestaurant = () => {
  const [register, setRegister] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: contextLogin } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (register.password !== register.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(register.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register(
        register.username,
        register.name,
        register.email,
        register.password
      );
      
      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: 'Registration Successful',
          text: `Welcome, ${register.username}! Your account has been created.`,
          icon: 'success',
          confirmButtonText: 'Go to Login',
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
        navigate('/login');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration');
      Swal.fire({
        title: 'Registration Failed',
        text: error.response?.data?.message || 'An error occurred during registration',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#EF4444',
        background: '#1f2937',
        color: '#ffffff'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto'>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-primary mb-2">Join Us!</h1>
                <p className="text-base-content/70">Create your Grab Restaurant account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Username</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={register.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={register.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={register.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={register.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={register.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
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
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </form>

              <div className="divider">OR</div>

              <div className="text-center">
                <p className="text-base-content/70">
                  Already have an account?{' '}
                  <button 
                    onClick={() => navigate('/login')}
                    className="link link-primary font-semibold"
                  >
                    Sign in here
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

export default RegisterRestaurant;
