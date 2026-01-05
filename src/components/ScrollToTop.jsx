import { useState, useEffect } from 'react';
import { FaArrowUpLong } from "react-icons/fa6";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Function to toggle visibility of the scroll button
    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to scroll to the top of the page
    // const topFunction = () => {
    //     document.body.scrollTop = 0;
    //     document.documentElement.scrollTop = 0;
    // };

    // Function to scroll to the top of the page smoothly
    const topFunction = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',  // Add smooth scroll behavior
        });
    };

    // Set up scroll event listener when the component mounts
    useEffect(() => {
        window.onscroll = scrollFunction;

        // Clean up the event listener when the component unmounts
        return () => {
            window.onscroll = null;
        };
    }, []);

    return (
        <>
            {/* Scroll to top button */}
            {isVisible && (
                <div
                    className="fixed bottom-10 right-0 z-50 bg-gray-900 h-15 w-15 flex justify-center items-center cursor-pointer shadow transition rounded-tl-full rounded-bl-full"
                    onClick={topFunction}
                >
                <FaArrowUpLong className='text-white'/>
                </div>
            )}
        </>
    );
}
