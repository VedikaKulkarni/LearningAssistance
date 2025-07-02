import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error fetching response." },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-black text-green-400 p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-3xl whitespace-pre-wrap text-sm shadow-md ${
              msg.role === "user"
                ? "bg-green-900 text-green-300 ml-auto"
                : "bg-zinc-800 text-green-200"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-invert max-w-none text-green-200">
                 <ReactMarkdown>{msg.content}</ReactMarkdown>
             </div>

            ) : (
              msg.content
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-green-300 animate-pulse">
            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Generating response...</span>
          </div>
        )}
      </div>

      <div className="mt-auto flex">
        <input
          className="flex-1 p-3 bg-zinc-900 border border-green-600 text-green-200 rounded-l-md focus:outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          className={`px-6 bg-green-600 text-black font-semibold rounded-r-md hover:bg-green-500 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
