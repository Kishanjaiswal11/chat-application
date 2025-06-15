import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatWindow from "@/components/ChatWindow";
import MessageInput from "@/components/MessageInput";
import { contacts, chatHistory } from "@/utils/dummyData";

export default function HomePage() {
  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState(chatHistory[selectedId]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setShowSidebar(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setShowSidebar(true);
  }, [isMobile]);

  const handleSelectChat = (id) => {
    setSelectedId(id);
    setMessages(chatHistory[id] || []);
    if (isMobile) setShowSidebar(false);
  };

  const handleSendMessage = (text) => {
    const contact = contacts.find((c) => c.id === selectedId);
    const newMessage = {
      id: messages.length + 1,
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: contact?.online ? "Delivered" : "Sent",
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    chatHistory[selectedId] = updatedMessages;

    if (contact?.online) {
      setIsTyping(true);

      setTimeout(() => {
        const botReply = {
          id: updatedMessages.length + 1,
          sender: "them",
          text: "Thanks! I will get back to you.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setIsTyping(false);
        const finalMessages = [...updatedMessages, botReply];
        setMessages(finalMessages);
        chatHistory[selectedId] = finalMessages;
      }, 1500);
    }
  };

  const selectedContact = contacts.find((c) => c.id === selectedId);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex overflow-hidden">
        {showSidebar && (
          <div className="w-full md:w-1/4 bg-white">
            <Sidebar
              selectedId={selectedId}
              onSelect={handleSelectChat}
              chatHistory={chatHistory}
              contacts={contacts}
            />
          </div>
        )}

        {(!isMobile || !showSidebar) && (
          <div className="flex flex-col flex-1 bg-white">
            <ChatHeader
              contact={selectedContact}
              onBack={() => setShowSidebar(true)}
            />

            <div
              className="flex flex-col justify-between"
              style={{ height: "calc(100vh - 3.5rem - 56px - 64px)" }}
            >
              <div className="flex-1 min-h overflow-y-auto">
                <ChatWindow messages={messages} isTyping={isTyping} />
              </div>
            </div>
            <MessageInput onSend={handleSendMessage} />
          </div>
        )}
      </div>
    </div>
  );
}
