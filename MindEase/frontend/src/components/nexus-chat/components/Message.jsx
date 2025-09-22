
import React from 'react';
import { UserAvatar } from './UserAvatar';

export const Message = ({ message, isCurrentUser }) => {
  const { author, content, timestamp } = message;

  // Format time as HH:MM AM/PM
  const formattedTimestamp = new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const messageClasses = isCurrentUser 
    ? "flex items-start space-x-3 justify-end" 
    : "flex items-start space-x-3";
  
  const contentClasses = isCurrentUser
    ? "bg-blue-600 text-white"
    : "bg-gray-900 text-gray-200";

  return React.createElement('div', { className: messageClasses },
    !isCurrentUser && React.createElement(UserAvatar, { user: author }),
    React.createElement('div', null,
      !isCurrentUser && React.createElement('div', { className: "flex items-baseline space-x-2 mb-1" },
        React.createElement('span', { className: "font-semibold text-sm text-white" }, author.name),
        React.createElement('span', { className: "text-xs text-gray-400" }, formattedTimestamp)
      ),
      React.createElement('div', { className: `p-3 rounded-lg max-w-lg ${contentClasses} ${isCurrentUser ? 'rounded-br-none' : 'rounded-tl-none'}` },
        React.createElement('p', { className: "text-sm" }, content)
      ),
      isCurrentUser && React.createElement('div', { className: "text-right text-xs text-gray-400 mt-1" },
        formattedTimestamp
      )
    ),
    isCurrentUser && React.createElement(UserAvatar, { user: author })
  );
};
