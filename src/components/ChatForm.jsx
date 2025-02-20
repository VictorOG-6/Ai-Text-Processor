import { useEffect, useRef } from "react";
import useChatStore from "@/store/ChatStore";
import { IoIosSend } from "react-icons/io";

const ChatForm = () => {
  const { inputText, setInputText, handleUserMessage, isLoading } =
    useChatStore();
  const textareaRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUserMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserMessage();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.min(
        Math.max(textareaRef.current.scrollHeight, 80),
        200
      );
      textareaRef.current.style.height = `${newHeight}px`;

      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > 200 ? "auto" : "hidden";
    }
  }, [inputText]);

  return (
    <form className="flex gap-2" onSubmit={handleFormSubmit}>
      <textarea
        ref={textareaRef}
        placeholder="Message Ploe..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        required
        className="border-none outline-none ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 focus:border-none bg-white/10 backdrop-blur-md shadow-lg px-4 py-2 min-h-[80px] max-h-[200px] w-full text-base rounded-3xl overflow-hidden resize-none"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex justify-center items-center rounded-xl bg-gradient-to-tr from-[#29dade] via-[#81f6ab] to-[#baf58e] h-[40px] w-[50px] border-none cursor-pointer text-lg text-black mr-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IoIosSend size={20} />
      </button>
    </form>
  );
};

export default ChatForm;
