import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "../Playground";
import { ComboboxDemo } from "@/components/comboBox/comboBox";

type PreferenceNavProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
	value: string, setValue:any , languages:any;
	handleChange: any
};
const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings, value, setValue , languages,handleChange }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	
	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

	return (
		<div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full '>
			<div className='flex items-center text-white bg-[#282828]'>
	
				<ComboboxDemo bg="bg-[#282828] text-white" handleChange={handleChange} value={value} setValue={setValue}  placeholder='Select a language' 
					    frameworks={languages}/>
			
			</div>

			<div className='flex items-center m-2'>
				<button
					className='preferenceBtn group'
					onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
				>
					<div className='h-4 w-4 text-white text-dark-gray-6 font-bold text-lg'>
						<AiOutlineSetting />
					</div>
					
				</button>

				<button className='preferenceBtn group' onClick={handleFullScreen}>
					<div className='h-4 w-4 text-dark-gray-6 font-bold text-lg text-white ml-5'>
						{!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
					</div>
					
				</button>
			</div>
		</div>
	);
};
export default PreferenceNav;
