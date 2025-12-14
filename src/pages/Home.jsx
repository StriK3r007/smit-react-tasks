import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import projectLinks from '../data/projectLinks';

export default function Turo() {
    // FIX: useLocation is correctly imported and called.
    const location = useLocation();

    // Component for a single project card
    const ProjectCard = ({ item, isActive }) => (
      item.name === 'Home' || item.name === '404'  ? null :(
        // FIX: The entire card (the outer div) is now wrapped in the <Link> component.
        <Link
            to={item.path}
            key={item.name}
            // Use the group utility for hover effects on child elements
            className={`
                group p-6 h-full flex flex-col justify-between 
                bg-white dark:bg-gray-800 rounded-2xl shadow-lg 
                transition-all duration-300 ease-in-out border-4 
                ${isActive
                    ? 'border-amber-500 shadow-xl' // Active style: Bold border and strong shadow
                    : 'border-transparent hover:border-amber-400 hover:shadow-2xl' // Inactive style: Border appears on hover
                }
            `}
        >
            <div>
                {/* Project Icon/Emoji */}
                <div className={`
                    text-4xl w-16 h-16 rounded-full flex items-center justify-center mb-4 
                    ${isActive ? 'bg-amber-500' : 'bg-gray-100 dark:bg-gray-700'}
                `}>
                    {item.icon}
                </div>
                
                {/* Project Name */}
                <h2 className={`
                    text-xl font-bold mb-2 transition-colors duration-200 
                    ${isActive ? 'text-amber-500 dark:text-amber-400' : 'text-gray-900 dark:text-white group-hover:text-amber-500'}
                `}>
                    {item.name}
                </h2>
                
                {/* Project Description */}
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                    {item.description}
                </p>
            </div>

            {/* Read More / Call to Action at the bottom */}
            <div className='mt-4 pt-4 border-t border-gray-100 dark:border-gray-700'>
                <span className={`
                    text-sm font-semibold flex items-center transition-colors duration-200 
                    ${isActive ? 'text-amber-500' : 'text-gray-500 group-hover:text-amber-500'}
                `}>
                    View Project
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
            </div>
        </Link>
        )
    );

    return (
        <section className='w-full max-w-[1184px] mx-auto pt-10 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-extrabold text-gray-900 dark:text-white mb-8'>
                Projects & Features
            </h1>
            
            {/* The main card grid layout */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {projectLinks.map((item) => (
                    <ProjectCard
                        key={item.id}
                        item={item}
                        isActive={location.pathname === item.path}
                    />
                ))}
            </div>
        </section>
    );
}