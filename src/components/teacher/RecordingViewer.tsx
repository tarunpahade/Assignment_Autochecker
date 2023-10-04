"use client";

// Import necessary modules and components
import { useEffect, useState, useRef } from "react";
import '../../app/app.css'
import UploadForm from "./textArea";
// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Export the MicrophoneComponent function component
export default function MicrophoneComponent() {
  // State variables to manage recording status, completion, and transcript
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [transcriptPermenant, setPermenantTranscript] = useState("");
  const [showTranscript, setShowTranscript] = useState(false);
const onChange = (y:any)=>{
console.log(y);

    //setPermenantTranscript(y.target.value)
}
  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);
let lastResult=''
  // Function to start recording
  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      console.log(event.results);
      
  // Calculate the new portion of the transcript
  const newPortion = transcript.substring(lastResult.length);

  // Update the last recognized result
  lastResult = transcript;
  

    setPermenantTranscript((prevTranscript) => prevTranscript + newPortion);
      
    setTranscript(newPortion);      

    };
  

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
      console.log(transcriptPermenant);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // Render the microphone component with appropriate UI based on recording state
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full h-full items-center justify-center pt-10">
        {showTranscript ? (
            <div className="w-[80%] h-[30%] m-auto mt-12">
    <UploadForm value={transcriptPermenant} onChange={onChange} hideTranscript={()=>{setShowTranscript(false)}} />
   
</div>
        ) : (
            <>
        {(isRecording || transcript) && (
          <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recordingComplete
                    ? "Thanks for talking."
                    : "Start speaking..."}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>

            {transcript && (
              <div className="border rounded-md p-2 h-fullm mt-4">
                <p className="mb-0">{transcript}</p>
              </div>
            )}
          </div>
        )}
       

        <div className="flex items-center w-full mt-10">
          {isRecording ? (
            <button
              onClick={handleToggleRecording}
              className=" m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                className="h-12 w-12 "
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="white" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          ) : (
            <div className="flex m-auto items-center  justify-between">
                 {(transcriptPermenant.length === 0 && transcript.length === 0) && (
        <p className="text-3xl font-bold  tracking-tight pl-5 text-gray-900 mr-5 w-[55%] ">Click Here To start recording</p>

        )

        }
              <button
                onClick={handleToggleRecording}
                className="  flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-16 focus:outline-none"
              >
                <svg
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                >
                  <path
                    fill="currentColor" // Change fill color to the desired color
                    d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                  />
                </svg>
              </button>
              {recordingComplete ? (
                <div className="flex justify-between h-[10%] w-full pl-5 ">
                  <div onClick={()=>{setShowTranscript(true)}} className="pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900">
                    <div className="flex px-3 py-2">
                      <svg className="mr-2.5 h-5 w-5 flex-none fill-slate-400">
                        <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path>
                      </svg>
                      View Transcript
                    </div>
                  </div>
                  <div className="pointer-events-auto px-3 py-2 relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900">
                    Upload
                  </div>
                  
                </div>
              ) : null}
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}
