'use client';

import { useEffect, useState } from 'react';

export default function HeaderWrapper({children}: {children: React.ReactNode}) {

    const [hasInitAnimation, setHasInitAnimation] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setHasInitAnimation((prev) => {
                if (isScrolled && !prev) {
                    return true;
                }
                if (!isScrolled && prev) {
                    return false;
                }
                return prev;
            });
        };
        
        window.addEventListener('scroll', handleScroll);

        handleScroll(); // Call it once to set the initial state based on the current scroll position

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    return (
        <header className={`header w-full text-white ${hasInitAnimation ? 'init-animation' : ''}`}>
            {children}
        </header>
    );
}