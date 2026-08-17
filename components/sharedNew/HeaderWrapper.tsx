'use client';

export default function HeaderWrapper({children}: {children: React.ReactNode}) {
    return (
        <header className="header w-full text-white">
            {children}
        </header>
    );
}