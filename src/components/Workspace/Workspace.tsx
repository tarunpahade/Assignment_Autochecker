'use client'
import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";


type WorkspaceProps = {
	problem: any;
};
 
const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
	const { width, height } = useWindowSize();
	const [success, setSuccess] = useState(false);
	const [solved, setSolved] = useState(false);
    const currentProblem=problem.problem
	
	return (
		<Split className='split h-full w-full flex bg-[#1a1a1aff] text-white' minSize={0}>
			<ProblemDescription problem={currentProblem} _solved={solved} />
			<div className='bg-dark-fill-2'>
				<Playground problem={currentProblem} setSuccess={setSuccess} setSolved={setSolved} />
				{success && <Confetti gravity={0.3} tweenDuration={4000} width={width - 1} height={height - 1} />}
			</div>
		</Split>
	);
};
export default Workspace;
