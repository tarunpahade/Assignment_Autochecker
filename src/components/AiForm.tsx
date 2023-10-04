import React from 'react'

export const AiForm = ({ aiResponsedSuccessfully, inputValue, setUserPrompt, onSubmit,disabled,ref}: any) => {
  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      onSubmit(); 
      setUserPrompt('')
    }
  };
  return (
    <div className="mx-auto sm:max-w-2xl sm:px-4">
      <div className="flex h-12 items-center justify-center">

        {aiResponsedSuccessfully ? (

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
        ) : null

        }
      </div>
      <div className="bg-white space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
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
              value={inputValue}
              onChange={(e) => { 
                setUserPrompt(e.target.value)


               }}
              onKeyDown={handleKeyPress}
              rows={1}
              placeholder="Send a message."
              spellCheck="false"
              ref={ref}
              className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm "
            // style="height: 62px !important;"
            ></textarea>
            <div className="absolute right-0 top-4 sm:right-4">
              <button
                className="inline-flex items-center hover:bg-white hover:text-gray-900 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-8 w-8 p-0"
                type="submit"
                data-state="closed"
                disabled={disabled && inputValue === ''  ? true : false}
                onClick={(e) => {
                  e.preventDefault()
                  if( inputValue === ''){
                    
                  } else{
                    onSubmit()
                  }
                  
                }}
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
  )
}
