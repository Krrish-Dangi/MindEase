
import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import { MessageInput } from './MessageInput';
import { HashtagIcon } from './icons/HashtagIcon';
import { AtSymbolIcon } from './icons/AtSymbolIcon';

export const ChatWindow = ({ chat, messages, currentUser, onSendMessage, chatName, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  const Icon = chat.type === 'channel' ? HashtagIcon : AtSymbolIcon;
  const name = chat.type === 'channel' ? chat.name : chatName.substring(2);

  return React.createElement('div', { className: "flex flex-1 flex-col h-full" },
    React.createElement('header', { className: "flex-shrink-0 flex items-center px-6 h-14 border-b border-gray-900 shadow-md" },
      React.createElement(Icon, { className: "h-6 w-6 text-gray-400 mr-2" }),
      React.createElement('h1', { className: "text-xl font-semibold text-white" }, name)
    ),
    React.createElement('div', { className: "flex-1 overflow-y-auto p-6" },
      React.createElement('div', { className: "space-y-4" },
        ...messages.map((msg) => 
          React.createElement(Message, { key: msg.id, message: msg, isCurrentUser: msg.author.id === currentUser.id })
        ),
        isLoading && React.createElement('div', { className: "flex items-center space-x-2 animate-pulse" },
          React.createElement('div', { className: "h-10 w-10 bg-gray-600 rounded-full" }),
          React.createElement('div', { className: "flex-1 space-y-2" },
            React.createElement('div', { className: "h-4 w-1/4 bg-gray-600 rounded" }),
            React.createElement('div', { className: "h-4 w-3/4 bg-gray-600 rounded" })
          )
        ),
        React.createElement('div', { ref: messagesEndRef })
      )
    ),
    React.createElement('div', { className: "p-6 bg-gray-700 border-t border-gray-900" },
      React.createElement(MessageInput, { onSendMessage: onSendMessage, chatName: chatName })
    )
  );
};
