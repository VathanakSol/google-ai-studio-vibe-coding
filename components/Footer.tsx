
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <p className="mt-2">
          Made with <span className="text-red-500">&hearts;</span> by Your Company
        </p>
      </div>
    </footer>
  );
};

export default Footer;
