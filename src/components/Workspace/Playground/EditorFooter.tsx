import { Toaster } from "@/components/ui/toaster";
import {  useToast } from "@/components/ui/use-toast";
import React from "react";
import { BsChevronUp } from "react-icons/bs";

type EditorFooterProps = {
	handleSubmit: (e:any) => void;
};

const EditorFooter: React.FC<EditorFooterProps> = ({ handleSubmit }) => {
	const { toast } = useToast()

	return (
		<div className='flex text-white bg-dark-layer-1 absolute bottom-0 z-10 w-full '>
			<div className='mx-5 my-[10px] flex justify-between w-full'>
				<div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
					<button className='px-3 text-white py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
						
						<div className='ml-1 transform transition flex items-center'>
							<BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' />
						</div>
					</button>
					
				</div>
				<div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-3 py-1.5  border text-white text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg'
						onClick={handleSubmit}
						
					>
						Run
					</button>
					<button
						className='px-3 py-1.5 border font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg'
						onClick={(e:any)=>{
e.preventDefault()
							handleSubmit(e)
						}}
					>
						Submit
					</button>
					<Toaster/>
				</div>
			</div>
		</div>
	);
};
export default EditorFooter;
