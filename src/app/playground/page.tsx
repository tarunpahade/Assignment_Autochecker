"use client";
import * as React from "react";
import "../app.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


export default function Index() {
  const [code, setCode] =useState("");
  const [showAIresult, setshowAIresult] = useState(false)
  const [html, setHtml] = useState(
    "<h2 className='typing-animation' >Hello There start Your Coding journey here!  🎉 🎉 🎉</h2>"
  );
  const [css, setCss] = useState(`
  .typing-animation {
    animation: typing 2s steps(40, end), blink-caret 0.75s step-end infinite;
  }
  
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }`);
  const [js, setjs] = useState("");

  const searchParams = useSearchParams();

  const search = searchParams.get("data");
  console.log(JSON.parse(search!));
  
  const [userData] = useState(JSON.parse(search!));
  const navigation = [
    { name: "index.html", href: "#" },
    { name: "styles.css", href: "#" },
    { name: "index.js", href: "#" },
  ];
  const navigation2 = [
    { name: "Browser Result", href: "#" ,onClick: ()=>{

      //ts ignore
      setshowAIresult(false)
    
    }},
    { name: "View AI response", href: "#",onClick: ()=>{

      //ts ignore
      setshowAIresult(true)
    
    } },
  ];
  const [selected, setSelected] = useState("index.html"); // Initialize with the default selected button
  const [text, setText] = useState("");

  const [selected2, setSelected2] = useState("Browser Result");
  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelected(buttonName);

    if (buttonName === "index.html") {
      setCode(html);
    } else if (buttonName === "styles.css") {
      setCode(css);
    } else if (buttonName === "index.js") {
      setCode(js);
    }
  };
  const handleButtonClick2 = (buttonName: React.SetStateAction<string>) => {
    setSelected2(buttonName);
  };
  const onCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;

    if (selected === "index.html") {
      console.log("Hii");

      setHtml(e.target.value);
    } else if (selected === "styles.css") {
      setCss(e.target.value);
    } else if (selected === "index.js") {
      setjs(e.target.value);
    }

    // Update the iframe's src when the code changes
    const iframe = document.getElementById(
      "preview-iframe"
    ) as HTMLIFrameElement;
    if (iframe) {
      const blob = new Blob([newCode], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      iframe.src = url;
    }
  };

  // useEffect(() => {
  //   const words = 'This is a typing effect.';
  //   let index = 0;

  //   const interval = setInterval(() => {
  //     setText(words.slice(0, index));
  //     index++;

  //     if (index > words.length) {
  //       clearInterval(interval);
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setHtml(html.slice(0, index));
      index++;

      if (index > html.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="index" className="absolute top-0 w-full h-full bg-gray-900">
      <div className="absolute top-0 bg-gray-900 pl-3  items-baseline space-x-4 w-[52%] pt-5">
        <div className="block w-[90%] mt-2 ml-0 p-6 border  rounded-lg shadow  bg-gray-800 border-gray-700 hover:bg-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
            Assignment
          </h5>
          <p className="font-normal text-gray-400">{userData.name}</p>
        </div>
        <div className="mt-8">
          {navigation.map((item) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleButtonClick(item.name);
              }}
              key={item.name}
              className={`${
                selected === item.name
                  ? "bg-gray-200 text-black"
                  : "bg-gray-900 text-white"
              }  hover:bg-slate-700 hover:text-white  rounded-md px-5 text-sm font-medium h-[35px]  bg-gray-800 text-white '`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div id="textareaDiv" className=" mt-5 0 h-[370px] w-[80%]">
          <textarea
            spellCheck="false"
            value={
              selected === "index.html"
                ? html
                : selected === "styles.css"
                ? css
                : js
            }
            className="code-input"
            onChange={onCodeChange}
          />
        </div>
      </div>
      <div className="absolute left-[48%] w-[48%] h-[65%] pt-5 ml-4">
        <div className="block    border h-full mb-10 w-[100%]   p-2 rounded-lg shadow  bg-gray-800 border-gray-700 ">
     {showAIresult ? (
 <iframe
 id="preview-iframe"
 sandbox="allow-scripts"
 srcDoc={`
<!DOCTYPE html>
<html>
<head>

</head>
<body>

<style>
h1,h2,h3,h4,h5,h6,p{
color: white; 
}
</style>
<h3>${userData.result}</h3>
</body>
</html>
`}
></iframe>


     ) : (
 <iframe
 id="preview-iframe"
 className=""
 sandbox="allow-scripts"
 srcDoc={`
<!DOCTYPE html>
<html>
<head>

</head>
<body>
<style>
body{
color: white
}
${css}
</style>
${html}
<script>
${js}
</script>
</body>
</html>
`}
></iframe>
     )

     }
         
        </div>
        <div className="p-[1rem] ml-5 ">
          {navigation2.map((item) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleButtonClick2(item.name);
                setshowAIresult(!showAIresult)
              }}
              key={item.name}
              
              className={`${
                selected2 === item.name
                  ? "bg-gray-200 text-black"
                  : "bg-gray-900 text-white"
              }  hover:bg-slate-700 hover:text-white  rounded-md px-5 text-sm font-medium h-[39px] right-0 
                 bg-gray-800 text-white '`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="mx-auto sm:max-w-2xl sm:px-4">
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z"></path>
                </svg>
                Regenerate response
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 256 256"
                >
                  <path d="m237.66 106.35-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z"></path>
                </svg>
                Share
              </button>
            </div>
          </div>
          <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
            <form>
              <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                <button
                  className="inline-flex items-center justify-center text-sm font-medium shadow ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4"
                  data-state="closed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z"></path>
                  </svg>
                  <span className="sr-only">New Chat</span>
                </button>
                <textarea

                  rows={1}
                  placeholder="Send a message."
                  spellCheck="false"
                  className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm "
                  // style="height: 62px !important;"
                ></textarea>
                <div className="absolute right-0 top-4 sm:right-4">
                  <button
                    className="inline-flex items-center hover:bg-white hover:text-gray-900 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-8 w-8 p-0"
                    type="submit"
                    data-state="closed"
                  onClick={(e)=>{
                    e.preventDefault()
                    setCss(`h2 {
                      color: red;
                      }`)}}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                      className="h-4 w-4 "
                    >
                      <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z"></path>
                    </svg>
                    <span className="sr-only">Send message</span>
                  </button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}
