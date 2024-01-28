"use client";
import * as React from "react";
import "../app.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IconCheck } from "@/components/ui/icons";
import CodeBlock from "@/components/ui/codeBlock";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { htmlLanguage } from '@codemirror/lang-html' 
import Split from "react-split";
import useLocalStorage from "@/hooks/useLocalStorage";



export default function Index() {
  const { data: session } = useSession();
  const [showAIresult, setshowAIresult] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(false);

  const [css, setCss] = useState(``);
  const [js, setjs] = useState("");

  const searchParams = useSearchParams();
  const [result, setResult] = useState("");
  const search = searchParams?.get("data");
  const parsedData = JSON.parse(search!);
  const [htmlCode, setHtml] = useState(
    `
    <!DOCTYPE html>
    <html>
    <head>
    <title>${parsedData.name}</title>
    </head>
    <body>
    <style>
    *{
      color: white;
      font-family: monospace;
     }
       </style>
       
       <h2  >Hello There start Your Coding journey here!  🎉</h2>
      <script>
  
      </script>
      </body>`
  );
  const [userData, setUserData] = useState(JSON.parse(search!));
  const navigation = [];

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "12px");

const [settings, setSettings] = useState({
  fontSize: fontSize,
  settingsModalIsOpen: false,
  dropdownIsOpen: false,
});

  if (userData.uploadType === "Single Document") {
    navigation.push({ name: "index.html", href: "#" });
  } else if (userData.uploadType === "Two files Html and CSS ") {
    navigation.push(
      { name: "index.html", href: "#" },
      { name: "styles.css", href: "#" }
    );
  } else if (userData.uploadType === "Multiple document Files (Html, Css Js)") {
    navigation.push(
      { name: "index.html", href: "#" },
      { name: "styles.css", href: "#" },
      { name: "index.js", href: "#" }
    );
  } else {
    navigation.push({ name: "index.html", href: "#" });
  }
  const [selected, setSelected] = useState(
    userData.markedAs === "complete" ? "ai" : "index.html"
  ); // Initialize with the default selected button
  const [loading, setloading] = useState(false);

  

  const onCodeChange = (e: any) => {
    console.log("Hii",e);

    const newCode = e;
console.log(newCode);
    if (selected === "index.html") {
      console.log("Hii",e);

       setHtml(e);
    } else if (selected === "styles.css") {
      setCss(e);
    } else if (selected === "index.js") {
      setjs(e);
    }

    // // Update the iframe's src when the code changes
    // const iframe = document.getElementById(
    //   "preview-iframe"
    // ) as HTMLIFrameElement;
    // if (iframe) {
    //   const blob = new Blob([newCode], { type: "text/html" });
    //   const url = URL.createObjectURL(blob);
    //   console.log(url);
      
    //   iframe.src = url;
    // }
  };
  useEffect(() => {
    let index = 0;
    const words = userData.result;
    if (!words) {
      return;
    }
    const interval = setInterval(() => {
      setResult(words.slice(0, index));
      index++;

      if (index > words.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAIresult]);

  const SendData = async (e: any) => {
    e.preventDefault();
    setloading(true);
    console.log("yoooo");
    try {
      console.log(selected, session?.user.name, "hshsh");
      setError(false);
      const response = await axios.post("api/users/completeAssignment", {
        currecntAssignment: userData,
        name: session?.user.name,
        submittedCode: htmlCode,
        subbmissionType:'Code'
      });
      console.log(response.data);

      const newUserData = userData;
      newUserData.markedAs = "complete";
      newUserData.submittedCode = htmlCode;
      setUserData(newUserData);
      setloading(false);
      setResult(response.data);
      setshowAIresult(true);

      //setSucessfullySent(true)
    } catch (error) {
      console.log(error);
      setloading(false);
      setError(true);
    }

    if (userData.markedAs === "complete") {
      setSelected("ai");
    }
  };
  return (
    <div id="index" className="absolute top-0 w-full h-full bg-gray-900">
      <div className="absolute top-0 bg-gray-900 pl-3  items-baseline space-x-4 w-[52%] pt-5">
        
        {error ? (
          <div className="block w-[90%] mt-2 ml-0 p-6 border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700">
            <p className="w-full font-normal text-gray-400">
              {userData.name} Error Occured Plese Try Again Later
            </p>
          </div>
        ) : null}

        <div id="textareaDiv" className=" mt-5 0 h-[370px] w-[80%]">
          {userData.markedAs === "complete" ? (
            <>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                See Submitted Code Here
              </h5>
              <CodeBlock
                disabled={true}
                language={"html"}
                value={userData.submittedCode}
              />
            </>
          ) : (
            
			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}> 
				<div className='w-full h-full overflow-auto'>
            <CodeMirror
            value={htmlCode}
						theme={vscodeDark}
						onChange={onCodeChange}
             extensions={[htmlLanguage]}
             style={{ fontSize: settings.fontSize }}						
                        className="h-full overflow-auto"
					/>
          </div>
          </Split>
            // <CodeBlock
            //   disabled={false}
            //   value={html}
            //   language={"html"}
            //   onChange={onCodeChange}
            // />
          )}
        </div>
      </div>
      <div className="absolute left-[48%] w-[48%] h-[65%] pt-5 ml-4">
      <div className="block w-[90%] mt-2 ml-0 p-6 border  rounded-lg shadow  bg-gray-800 border-gray-700">
          {/* <h5 className="mb-2 text-lg font-bold tracking-tight text-white">
            Assignment
          </h5> */}
          <p  style={{fontSize:'12px'}} className="w-full font-normal text-gray-400">
            {userData.name} {userData.description}
          </p>
       
        <div className="block  mt-5  border  mb-10 w-[100%]  h-60 p-2 rounded-lg shadow  bg-gray-800 border-gray-700 ">
          {showAIresult ? (
            <div className="block w-[90%] mt-2 ml-0 p-6   rounded-lg shadow  ">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                Feedback
              </h5>
              <p className="font-normal text-gray-400 typing-animation">
                {result}
              </p>
            </div>
          ) : (
            <>
              {image ? (
                <div className="p-3 ">
                  <Image
                    alt="Assignment Image"
                    className="h-[300px]"
                    src={userData.image}
                    width={490}
                    height={300}
                  />
                  <a
                    href={userData.image}
                    target="_blank"
                    className="underline w-full text-slate-600 pt-2 "
                  >
                    Open Image in new tab
                  </a>
                </div>
              ) : (
                <iframe
                  id="preview-iframe"
                  className="text-white"
                  sandbox="allow-scripts"
                  srcDoc={`
<!DOCTYPE html>
<html>
<head>

</head>
<style>
*{
color: white;
font-family: math;
}
</style>
${
  userData.markedAs === "complete"
    ? `
<body>

${userData.submittedCode}
</body>`
    : `
  ${htmlCode}
 `
}
</html>
`}
                ></iframe>
              )}
            </>
          )}
        </div>
</div>

        {userData.markedAs === "complete" ? (
          <div className="flex h-12 items-center mt-5 justify-center">
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("hii");
                  setshowAIresult(false);
                  setImage(false);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z"></path>
                </svg>
                View Browser Output
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("hii");
                  setshowAIresult(false);
                  setImage(false);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z"></path>
                </svg>
                View Question
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("hii");
                  setResult(userData.result)
                  setImage(false);

                  setshowAIresult(true);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 256 256"
                >
                  <path d="m237.66 106.35-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z"></path>
                </svg>
                View AI feedback
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  
                  setshowAIresult(false);
                  setImage(true);
                }}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2"
              >
                <IconCheck className="mr-5" />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 256 256"
                >
                  <path d="m237.66 106.35-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z"></path>
                </svg> */}
                View Image
              </button>
            </div>
          </div>
        ) : (
          <div className="px-5 ml-5 mt-5">
            {userData.image ? (
              <button
                onClick={() => {
                  setImage(true);
                }}
                className={` bg-slate-700 py-2 mr-5   text-white   rounded-md px-5 text-base font-medium h-[43px] right-0 
                 `}
              >
                View Image
              </button>
            ) : null}

            <button
              className={` bg-slate-700 py-2 mr-5  text-white   rounded-md px-5 text-base font-medium h-[43px] right-0 
                 `}
              onClick={() => setImage(false)}
            >
              Browser Result
            </button>
            
            
            <button
              onClick={SendData}
              type="button"
              className="py-2 cursor-pointer px-5 mx-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  <>Loading...</>
                </>
              ) : (
                <> Submit </>
              )}
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
