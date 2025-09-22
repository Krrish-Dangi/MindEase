import { useState, useEffect } from "react";
import { useTheme } from "../contexts/theme-context";
import ReactMarkdown from "react-markdown";

interface MusicRecommendation {
  title: string;
  url: string;
}

interface Message {
  role: "user" | "bot";
  text: string;
  music_recommendations?: MusicRecommendation[];
}

export function AISupport() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "student1", message: input }),
      });

      const data = await res.json();

      if (res.ok) {
        const botMessage: Message = {
          role: "bot",
          text: data.bot,
          music_recommendations: data.music_recommendations,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = { role: "bot", text: `⚠️ Error: ${data.detail}` };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = { role: "bot", text: "⚠️ Unable to reach AI server." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch past chat history from backend (history.py)
  type ChatHistoryItem = { name?: string; message?: string } | string;
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<number | null>(null);

  // Fetch history on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/history?user_id=student1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.history)) {
          setChatHistory(data.history);
        } else {
          setChatHistory(["Welcome!", "How can I help you today?"]);
        }
      })
      .catch(() => setChatHistory(["Welcome!", "How can I help you today?"]));
  }, []);

  return (
    <div className="flex w-full min-h-0" style={{background: 'transparent', height: '100%', maxHeight: '700px'}}>
      {/* Dashboard sidebar is outside this component */}
      {/* Main content area: chat container and past chats sidebar */}
      <div className="flex flex-1 min-h-0" style={{background: 'transparent', height: '100%', maxHeight: '700px'}}>
        {/* Chat container: full width between sidebar and past chats */}
        <main className="flex-1 flex flex-col items-center justify-start px-0 md:px-8 py-6 min-h-0" style={{height: '100%', maxHeight: '700px'}}>
          <div className="flex flex-col w-full max-w-3xl h-[600px] border rounded-2xl shadow-lg p-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', marginTop: 0, minHeight: '400px'}}>
            {/* Chat messages scroll box */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-2" style={{maxHeight: '400px', minHeight: '200px'}}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-lg text-base font-medium ${
                    msg.role === "user"
                      ? theme === "light"
                        ? "ml-auto text-white border border-orange-700 shadow-md"
                        : "ml-auto bg-blue-700/80 text-white border border-blue-900 shadow-md"
                      : theme === "light"
                        ? "mr-auto bg-white/80 text-gray-900 border border-gray-300 shadow"
                        : "mr-auto bg-gray-900/80 text-white border border-gray-700 shadow"
                  }`}
                  style={msg.role === "user" ? {background: theme === "light" ? "#F66F14" : "rgba(29,78,216,0.8)"} : {}}
                >
                  {/* Render bot/user text with Markdown */}
                  <ReactMarkdown>{msg.text}</ReactMarkdown>

                  {/* Render music recommendation cards */}
                  {msg.music_recommendations && (
                    <div className="mt-2 space-y-1">
                      {msg.music_recommendations.map((music, i) => (
                        <a
                          key={i}
                          href={music.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          {music.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && <div className="text-gray-400 text-sm">Bot is typing...</div>}
            </div>

            <div className="flex items-center gap-2 mt-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className={`flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-base ${theme === "light" ? "text-white border-orange-700" : "text-white border-gray-700"}`}
                style={theme === "light" ? {background: "#F66F14"} : {background: "rgba(29,78,216,0.8)"}}
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className={`px-5 py-3 rounded-lg font-semibold transition-colors text-base ${
                  loading
                    ? "bg-gray-400 text-gray-100 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
                disabled={loading}
              >
                Send
              </button>
            </div>
          </div>
        </main>

        {/* Past chats sidebar (right side) */}
        <aside className="hidden md:flex flex-col w-64 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-l border-gray-200 dark:border-gray-800 p-4 gap-2 min-h-0" style={{height: '100%', maxHeight: '700px', position: 'relative'}}>
          <h2
            className="text-lg font-bold mb-4"
            style={{
              textAlign: "center",
              color: theme === "dark" ? "#FFFFFF" : "#374151"
            }}
          >
            Past Chats
          </h2>
          <div className="flex-1 overflow-y-auto space-y-2" style={{maxHeight: '600px'}}>
            {chatHistory.length > 0 ? (
              chatHistory.map((chat, idx) => (
                <div
                  key={idx}
                  className={`w-full px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-800/60 text-left mb-2 shadow transition-colors`}
                  style={{border: selectedHistory === idx ? '2px solid #1E398C' : '1px solid rgba(0,0,0,0.05)'}}
                  onClick={() => setSelectedHistory(idx)}
                >
                  {/* If chat is an object with name and message, display both. Otherwise fallback to string */}
                  {typeof chat === 'object' && chat !== null ? (
                    <>
                      <div className="font-semibold text-blue-900 dark:text-blue-200">{(chat as any).name || 'Unknown User'}</div>
                      <div className="text-gray-900 dark:text-gray-200">{(chat as any).message || ''}</div>
                    </>
                  ) : (
                    <div
                      className={theme === "light" ? "text-white" : "text-white"}
                      style={
                        theme === "light"
                          ? {background: "#F66F14", borderRadius: "0.5rem", padding: "0.5rem"}
                          : (chat === "Welcome!" || chat === "How can I help you today?")
                            ? {background: "#1B44B9", borderRadius: "0.5rem", padding: "0.5rem"}
                            : {}
                      }
                    >
                      {chat}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No past chats found.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}