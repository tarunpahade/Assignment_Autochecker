"use client";
import { url } from "inspector";
import Image from "next/image";
import React, { useState } from "react";

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  // Define the content for each tab
  const tabs: any = {
    Profile: (
      <div>
        <h2 className="font-semibold font-mono text-2xl text-white">Bio</h2>
        <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white font-mono prose prose-headings:text-white prose-a:text-white">
        <ul>
<li>🌱 I’m currently learning advanced concepts of <a href="https://reactjs.org/">React.js</a> and its ecosystem of frameworks and components</li>
<li>👯 I’m looking to collaborate on Open source projects like <a href="http://github.com/openpesa/">Openpesa</a></li>
<li>🔭 I’m currently working on open sources projects</li>
<li>💬 Ask me about <a href="https://nextjs.org/">Next.js</a>, <a href="https://reactjs.org/">React.js</a> ,  <a href="https://laravel.com/">Laravel</a>, etc</li>
<li>⚡ Fun fact: I love food and swimming</li>

</ul>
        </article>
      </div>
    ),
    Performance: (
      <div>
        <h2 className="font-semibold font-mono text-2xl text-white">
          Performance
        </h2>
        <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white font-mono prose prose-headings:text-white prose-a:text-white">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-base font-normal">
                  Total Revenue
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">$15,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
                <div className="h-[80px]">
                  <div
                    className="recharts-responsive-container"
                    
                    
                  >
                    <div
                      className="recharts-wrapper"
                      role="region"
                    >
                      <svg
                        className="recharts-surface"
                        width="153"
                        height="80"
                        viewBox="0 0 153 80"
                      >
                        <title></title>
                        <desc></desc>
                        <defs>
                          <clipPath id="recharts1-clip">
                            <rect x="10" y="5" height="75" width="133"></rect>
                          </clipPath>
                        </defs>
                        <g className="recharts-layer recharts-line">
                          <path
                            stroke-width="2"
                            stroke="#3182bd"
                            fill="none"
                            width="133"
                            height="75"
                            className="recharts-curve recharts-line-curve"
                            d="M10,52.143C16.333,46.779,22.667,41.415,29,41.415C35.333,41.415,41.667,52.679,48,54.821C54.333,56.964,60.667,56.964,67,58.036C73.333,59.107,79.667,61.25,86,61.25C92.333,61.25,98.667,56.18,105,54.286C111.333,52.391,117.667,52.818,124,49.882C130.333,46.946,136.667,28.016,143,9.085"
                          ></path>
                          <g className="recharts-layer"></g>
                          <g
                            className="recharts-layer recharts-line-dots"
                            role="img"
                          >
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="10"
                              cy="52.14285714285714"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="29"
                              cy="41.41517857142857"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="48"
                              cy="54.821428571428584"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="67"
                              cy="58.035714285714285"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="86"
                              cy="61.25"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="105"
                              cy="54.285714285714285"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="124"
                              cy="49.88214285714285"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                            <circle
                              r="3"
                              stroke-width="2"
                              stroke="#3182bd"
                              fill="#fff"
                              width="133"
                              height="75"
                              cx="143"
                              cy="9.08482142857143"
                              className="recharts-dot recharts-line-dot"
                            ></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-base font-normal">
                  Subscriptions
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
                <div className="mt-4 h-[80px] w-[153.4375]">
                  <div
                    className="recharts-responsive-container"

                  >
                    <div
                      className="recharts-wrapper"
                      role="region"
                    >
                      <svg
                        className="recharts-surface"
                        width="153"
                        height="80"
                        viewBox="0 0 153 80"
                      >
                        <title></title>
                        <desc></desc>
                        <defs>
                          <clipPath id="recharts4-clip">
                            <rect x="5" y="5" height="70" width="143"></rect>
                          </clipPath>
                        </defs>
                        <g className="recharts-layer recharts-bar">
                          <g className="recharts-layer recharts-bar-rectangles">
                            <g className="recharts-layer">
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="56"
                                  x="6.7875"
                                  y="18.999999999999996"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 6.7875,18.999999999999996 h 14 v 56 h -14 Z"
                                ></path>
                              </g>
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="70"
                                  x="24.6625"
                                  y="5"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 24.6625,5 h 14 v 70 h -14 Z"
                                ></path>
                              </g>
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="46.666666666666664"
                                  x="42.5375"
                                  y="28.333333333333336"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 42.5375,28.333333333333336 h 14 v 46.666666666666664 h -14 Z"
                                ></path>
                              </g>
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="64.86666666666666"
                                  x="60.41250000000001"
                                  y="10.133333333333335"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 60.41250000000001,10.133333333333335 h 14 v 64.86666666666666 h -14 Z"
                                ></path>
                              </g>
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="44.1"
                                  x="78.2875"
                                  y="30.9"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 78.2875,30.9 h 14 v 44.1 h -14 Z"
                                ></path>
                              </g>
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="55.766666666666666"
                                  x="96.1625"
                                  y="19.233333333333334"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 96.1625,19.233333333333334 h 14 v 55.766666666666666 h -14 Z"
                                ></path>
                              </g>
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="64.86666666666666"
                                  x="114.0375"
                                  y="10.133333333333335"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 114.0375,10.133333333333335 h 14 v 64.86666666666666 h -14 Z"
                                ></path>
                              </g>
                              <g
                                className="recharts-layer recharts-bar-rectangle"
                                role="img"
                              >
                                <path
                                  width="14"
                                  height="44.1"
                                  x="131.9125"
                                  y="30.9"
                                  radius="0"
                                  className="recharts-rectangle"
                                  d="M 131.9125,30.9 h 14 v 44.1 h -14 Z"
                                ></path>
                              </g>
                            </g>
                          </g>
                          <g className="recharts-layer"></g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    ),
    Contact: (
      <div>
        {/* <h2 className="font-semibold font-mono text-2xl text-white">Contact</h2> */}
        <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-white font-mono prose prose-headings:text-white prose-a:text-white">
        <div className="space-y-1.5 p-6 flex flex-row items-center"><div className="flex items-center space-x-4"><span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"><Image className="aspect-square h-full w-full" width={10} height={10} alt="Image" src={'https://ui.shadcn.com/avatars/01.png'} /></span><div><p className="text-sm font-medium leading-none">Sofia Davis</p><p className="text-sm text-muted-foreground">m@example.com</p></div></div><button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-auto rounded-full" data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg><span className="sr-only">New message</span></button></div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-[#27272a]">Hi, how can I help you today?</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto text-[#27272a] bg-[#fafafa] text-primary-foreground">Hey, Im having trouble with my account.</div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-[#27272a]">What seems to be the problem?</div><div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">I cant log in.</div></div>
            </div>
            <div className="flex items-center p-6 pt-0"><form className="flex w-full items-center space-x-2"><input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1" id="message" placeholder="Type your message..."  value="" /><button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10 bg-[#fafafa] text-[#27272a]" type="submit" ><svg xmlns="http://www.w3.org/2000/svg" width="24" color='#27272a' height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4"><line x1="22" x2="11" y1="2" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg><span className="sr-only">Send</span></button></form></div>
        </article>
      </div>
    ),
  };

  // Define the style for active and inactive tabs
  const tabStyle = {
    active:
      "border-white text-white whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm font-mono",
    inactive:
      "border-transparent text-gray-400  whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm font-mono",
  };

  // Function to change the active tab
  const changeTab = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };
  return (
    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
      <nav
        className="absolute right-0 w-full flex items-center justify-between md:justify-end px-4 h-16"
        aria-label="Navbar"
      >
        <button
          type="button"
          className="inline-flex md:hidden items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-0"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <button className="bg-black hover:bg-white border-black w-36 h-8 py-1 text-white hover:text-black border rounded-md text-sm transition-all">
          Log in with GitHub
        </button>
      </nav>
      <div className="min-h-screen pb-20">
        <div>
          <div
            className="h-48 w-full lg:h-64 
          bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
          ></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
              <Image
                alt="Alpha Olomi"
                src="/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F10551599%3Fv%3D4&amp;w=640&amp;q=75"
                width="300"
                height="300"
                decoding="async"
                data-nimg="1"
                className="undefined transition-all grayscale-0 blur-0 scale-100"
                loading="lazy"
              />
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="flex min-w-0 flex-1 items-center space-x-2">
                <h1 className="text-2xl font-semibold text-white truncate">
                  Alpha Olomi
                </h1>
                <svg
                  className="w-6 h-6 text-[#0070F3]"
                  viewBox="0 0 20 20"
                  fill="currentColor "
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a
                  href="https://github.com/alphaolomi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center px-4 py-2 border border-gray-800 hover:border-white shadow-sm text-sm font-medium rounded-md text-white font-mono bg-black focus:outline-none focus:ring-0 transition-all"
                >
                  <svg
                    className="mr-3 h-5 w-5 text-white"
                    fill="currentColor"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                  <span>View GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-800">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  className={
                    activeTab === "Profile"
                      ? tabStyle.active
                      : tabStyle.inactive
                  }
                  onClick={() => changeTab("Profile")}
                >
                  Profile
                </button>
                <button
                  className={
                    activeTab === "Performance"
                      ? tabStyle.active
                      : tabStyle.inactive
                  }
                  onClick={() => changeTab("Performance")}
                >
                  Performance
                </button>
                <button
                  className={
                    activeTab === "Contact"
                      ? tabStyle.active
                      : tabStyle.inactive
                  }
                  onClick={() => changeTab("Contact")}
                >
                  Contact
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          {tabs[activeTab]}
        </div>
      </div>
    </main>
  );
};
export default MainDashboard;
