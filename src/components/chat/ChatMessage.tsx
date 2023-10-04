// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import { IconOpenAI, IconUser, cn } from '@/components/ui/icons'
import { useEffect, useRef } from 'react';

export interface ChatMessageProps {
  messages: any
}

export function ChatMessage({ messages, ...props }: ChatMessageProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div ref={messagesContainerRef} >
    {messages.map((message:any)=>(

      <div
      key={Math.random()}
      
      className={cn('group relative  flex items-start md:-ml-12 mt-4 pb-5 border-b-[0.1px] border-slate-200')}
      {...props}
    >
     <div
        
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div><div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">



          <p className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">

            {message.content}
          </p>
        </div></div>
   
    ))

}

   </div >
   
   )
}