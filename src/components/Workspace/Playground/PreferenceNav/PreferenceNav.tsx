import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";
import { ISettings } from "../Playground";
import { ComboboxDemo } from "@/components/comboBox/comboBox";
// import SettingsModal from "@/components/Modals/SettingsModal";

type PreferenceNavProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
	value: string, setValue:any , languages:any
};
const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings, value, setValue , languages }) => {
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
				{/* <button className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium'>
					<div className='flex items-center px-1 '>
						<div className='text-xs text-label-2 text-white'>JavaScript</div>
					</div>
				</button> */}
				<ComboboxDemo value={value} setValue={setValue}  placeholder='Select a language' 
						// className='w-[100px]'
						
						
						// onChange={(e) => {
						// 	console.log(e)
						// 	setValue(e.value)
						// }}
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
			{/* {settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings} />} */}
		</div>
	);
};
export default PreferenceNav;
