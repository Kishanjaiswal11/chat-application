import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWindow({ messages, isTyping }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 flex flex-col">
      <AnimatePresence initial={false}>
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id || index}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col ${
              msg.sender === "me" ? "items-end" : "items-start"
            } px-2`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl text-sm ${
                msg.sender === "me"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {msg.time} {msg.status ? `• ${msg.status}` : ""}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-300 px-4 py-2 rounded-xl text-sm text-gray-800 flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-75" />
            <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-150" />
          </div>
        </div>
      )}

      <div ref={endOfMessagesRef} />
    </div>
  );
}
