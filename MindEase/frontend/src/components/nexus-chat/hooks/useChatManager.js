
import { useState, useEffect, useCallback } from 'react';
import { generateBotResponse } from '../services/geminiService';

const MOCK_USERS = [
  { id: 'user-1', name: 'You', avatarUrl: 'https://picsum.photos/seed/you/40/40' },
  { id: 'user-2', name: 'Alex', avatarUrl: 'https://picsum.photos/seed/alex/40/40' },
  { id: 'user-3', name: 'Sam', avatarUrl: 'https://picsum.photos/seed/sam/40/40' },
  { id: 'user-4', name: 'Jamie', avatarUrl: 'https://picsum.photos/seed/jamie/40/40' },
];

const MOCK_CHANNELS = [
  { id: 'channel-1', name: 'general' },
  { id: 'channel-2', name: 'react-devs' },
  { id: 'channel-3', name: 'random' },
];

const INITIAL_CHATS = {
  'channel-1': {
    messages: [
      { id: 'msg-1', author: MOCK_USERS[1], content: 'Hey everyone, welcome to the server!', timestamp: new Date(Date.now() - 60000 * 5).toISOString() },
      { id: 'msg-2', author: MOCK_USERS[2], content: 'Glad to be here! This chat app looks amazing.', timestamp: new Date(Date.now() - 60000 * 4).toISOString() },
    ],
    unread: false,
  },
  'channel-2': { messages: [], unread: false },
  'channel-3': { messages: [], unread: false },
};

const getDmChatId = (userId1, userId2) => {
    return ['dm', ...[userId1, userId2].sort()].join('-');
}

export const useChatManager = () => {
  const [currentUser] = useState(MOCK_USERS[0]);
  const [users] = useState(MOCK_USERS);
  const [channels] = useState(MOCK_CHANNELS);
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState('channel-1');
  const [loadingResponse, setLoadingResponse] = useState(false);

  const activeChat = (() => {
    if (!activeChatId) return null;
    if (activeChatId.startsWith('channel-')) {
      const channel = channels.find(c => c.id === activeChatId);
      return channel ? { id: channel.id, type: 'channel', name: channel.name } : null;
    }
    if (activeChatId.startsWith('dm-')) {
        const participantIds = activeChatId.split('-').slice(1);
        const participants = users.filter(u => participantIds.includes(u.id));
        return { id: activeChatId, type: 'dm', participants };
    }
    return null;
  })();

  useEffect(() => {
    if (activeChatId && chats[activeChatId]?.unread) {
      setChats(prev => ({
        ...prev,
        [activeChatId]: { ...prev[activeChatId], unread: false }
      }));
    }
  }, [activeChatId, chats]);

  const addMessageToChat = useCallback((chatId, message) => {
    setChats(prev => {
        const newChatHistory = {
            messages: [...(prev[chatId]?.messages || []), message],
            unread: chatId !== activeChatId,
        };
        return {
            ...prev,
            [chatId]: newChatHistory,
        };
    });
  }, [activeChatId]);

  const sendMessage = async (chatId, content) => {
    const userMessage = {
      id: `msg-${Date.now()}`,
      author: currentUser,
      content,
      timestamp: new Date().toISOString(),
    };
    addMessageToChat(chatId, userMessage);
    setLoadingResponse(true);

    try {
        const chatHistory = chats[chatId]?.messages || [];
        const otherUsers = users.filter(u => u.id !== currentUser.id);
        const botMessageContent = await generateBotResponse(chatHistory, content, otherUsers, activeChat);
        
        if (botMessageContent) {
            const botUser = users.find(u => u.name === botMessageContent.author) || MOCK_USERS[1];
            const botMessage = {
                id: `msg-${Date.now() + 1}`,
                author: botUser,
                content: botMessageContent.text,
                timestamp: new Date().toISOString(),
            };
            addMessageToChat(chatId, botMessage);
        }
    } catch (error) {
        console.error("Failed to get bot response:", error);
        const errorMessage = {
             id: `msg-${Date.now() + 1}`,
             author: { id: 'system', name: 'System', avatarUrl: '' },
             content: 'Sorry, I was unable to generate a response.',
             timestamp: new Date().toISOString(),
        };
        addMessageToChat(chatId, errorMessage);
    } finally {
        setLoadingResponse(false);
    }
  };
  
  const customSetActiveChatId = (chatId) => {
      if(chatId.startsWith('user-')) {
          const dmChatId = getDmChatId(currentUser.id, chatId);
          setActiveChatId(dmChatId);
      } else {
          setActiveChatId(chatId);
      }
  };

  return { 
    chats, 
    users, 
    channels, 
    currentUser, 
    activeChat, 
    setActiveChatId: customSetActiveChatId, 
    sendMessage,
    loadingResponse
  };
};