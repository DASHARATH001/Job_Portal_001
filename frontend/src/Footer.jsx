import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} Dasharath. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-6 mt-3 md:mt-0 text-sm">
          <a href="#" className="hover:text-black transition">
            Home
          </a>
          <a href="#" className="hover:text-black transition">
            About
          </a>
          <a href="#" className="hover:text-black transition">
            Contact
          </a>
          <a href="#" className="hover:text-black transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
