import { useEffect, useRef } from "react";
import { ChatMessage, ChatForm, Navbar, AiTexthead } from "./components";
import useChatStore from "./store/ChatStore";
import Loader from "./components/Loader";
import ErrorSection from "./components/ErrorSection";

function App() {
  const { chatHistory, isLoading } = useChatStore();
  const chatContainerRef = useRef(null);

  const aiCapabilities = [
    { name: "Translator", available: "ai" in self && "translator" in self.ai },
    { name: "Summarizer", available: "ai" in self && "summarizer" in self.ai },
    {
      name: "Language Detection",
      available: "ai" in self && "languageDetector" in self.ai,
    },
  ];
  const missingCapabilities = aiCapabilities.filter((cap) => !cap.available);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth", 
      });
    }
  }, [chatHistory, isLoading]);

  return (
    <div className="w-screen h-screen flex justify-center">
      <Navbar />
      {!missingCapabilities.length > 0 ? (
        <div className="relative w-[840px] h-full pt-14">
          <div
            ref={chatContainerRef}
            className="flex flex-col gap-5 py-4 px-8 pb-[280px] max-h-full overflow-y-auto"
          >

            {chatHistory.length === 0 && (
               <div className="flex gap-3">
               <AiTexthead />
               <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg px-3 py-4 text-sm rounded-lg max-w-xs w-full min-h-[60px] flex items-center justify-center">
                 <p>
                   Hey there 👋, my name is Ploe <br /> your AI Text-Processor
                   Chatbot. Need to detect a language, translate, or summarize
                   a text? I'm here to help!
                 </p>
               </div>
             </div>
            )}
            
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <AiTexthead />
                <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg px-3 py-4 text-sm rounded-lg max-w-xs w-full min-h-[60px] flex items-center justify-center">
                  <Loader className="h-8 w-8" />
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 w-full px-6 pt-4 pb-5">
            <ChatForm />
          </div>
        </div>
      ) : (
        <ErrorSection missingCapabilities={missingCapabilities} />
      )}
    </div>
  );
}

export default App;
