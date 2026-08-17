'use client';

import { useEffect, useState } from 'react';

export default function HeaderWrapper({children}: {children: React.ReactNode}) {

    // const { hasInitAnimation, setHasInitAnimation } = useState(false);

    useEffect(() => {
        // setHasInitAnimation(true);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                document.querySelector('header')?.classList.add('init-animation');
            } else {
                document.querySelector('header')?.classList.contains('init-animation') && document.querySelector('header')?.classList.remove('init-animation');
            }
        };
        
        window.addEventListener('scroll', handleScroll);

        handleScroll(); // Call it once to set the initial state based on the current scroll position

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return (
        <header className="header w-full text-white">
            {children}
        </header>
    );
}