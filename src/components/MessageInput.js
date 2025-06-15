import { useState } from "react";
import { FiSend } from "react-icons/fi";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-3 flex items-center gap-2 sticky bottom-0">
      <textarea
        rows={1}
        className="flex-1 resize-none p-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
      >
        <FiSend className="w-5 h-5" />
      </button>
    </div>
  );
}
