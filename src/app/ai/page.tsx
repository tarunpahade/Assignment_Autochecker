"use client";
import { AiForm } from "@/components/AiForm";
import { ChatMessage } from "@/components/chat/ChatMessage";
import Intro from "@/components/chat/Intro";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

const Page = () => {
    const [showIntro, setShowIntro] = useState(true)
    const [aiResponsedSuccessfully, setaiResponsedSuccessfully] = useState(false)
    const [userPrompt, setUserPrompt] = useState('')
    const [conversation, setConversation]: any[] = useState([])
    const [disabled, setDisabled] = useState(false)
    const promptRef = useRef<HTMLInputElement>(null);
    const [subjects, setSubjects] = useState(['Book Keeping and Accountancy', 'Basic Web Technologies', 'Operating Systems', 'Communications'])
    const onClick = (subject: any) => {
        console.log(subject.currentTarget.id);
        setUserPrompt('I want To learn more about ' + subject.currentTarget.id)
        
    }
    const messageContainerRef: any = useRef(null); // Ref for the message container

    useEffect(() => {
        // Scroll to the bottom whenever the conversation updates
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [conversation]);
    const aiResponse = async () => {
        try {

            const aiResponse = await axios.post('api/ai', { userPrompt })
            const response = aiResponse.data
            console.log(response);

            const aiConversation = {
                content: response,
                role: 'ai'
            }
            setConversation((prevConversation: any) => [...prevConversation, aiConversation]);

            // setaiResponsedSuccessfully(true)

        } catch (error: any) {
            console.log(error, ' this is the error');

        } finally {
            // Re-enable the input field after AI response is received
            setDisabled(false);
        }

    }


    const onSubmit = () => {

        setShowIntro(false)

        console.log(userPrompt);
        const newConversation = {
            content: userPrompt,
            role: 'user'
        }
        setDisabled(true)
        setConversation((prevConversation: any) => [...prevConversation, newConversation]);
        setUserPrompt('')
        aiResponse()

    }
    return (
        <div>
            <main className="flex flex-1 flex-col bg-muted/50">
                <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
                    <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
                        <div className="pb-[200px] pt-4 md:pt-10">
                            <div className="mx-auto max-w-2xl px-4" ref={messageContainerRef}>
                                {showIntro ? <Intro subjects={subjects} onClick={onClick} /> : null}
                                <ChatMessage messages={conversation} />

                            </div>
                        </div>
                        <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out from-background/10  to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium shadow ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2 opacity-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 256"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path d="m205.66 149.66-72 72a8 8 0 0 1-11.32 0l-72-72a8 8 0 0 1 11.32-11.32L120 196.69V40a8 8 0 0 1 16 0v156.69l58.34-58.35a8 8 0 0 1 11.32 11.32Z"></path>
                                </svg>
                                <span className="sr-only">Scroll to bottom</span>
                            </button>
                            <AiForm disabled={disabled} ref={promptRef} setDisabled={setDisabled} aiResponsedSuccessfully={aiResponsedSuccessfully} onSubmit={onSubmit} inputValue={userPrompt} setUserPrompt={setUserPrompt} />

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Page