
import React from 'react';
import { HashtagIcon } from './icons/HashtagIcon';
import { UserAvatar } from './UserAvatar';

const getDmChatId = (userId1, userId2) => {
    return ['dm', ...[userId1, userId2].sort()].join('-');
}

export const Sidebar = ({ channels, users, activeChatId, onSelectChat, currentUser, chats }) => {
  return React.createElement('aside', { className: "w-64 bg-gray-900 flex flex-col p-3 space-y-4" },
    React.createElement('div', { className: "flex items-center space-x-2 pb-2 border-b border-gray-700" },
      React.createElement(UserAvatar, { user: currentUser }),
      React.createElement('span', { className: "font-semibold text-white" }, currentUser.name)
    ),
    React.createElement('div', null,
      React.createElement('h2', { className: "text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2" }, "Channels"),
      React.createElement('ul', { className: "space-y-1" },
        ...channels.map(channel => {
          const isUnread = chats[channel.id]?.unread;
          return React.createElement('li', { key: channel.id },
            React.createElement('button', {
              onClick: () => onSelectChat(channel.id),
              className: `w-full text-left flex items-center p-2 rounded-md transition-colors ${activeChatId === channel.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`
            },
              React.createElement(HashtagIcon, { className: "h-5 w-5 mr-2 text-gray-400" }),
              React.createElement('span', { className: "flex-1 font-medium" }, channel.name),
              isUnread && React.createElement('div', { className: "w-2 h-2 bg-red-500 rounded-full" })
            )
          );
        })
      )
    ),
    React.createElement('div', null,
      React.createElement('h2', { className: "text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-2" }, "Direct Messages"),
      React.createElement('ul', { className: "space-y-1" },
        ...users.map(user => {
          const dmChatId = getDmChatId(currentUser.id, user.id);
          const isUnread = chats[dmChatId]?.unread;
          return React.createElement('li', { key: user.id },
            React.createElement('button', {
              onClick: () => onSelectChat(user.id),
              className: `w-full text-left flex items-center p-2 rounded-md transition-colors ${activeChatId === dmChatId ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`
            },
              React.createElement(UserAvatar, { user: user, className: "mr-2" }),
              React.createElement('span', { className: "flex-1 font-medium" }, user.name),
              isUnread && React.createElement('div', { className: "w-2 h-2 bg-red-500 rounded-full" })
            )
          );
        })
      )
    )
  );
};
