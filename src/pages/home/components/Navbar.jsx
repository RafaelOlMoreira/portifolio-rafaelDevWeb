import React, { useState, useEffect, useRef } from 'react'

import { LuMenu } from "react-icons/lu";
import { HiMenu, HiOutlineX } from "react-icons/hi";

function Navbar() {

    const [navMenuAberto, setNavMenuAberto] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const overlayRef = useRef(null);
    const toggleMenu = () => setNavMenuAberto((s) => !s);

    // bloqueia scroll
    useEffect(() => {
        document.body.style.overflow = navMenuAberto ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [navMenuAberto]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`z-3000 fixed h-min inset-0 flex p-5 justify-between 
                ${scrolled
                    ? 'bg-black border-b border-gray-400/20'
                    : 'bg-transparent'
                }
                ${navMenuAberto
                    ? 'border-b border-[#737373]/30'
                    : 'border-0'}
                    `}>
                <div>
                    <button className='font-mono'>
                        <span className='text-gray-600'>root@</span>
                        <span className='text-orange-400'>rafael</span>
                        <span className='text-gray-600'>:~$</span>
                    </button>
                </div>
                <div>
                    <button
                        className='block lg:hidden text-[#00ff41]'
                        onClick={toggleMenu}
                        aria-expanded={navMenuAberto}
                    >
                        {navMenuAberto ? (
                            <HiOutlineX className='size-6' />
                        ) : (
                            <HiMenu className='size-6' />
                        )}
                    </button>
                </div>
            </nav>
            {navMenuAberto && (
                <div ref={overlayRef} className='z-2000 fixed inset-0 pt-20 pb-5 h-min bg-black'>
                    <div className="flex justify-center items-center transform transition-transform duration-300">
                        <ul className='flex flex-col gap-3 text-white w-full px-5 font-jetbrains'>
                            <li className='bg-green-600/10 p-2 text-[#00ff41] rounded-md'>_boot</li>
                            <li className='bg-transparent p-2 text-[#737373] font-semibold rounded-md'>_skills</li>
                            <li className='bg-transparent p-2 text-[#737373] font-semibold rounded-md'>_projects</li>
                            <li className='bg-transparent p-2 text-[#737373] font-semibold rounded-md'>_about</li>
                            <li className='bg-transparent p-2 text-[#737373] font-semibold rounded-md'>_timeline</li>
                            <li className='bg-transparent p-2 text-[#737373] font-semibold rounded-md'>_contact</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
