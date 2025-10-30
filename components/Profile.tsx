import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, isAuthenticated, loading, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-full border-4 border-white"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-white/80">{user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personal Information</h3>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.firstName} {user.lastName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.phoneNumber || 'Not provided'}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Address</h3>
                  <dl className="mt-4 space-y-4">
                    {user.address ? (
                      <>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Street address</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.address.street}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">City, State, ZIP</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                            {user.address.city}, {user.address.state} {user.address.zipCode}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</dt>
                          <dd className="mt-1 text-sm text-gray-900 dark:text-white">{user.address.country}</dd>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">No address provided</p>
                    )}
                  </dl>
                </div>
              </div>
              
              {/* Order History Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Order History</h3>
                {user.orderHistory && user.orderHistory.length > 0 ? (
                  <div className="mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flow-root">
                        <ul className="-my-5 divide-y divide-gray-200 dark:divide-gray-600">
                          {user.orderHistory.map((orderId) => (
                            <li key={orderId} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    Order #{orderId}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Ordered on {new Date().toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href={`/orders/${orderId}`}
                                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                                  >
                                    View Order
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No orders yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;