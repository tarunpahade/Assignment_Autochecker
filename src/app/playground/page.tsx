'use client'
import * as React from 'react'
import { encode } from 'base64-url'
import '../app.css'
import { useState } from 'react';
/// This is is HTML Code 
const initialCodeString = `
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" type="text/css" href="/styles.css">
  </head>
  <body>
    <div>
      <h1>Hello Playground</h1>
      <h2>
        Start editing to see some
        magic happen!
      </h2>
    </div>
    
  </body>
  </html>
`;

const styling = `
  
    <div>
      <h1>Hello Playground</h1>
      <h2>
        Start editing to see some
        magic happen!
      </h2>
    </div>
    
`;
const js = ``


export default function Index() {
  const [code, setCode] = React.useState('')
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setjs] = useState('')

  const navigation = [
    { name: 'index.html', href: '#' },
    { name: 'styles.css', href: '#' },
    { name: 'index.js', href: '#' },

  ];
  const [selected, setSelected] = useState('index.html'); // Initialize with the default selected button

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelected(buttonName);

    if (buttonName === 'index.html') {
      setCode(html);
    } else if (buttonName === 'styles.css') {
      setCode(css);

    } else if (buttonName === 'index.js') {
      setCode(js);
    }
  };
  const onCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;

    if (selected === 'index.html') {
      console.log('Hii');

      setHtml(e.target.value)
      
    } else if (selected === 'styles.css') {
      setCss(e.target.value)

      

    } else if (selected === 'index.js') {
      setjs(e.target.value)

    
    }

    // Update the iframe's src when the code changes
    const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
    if (iframe) {
      const blob = new Blob([newCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframe.src = url;
    }
  };

  return (
    <div id="index" className="absolute top-0 w-full h-full">
      <div className="absolute  top-5 ml-10 flex items-baseline space-x-4">

        {navigation.map((item) => (
          <button
            onClick={(e) => {
              e.preventDefault()
              handleButtonClick(item.name)
            }}
            key={item.name}
            className={`${selected === item.name
              ? 'bg-gray-200 text-black'
              : 'bg-gray-900 text-white'
              }  hover:bg-slate-700 hover:text-white  rounded-md px-5 text-sm font-medium h-[30px]  bg-gray-900 text-white '`}

          >
            {item.name}
          </button>
        ))}
      </div>
      <textarea
      spellCheck="false"
      value={selected === 'index.html' ? html : selected === 'styles.css' ? css : js}
      className='pt-24'
      onChange={onCodeChange}
    />
      <iframe
        id="preview-iframe"
        sandbox="allow-scripts"
        srcDoc={`
        <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" type="text/css" href="/styles.css">
  </head>
  <body>
  <style>
  h1,h2,h3,h4,h5,h6,p{
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
        `}>

      </iframe>
    </div>

  )
}

function Preview({ code }: any) {
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const frameSource = React.useRef('')

  /**
   * Only set the source of the iframe on the initial mount since we use message
   * passing below for subsequent updates.
   */
  if (frameSource.current === null) {
    frameSource.current = `/preview?code=${encode(code)}}`
  }
  React.useEffect(() => {
    if (frameRef.current && frameRef.current.contentWindow) {
      frameRef.current.contentWindow.postMessage({
        code: encode(code),
        type: 'preview',
      });
    }
  }, [code]);

  return <iframe ref={frameRef} src={frameSource.current} >{code}</iframe>
}