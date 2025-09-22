import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  text: string;
  sender: "user" | "bot";
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender }) => {
  return (
    <div
      className={`p-3 my-2 rounded-lg max-w-lg ${
        sender === "user"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-gray-900 self-start"
      }`}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default ChatMessage;