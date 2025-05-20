import Link from 'next/link';
import React from 'react';

const header: React.FC = () => (
    <div className="absolute w-[95%] z-5 px-10 mt-5">
        <div className="flex flex-row top-0 w-full absolute rounded-3xl py-3" style={{ backgroundColor: 'rgba(7, 131, 152, 0.5)' }}>
            <div className="flex flex-row items-center justify-center w-[10%] ml-[8%]">
                <Link href="/">
                    <img
                        className="w-[50%] h-[50%]"
                        src="/logo.svg"
                    />
                </Link>
            </div>
            <div className="flex flex-row items-center justify-end w-[65%] text-white">
                <Link href="/" className="mr-4 hover:scale-110 hover:text-white transition-all duration-300">
                    About Me
                </Link>
                <Link href="/" className="hover:scale-110 hover:text-white transition-all duration-300">
                    Portfolio
                </Link>
            </div>
            <div className="flex items-center justify-center ml-4">
                <Link href="/" className="bg-[#00a6c0] text-[#FFFFF] px-4 py-2 rounded-2xl hover:scale-105 hover:bg-[#557793] hover:text-[#ffffff] transition-all duration-150 font-bold">
                    Let's Connect!
                </Link>
            </div>
        </div>
    </div>
);

export default header;