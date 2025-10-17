'use client';
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageAvatar, MessageContent } from '@/components/ai-elements/message';
import { Response } from "@/components/ai-elements/response";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { useChat } from "@ai-sdk/react";
import { isToolUIPart } from "ai";

export default function Home() {

  const { messages, sendMessage, status } = useChat();
  console.log(messages, status)

  return (
    <div className="font-sans min-h-[80vh] flex flex-col items-center p-6">
      <main className="w-full max-w-2xl flex flex-col gap-4 flex-1">
        <h1 className="text-xl font-semibold"> Chat </h1>
        <Conversation className="rounded-lg border bg-white dark:bg-black/20">
          {messages.length === 0 ? (
            <ConversationEmptyState description="Hello, How can I help you today?"/>
          ): null}
          <ConversationContent>
            {messages.map((m)=>(
              <Message key={m.id} from={m.role}>
                <MessageContent>
                  <Response>
                    {m.parts
                      ?.filter((p) => p.type === "text")
                      .map((p) => (p.type === "text"))
                      .join("")}
                  </Response>
                  {m.parts?.map((p, i) => {
                    if (isToolUIPart(p)) {
                      return (
                        <Tool key={`${m.id}-tool-${i}`}>
                          <ToolHeader type={p.type} state={p.state}/>
                          <ToolContent>
                            <ToolInput input={p.input}/>
                            <ToolOutput 
                              output={(p as any).output}
                              errorText={(p as any).errorText}
                            />
                          </ToolContent>
                        </Tool>
                      );
                    }
                  return null;
                  })}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
          <ConversationScrollButton/>
        </Conversation>
      </main>
    </div>
  );
}
