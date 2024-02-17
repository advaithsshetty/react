import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const BackTop = () => {

    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const handleScroll = () => window.scrollY >= 800 ? setIsVisible(true) : setIsVisible(false);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleBackTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <div
                className={`back_top ${isVisible ? 'popped' : ''}`}
                title="Back to top"
                onClick={handleBackTop}>
                <FaChevronUp />
            </div>
        </>
    );
};

export default BackTop;