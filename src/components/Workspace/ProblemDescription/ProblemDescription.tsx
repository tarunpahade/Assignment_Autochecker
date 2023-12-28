
import { DBProblem, Problem } from "@/types/problems";
import { problems } from "@/utils/javascript";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";

type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

const ProblemDescription: React.FC<any> = ({ problem, _solved }) => {
	
	const cp=problem
	console.log('this is cp',cp);
	
	const exampless=cp.examples
	console.log('this is exampless',exampless);
	
	
	const { currentProblem, loading, problemDifficultyClass } = useGetCurrentProblem(problem.title);
	
	
	const [updating, setUpdating] = useState(false);


	return (
		<div className='bg-dark-layer-1 '>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden '>
				<div className={" rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer bg-[#282828]"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto bg-[#282828]'>
				<div className='px-5 '>
					{/* Problem heading */}
					<div className='w-full '>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-medium'>{cp?.title}</div>
						</div>
						{!loading && currentProblem && (
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
								>
									{currentProblem.difficulty}
								</div>
								
									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
										<BsCheck2Circle />
									</div>
								
								</div>
						)}

						{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<div dangerouslySetInnerHTML={{ __html: cp.problemStatement }} />
							
						</div>

						{/* Examples */}
						<div className='mt-4'>
							{exampless.map((example: { id: Key | null | undefined; img: string | StaticImport; inputText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; outputText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; explanation: any; },index: number) => (
								<div key={example.id} className="bg-[#3d3d3d] mt-5 p-3 text-sm">
									<p className='font-medium text-white '>Example {index + 1}: </p>
									{example.img && <Image src={example.img} width={100}  height={100} alt='' className='mt-3' />}
									<div className='example-card'>
										<pre>
											<strong className='text-white'>Input: </strong> {example.inputText}
											<br />
											<strong>Output:</strong>
											{example.outputText} <br />
											{example.explanation && (
												<>
													<strong>Explanation:</strong> {example.explanation}
												</>
											)}
										</pre>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='my-8 pb-4'>
							<div className='text-white text-sm font-medium'>Constraints:</div>
							<ul className='text-white ml-5 list-disc '>
								<div dangerouslySetInnerHTML={{ __html: cp.constraints }} />
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

 function useGetCurrentProblem(problemId: string) {
    const [currentProblem, setCurrentProblem] = useState<any>(problems[problemId]);
	const [loading, setLoading] = useState<boolean>(true);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

    useEffect(() => {
        const getCurrentProblem = async () => {
            setLoading(true);
            
            // Assuming the problems object is available here
            const problem2:any = problems[problemId];
console.log(problem2)
            if (problem2) {
                setCurrentProblem(problem2);

                // Set difficulty class based on problem difficulty
                setProblemDifficultyClass(
                    problem2.difficulty === "Easy"
                        ? "bg-olive text-olive"
                        : problem2.difficulty === "Medium"
                        ? "bg-dark-yellow text-dark-yellow"
                        : "bg-dark-pink text-dark-pink"
                );
            } else {
                // Handle case where problem is not found
                setCurrentProblem(null);
                setProblemDifficultyClass("");
            }

            setLoading(false);
        };

        getCurrentProblem();
    }, [problemId]);

    return { currentProblem, loading, problemDifficultyClass };
}



const RectangleSkeleton: React.FC = () => {
	return (
		<div className='space-y-2.5 animate-pulse'>
			<div className='flex items-center w-full space-x-2'>
				<div className='h-6 w-12 rounded-full bg-dark-fill-3'></div>
			</div>
		</div>
	);
};
const CircleSkeleton: React.FC = () => {
	return (
		<div className='space-y-2.5 animate-pulse max-w-lg'>
			<div className='flex items-center w-full space-x-2'>
				<div className='w-6 h-6 rounded-full bg-dark-fill-3'></div>
			</div>
		</div>
	);
};