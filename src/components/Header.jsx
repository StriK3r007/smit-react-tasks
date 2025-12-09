import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import projectLinks from '../data/projectLinks';
import { MdKeyboardBackspace } from "react-icons/md";

const Head = () => {
  // Get the current path to dynamically apply 'active' styles
  const location = useLocation();

  // const navLinks = [
  //   { name: 'Home', path: '/' },
  //   { name: 'Turo', path: '/turo-clone' },
  //   // Add more links here for other projects
  //   // { name: 'Contact', path: '/contact' },
  // ];

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-amber-400 hover:text-amber-300 transition duration-150">
              {'React Assignments'}
            </Link>
          </div>

          {/* Navigation Links Section */}
          <div className="md:ml-6 md:flex md:space-x-8">
            {projectLinks.map((link) => (
              link.name === 'Home' ? (
              <Link 
                key={link.name}
                to={link.path}
                // Dynamic active styling based on current path
                className={`
                  inline-flex items-center px-1 pt-1 text-sm font-medium transition duration-150 ease-in-out
                  ${location.pathname === link.path 
                    ? 'border-b-2 border-amber-400 text-amber-400' // Active style
                    : 'text-gray-300 hover:text-white hover:border-gray-500 border-b-2 border-transparent' // Inactive style
                  }
                `}
              >
                {/* {link.name} */}
                {
                  location.pathname === '/'
                  ? link.name
                  : <span className='flex items-center gap-2'>
                    <MdKeyboardBackspace />
                    Back
                    </span>
                }
              </Link>
              ) : null
            ))}
          </div>
          
        </div>
      </nav>
      {/* Note: For a production app, you would also add a Mobile Menu button (Hamburger Icon) here */}
    </header>
  );
};

export default Head;