
import React, { useState } from 'react';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

export const MessageInput = ({ onSendMessage, chatName }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content.trim());
      setContent('');
    }
  };

  return React.createElement('form', { onSubmit: handleSubmit, className: "flex items-center space-x-4" },
    React.createElement('input', {
      type: "text",
      value: content,
      onChange: (e) => setContent(e.target.value),
      placeholder: `Message ${chatName}`,
      className: "flex-1 bg-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    }),
    React.createElement('button', {
      type: "submit",
      className: "bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors disabled:bg-gray-500",
      disabled: !content.trim()
    },
      React.createElement(PaperAirplaneIcon, { className: "h-6 w-6" })
    )
  );
};
