import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { clike, c } from '@codemirror/legacy-modes/mode/clike';
import { StreamLanguage } from '@codemirror/language';

import EditorFooter from "./EditorFooter";
import { Problem } from "@/types/problems";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast"
import { problems } from "@/utils/javascript";
import axios from "axios";
import { useSession } from "next-auth/react";

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}
const cLanguage = StreamLanguage.define(c);
const languages = [
	{
		value: "js",
		label: "Javascript",
		extension: javascript(),
	},
	{
		value: "java",
		label: "Java",
		extension: java(),
	},
	{
		value: "cpp",
		label: "C++",
		extension: cpp(),
	},
	{
		value: "c",
		label: "C",
		extension: cLanguage,
	},
	{
		value: "py",
		label: "Python",
		extension: python(),
	},
];

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const { toast } = useToast()
	const { data: session } = useSession();
	const [value, setValue] = useState("js")
	
	const [userCode, setUserCode] = useState(problem.starterCode);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);;
	const [fontSize] = useLocalStorage("lcc-fontSize", "16px");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const [user] = useState({ email: 'user@example.com' });
	const pid = problem.id
	const [output, setOutput] = useState("");
	const [jobId, setJobId] = useState(null);
	const [status, setStatus] = useState('');
	const [jobDetails, setJobDetails] = useState('job Details');
	let pollInterval: string | number | NodeJS.Timeout | undefined;
	const [selectedTab, setSelectedTab] = useState('Testcases');
	const [activeTestCaseId2, setActiveTestCaseId2] = useState(0);

	//Directly Sends Requests to backend and starts polling in frontend
	const handleSubmit = async () => {
		const payload = {
			language: value,
			code: userCode,
		};
		try {
			setOutput("");
			setStatus('');
			setJobId(null);
			setJobDetails('');
			console.log(payload);


			const { data } = await axios.post("http://localhost:3000/run", payload);
			console.log(data,'this is data');

			if (data.jobId) {
				setJobId(data.jobId);
				setStatus("Submitted.");

				pollInterval = setInterval(async () => {
					const { data: statusRes } = await axios.get(
						`http://localhost:3000/status`,
						{
							params: {
								id: data.jobId,
							},
						}
					); 
					const { success, job, error } = statusRes;
					console.log(statusRes,'this is Data');
					if (success) {
						const { status: jobStatus, output: jobOutput } = job;
						console.log(job);
						
						setStatus(jobStatus);
						setJobDetails(JSON.stringify(job));
						if (jobStatus === "pending") return;
						setOutput(jobOutput);
						clearInterval(pollInterval);
					} else {
						console.error(error);
						setOutput(error);
						setStatus("Bad request");
						clearInterval(pollInterval);
					}
				}, 1000);
			} else {
				setOutput("Retry again.");
			}
		} catch (err: any) {


			setOutput(err.message);

		}
	};
	
// Sends request to backend and does polling in the backend
const handleRun = async () => {
  try {
    const payload = {
		language: value,
		code: userCode,
	};
console.log('starting to submit');

    // Submit code to the backend endpoint
    const response = await axios.post("/api/problems/runProblem", payload);
    const { jobId, success, error } = response.data;
console.log( response.data,'this is response data ');
    if (success && jobId) {
		console.log('starting polling');
		
console.log('Startying polling');

		setJobId(jobId);
		setStatus("Submitted.");

		pollInterval = setInterval(async () => {
			const { data: statusRes } = await axios.get(
				`http://localhost:3000/status`,
				{
					params: {
						id: jobId,
					},
				}
			); 
			const { success, job: job2, error } = statusRes;
			console.log(statusRes,'this is Data');
		
			if (success) {
				const { status: jobStatus, output: jobOutput } = job2;
				console.log(job2,'i am job2 ');
				
				setStatus(jobStatus);
				setJobDetails(JSON.stringify(job2));
				if (jobStatus === "pending") return;
				setOutput(jobOutput);
				setSelectedTab('Output')
				clearInterval(pollInterval);
			} else {
				console.error(error);
				setOutput(error.message);
//				setSelectedTab('Console')

				setStatus("Bad request");
				clearInterval(pollInterval);
			}
		}, 1000);
	} else {
		setOutput("Retry again.");
	
    }
  } catch (error: any) {
    console.error("Error in handleRun:", error.message,error);
  }
};

// Runs Function and tests in javascript
const handleSubmit2 = async (e: any) => {
    e.preventDefault();
    try {
        const newuserCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
        
        if (value === 'Javascript') {
            // Execute locally for JavaScript
            const cb = new Function(`return ${newuserCode}`)();
            const handlerFunction = problems[pid as string].handlerFunction;

            if (typeof handlerFunction === "function") {
                const success = handlerFunction(cb);
                handleSuccess(success);
            }
        } else {
            const cb = new Function(`return ${newuserCode}`)();
            const handlerFunction = problems[pid as string].starterFunctionNameMultipleLanguages;
			const success = handlerFunction(value, userCode);
console.log(success);

            const response = await axios.post('http://localhost:3000/run', {
                language: value,
                code: newuserCode,
            });

            if (response.data.job.status === 'success') {
                handleSuccess(true);
            } else {
                handleFailure();
            }
        }
    } catch (error: any) {
        console.log(error.message);
        handleFailure();
    }
};

