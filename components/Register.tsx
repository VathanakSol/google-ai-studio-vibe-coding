import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }
    try {
      await register(formData);
      navigate('/profile');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700
                    placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                    dark:bg-gray-800"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700
                    placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                    dark:bg-gray-800"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700
                  placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                  dark:bg-gray-800"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700
                  placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                  dark:bg-gray-800"
                placeholder="Phone Number (optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700
                  placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                  dark:bg-gray-800"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700
                  placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm
                  dark:bg-gray-800"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;