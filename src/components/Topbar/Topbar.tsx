'use client'
import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";

type TopbarProps = {
	problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
	
	

	return (
		<nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-white bg-[#282828]'>
			<div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
				<Link href='/courses' className='h-[22px] flex-1'>
					<FaChevronLeft />
				</Link>

				{problemPage && (
					<div className='flex items-center gap-4 flex-1 justify-center'>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'
							onClick={() => console.log('Hii')}
							
						>
							{/* <FaChevronLeft /> */}
						</div>
						<Link
							href='/'
							className='flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer'
						>
							<div>
								<BsList />
							</div>
							<p>Problem Details</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer'

						>
							{/* <FaChevronRight /> */}
						</div>
					</div>
				)}

				<div className='flex items-center space-x-4 flex-1 justify-end'>
					
					
					 <Timer />
					
						<div className='cursor-pointer group relative'>
							<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>tarunpahade@gmail.com</p>
							</div>
						</div>
				</div>
			</div>
		</nav>
	);
};
export default Topbar;