const handleSuccess = (success: boolean) => {
    if (success) {
        toast({
            title: 'Congrats! All tests passed!',
            description: "Your code was successfully submitted",
        });

        setUserCode(userCode);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 4000);

        setSolved(true);
    } else {
        handleFailure();
    }
};

const handleFailure = () => {
    toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your code or request.",
    });
};

	//Stores User Details and sends to submitProblem
	const SendData = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		console.log("yoooo");
		try {
			console.log(session?.user.email, "hshsh");
			setError(false);
			const response = await axios.post("api/problems/submitProblem", {
				problemName: problem.id,
				name: session?.user.name,
				rollno: 'Dummy Roll No', //Replace This Here session?.user.rollno
				department: 'BCA', //tHIS IS BCA || CSE
				college: 'Dummy College', //Replace This Here session?.user.college  
				university: 'Dummy University', //Replace This Here session?.user.university
			});
			console.log(response.data);





			setLoading(false);


			//setSucessfullySent(true)
		} catch (error) {
			console.log(error);
			setLoading(false);
			setError(true);
		}
	};

	function getLanguageExtension(value: string) {
		const language = languages.find(lang => lang.value === value);
		return language ? language.extension : null;
	}
	const languageExtension = getLanguageExtension(value);
	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		} else {
			setUserCode(problem.starterCode);
		}
	}, [pid, user, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} value={value} setValue={setValue} languages={languages} />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value={userCode}
						theme={vscodeDark}
						onChange={onChange}
						//	extensions={[StreamLanguage.define(c)]}
						extensions={languageExtension ? [languageExtension] : []}

						// extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
					/>

				</div>
				<div className='w-full px-5 overflow-auto bg-[#282828]'>
					<div className='flex h-10 items-center space-x-6  '>
						<div className='relative flex h-full  justify-center cursor-pointer pt-2'>
							<div
								className={`text-sm font-medium leading-5  px-2 cursor-pointer ${selectedTab === 'Testcases' ? 'text-white border-white border-b-2' : 'text-gray-500 border-transparent'
									}`}
								onClick={() => setSelectedTab('Testcases')}
							>
								Testcases
							</div>
							<div
								className={`text-sm font-medium leading-5 px-2 cursor-pointer ${selectedTab === 'Output' ? 'text-white border-white border-b-2' : 'text-gray-500 border-transparent'
									}`}
								onClick={() => setSelectedTab('Output')}
							>
								Output 
							</div>
							<div
								className={`text-sm font-medium leading-5 px-2 cursor-pointer ${selectedTab === 'Console' ? 'text-white border-white border-b-2' : 'text-gray-500 border-transparent'
									}`}
								onClick={() => setSelectedTab('Console')}
							>
								Console
							</div>
							{/* <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' /> */}

						</div>
					</div>
					{selectedTab === 'Testcases' && (
						<div>
							{/* Testcases Content */}
							<div className='flex'>
								{problem.examples.map((example, index) => (
									<div
										className='mr-2 items-start mt-2 bg-[#3d3d3d] rounded-md'
										key={example.id}
										onClick={() => setActiveTestCaseId2(index)}
									>
										<div className='flex flex-wrap items-center gap-y-4 '>
											<div
												className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                    ${activeTestCaseId2 === index ? 'text-white' : 'text-gray-500'}
                  `}
											>
												Case {index + 1}
											</div>
										</div>
									</div>
								))}
							</div>

							<div className='font-semibold my-4'>
								<p className='text-sm font-medium mt-4 text-white'>Input:</p>
								<div className='w-full bg-[#3d3d3d] cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
									{problem.examples[activeTestCaseId2].inputText}
								</div>
								<p className='text-sm font-medium mt-4 text-white'>Output:</p>
								<div className='w-full bg-[#3d3d3d] cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
									{problem.examples[activeTestCaseId2].outputText}
								</div>
							</div>
						</div>
					)}

					{selectedTab === 'Output' && (
						<div className='w-full h-64 bg-black'>
							Output  : {output}
						</div> // Example black rectangle for Output
					)}

					{selectedTab === 'Console' && (
						<div className='w-full h-64 bg-dark-blue'>
							You Will See Console Logs Here
						</div> // Example dark blue rectangle for Console
					)}
				</div>
			</Split>
			<EditorFooter handleSubmit={handleRun} />
		</div>
	);
};
export default Playground;
