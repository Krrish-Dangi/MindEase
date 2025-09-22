import { useTheme } from "../contexts/theme-context";
import { useChatManager } from './nexus-chat/hooks/useChatManager';
import { Sidebar } from './nexus-chat/components/Sidebar';
import { ChatWindow } from './nexus-chat/components/ChatWindow';

export function PeerForum() {
  const { theme } = useTheme();
  const {
    chats,
    users,
    channels,
    currentUser,
    activeChat,
    setActiveChatId,
    sendMessage,
    loadingResponse
  } = useChatManager();

  return (
    <div className="flex w-full min-h-0" style={{background: 'transparent', height: '70vh', minHeight: '600px', maxHeight: '900px'}}>
      {/* Sidebar for channels and users */}
      <Sidebar
        channels={channels}
        users={users.filter(u => u.id !== currentUser.id)}
        activeChatId={activeChat?.id}
        onSelectChat={setActiveChatId}
        currentUser={currentUser}
        chats={chats}
      />
      {/* Main chat area glass UI, color scheme matches ai-support */}
      <main className="flex-1 flex flex-col items-center justify-start px-0 md:px-8 py-6 min-h-0" style={{height: '100%', maxHeight: '700px'}}>
        <div
          className="flex flex-col w-full max-w-3xl h-[600px] border rounded-2xl shadow-lg p-6 backdrop-blur-lg"
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            marginTop: 0,
            minHeight: '400px',
            background: theme === 'light' ? 'rgba(250, 129, 25, 0.18)' : 'rgba(17, 24, 39, 0.3)'
          }}
        >
          {/* Main chat window with scrollable area */}
          <div className="flex-1 overflow-y-auto mb-4" style={{maxHeight: '400px', minHeight: '200px'}}>
            <ChatWindow
              chat={activeChat}
              messages={chats[activeChat?.id]?.messages || []}
              currentUser={currentUser}
              onSendMessage={content => sendMessage(activeChat?.id, content)}
              chatName={activeChat?.name || ''}
              isLoading={loadingResponse}
            />
          </div>
        </div>
      </main>
    </div>
  );
}