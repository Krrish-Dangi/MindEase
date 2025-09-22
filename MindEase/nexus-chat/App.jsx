
import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { useChatManager } from './hooks/useChatManager';

const App = () => {
  const {
    chats,
    users,
    channels,
    currentUser,
    activeChat,
    setActiveChatId,
    sendMessage,
    loadingResponse,
  } = useChatManager();

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
  };
  
  const getChatName = (chat) => {
    if (!chat) return "Loading...";
    if (chat.type === 'channel') {
      return `# ${chat.name}`;
    } else {
      const otherUser = chat.participants.find(p => p.id !== currentUser.id);
      return `@ ${otherUser?.name || 'Unknown User'}`;
    }
  };

  return React.createElement('div', { className: "flex h-screen w-full bg-gray-800 text-gray-100 font-sans" },
    React.createElement(Sidebar, { 
      channels: channels,
      users: users.filter(u => u.id !== currentUser.id),
      activeChatId: activeChat?.id || '',
      onSelectChat: handleSelectChat,
      currentUser: currentUser,
      chats: chats
    }),
    React.createElement('main', { className: "flex flex-1 flex-col bg-gray-700" },
      activeChat ? 
        React.createElement(ChatWindow, {
          chat: activeChat,
          messages: chats[activeChat.id]?.messages || [],
          currentUser: currentUser,
          onSendMessage: (content) => sendMessage(activeChat.id, content),
          chatName: getChatName(activeChat),
          isLoading: loadingResponse
        }) : 
        React.createElement('div', { className: "flex flex-1 items-center justify-center" },
          React.createElement('div', { className: "text-center" },
            React.createElement('h2', { className: "text-2xl font-semibold text-gray-400" }, "Welcome to Nexus Chat"),
            React.createElement('p', { className: "text-gray-500 mt-2" }, "Select a channel or a user to start chatting.")
          )
        )
    )
  );
};

export default App;
