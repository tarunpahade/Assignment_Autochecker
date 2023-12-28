"use client";

import { FC, memo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { IconCheck, IconCopy, IconDownload } from "@/components/ui/icons";

interface Props {
  language: string;
  value: string;
  disabled: boolean;
  onChange?: any;
  height?: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  text: ".txt",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};
const CodeBlock: FC<Props> = memo(
  ({ language, value, disabled, onChange, height }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
    const [code, setCode] = useState("");
    const handleCodeChange = (event: any) => {
      // Handle changes to the code here
      setCode(event.target.value);
    };
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showDropdown, setshowDropdown] = useState(false);

    const [selectedDropdopwn, setselectedDropdopwn] = useState("c");

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    const downloadAsFile = () => {
      if (typeof window === "undefined") {
        return;
      }
      const fileExtension = programmingLanguages[language] || ".file";
      const suggestedFileName = `file-${generateRandomString(
        3,
        true
      )}${fileExtension}`;
      const fileName = window.prompt(
        "Enter file name" || "",
        suggestedFileName
      );

      if (!fileName) {
        // User pressed cancel on prompt.
        return;
      }

      const blob = new Blob([value], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    const handleDropdownClick = (language: any) => {
      setselectedDropdopwn(language);
      setIsDropdownOpen(false);
    };
    const onCopy = () => {
      if (isCopied) return;
      copyToClipboard(value);
    };
    return (
      <div className="relative w-full font-sans codeblock bg-zinc-950 ">
        <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100">
          {showDropdown ? (
            <div className="relative inline-block">
              <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                type="button"
              >
                {selectedDropdopwn}
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {Object.keys(programmingLanguages).map((key) => (
                      <li key={key}>
                        <a
                          href="#"
                          onClick={() =>
                            handleDropdownClick(programmingLanguages[key])
                          }
                          className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                            selectedDropdopwn === programmingLanguages[key]
                              ? "bg-indigo-600 text-white"
                              : ""
                          }`}
                        >
                          {key}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <span className="text-xs lowercase">{language}</span>
          )}

          <div className="flex items-center space-x-1">
            <button
              className="'h-8 rounded-md px-3shadow-none hover:bg-accent hover:text-accent-foreground hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
              onClick={downloadAsFile}
            >
              <IconDownload />
              <span className="sr-only">Download</span>
            </button>
            <button
              className="h-8 rounded-md px-3 shadow-none hover:bg-accent hover:text-accent-foreground text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
              onClick={onCopy}
            >
              {isCopied ? <IconCheck /> : <IconCopy />}

              <span className="sr-only">Copy code</span>
            </button>
          </div>
        </div>
        {disabled ? (
          <SyntaxHighlighter
            language={language}
            style={coldarkDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              width: "100%",
              background: "transparent",
              padding: "1.5rem 1rem",
            }}
          >
            {value}
          </SyntaxHighlighter>
        ) : (
          <>
            <textarea
              value={value}
              autoCorrect={"off"}
              autoComplete="off"
              
              style={
                height
                  ? { 
                      width: "100%",
                      height: height,
                      padding: 10,
                      background: "#eee",
                      fontSize: "9px",
                      border: "1px solid",
                    }
                  : {
                      width: "100%",
                      height: "550px",
                      fontSize: "13px",
                      padding:2

                    }
              }
              onChange={onChange}
            />

            <SyntaxHighlighter
              language={language}
              style={coldarkDark}
              showLineNumbers
              customStyle={{
                margin: 0,
                width: "100%",
                background: "transparent",
                padding: "1.5rem 1rem",
                display: "none", // Hide the SyntaxHighlighter component
              }}
            >
              {value}
            </SyntaxHighlighter>
          </>
        )}
      </div>
    );
  }
);
CodeBlock.displayName = "CodeBlock";

export default CodeBlock;

interface useCopyToClipboardProps {
  timeout?: number;
}

function useCopyToClipboard({ timeout = 2000 }: useCopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState<Boolean>(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard };
}
