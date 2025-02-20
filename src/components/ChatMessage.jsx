import { AiTexthead } from ".";
import useChatStore from "@/store/ChatStore";
import { useEffect, useState } from "react";

const ChatMessage = ({ chat }) => {
  const { translateText, summarizeText, setTargetLanguage } = useChatStore();
  const wordCount = chat.text.split(/\s+/).length;
  const isEnglish = chat.detectedLanguageCode === "en";

  const languageOptions = [
    { code: "en", name: "English" },    
    { code: "pt", name: "Portuguese" },
    { code: "es", name: "Spanish" },    
    { code: "ru", name: "Russian" },
    { code: "tr", name: "Turkish" },
    { code: "fr", name: "French" }
  ];

  const filteredOptions = languageOptions.filter(
    (option) => option.code !== chat.detectedLanguageCode
  );
  
  const [selectedLanguage, setSelectedLanguage] = useState(filteredOptions[0]?.code || "");
  
  useEffect(() => {
    setTargetLanguage(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <div className={`flex gap-3 ${chat.role === "model" ? "" : "flex-col items-end"}`}>
      {chat.role === "model" && <AiTexthead />}
      <div
        className={`relative ${
          chat.role === "model"
            ? "bg-white/10 backdrop-blur-md rounded-tl-none border border-white/10 text-white"
            : "bg-gradient-to-tr from-[#29dade] via-[#81f6ab] to-[#baf58e] rounded-tr-none text-black"
        } shadow-lg px-3 py-4 text-sm rounded-lg max-w-xs`}
      >        
        <p>{chat.text}</p>

        {chat.role === "user" && chat.detectedLanguage && (
          <p className="mt-2 text-black font-bold text-sm">
            Detected Language: <strong>{chat.detectedLanguage}</strong> (
            {chat.confidence}% sure)
          </p>
        )}

        {chat.role === "user" && (
          <div className="flex gap-1 mt-2 justify-between items-center">
            <select
              className="p-1 rounded-lg text-xs bg-white text-black shadow-sm"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {filteredOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
            
            <button
              className="text-xs text-white bg-black rounded-lg shadow-md p-2"
              onClick={() => translateText(chat, selectedLanguage)} 
            >
              Translate
            </button>

            {wordCount > 150 && isEnglish && (
              <button
                className="text-xs text-white bg-gray-700 rounded-lg shadow-md p-2"
                onClick={() => summarizeText(chat)}
              >
                Summarize
              </button>
            )}
          </div>          
        )}        
      </div>
      {chat.role === "user" && (
        <p className="-mt-2 text-[14px] text-right text-gray-400">
          {`${wordCount} ${wordCount === 1 ? "word" : "words"}`}
        </p>
      )}
    </div>
  );
};

export default ChatMessage;
