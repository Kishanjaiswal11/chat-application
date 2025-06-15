export default function Sidebar({
  selectedId,
  onSelect,
  chatHistory,
  contacts,
}) {
  return (
    <div className="w-full border-r h-full bg-white pt-14">
      {" "}
      <div className="p-4 font-bold text-xl">Chats</div>
      <div className="overflow-y-auto h-[calc(100vh-3.5rem-4rem)]">
        {" "}
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelect(contact.id)}
            className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              selectedId === contact.id ? "bg-gray-200" : ""
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {contact.initials}
            </div>
            <div className="flex-1">
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-gray-500 truncate">
                {(chatHistory[contact.id]?.at(-1)?.sender === "me"
                  ? "You: "
                  : "") +
                  (chatHistory[contact.id]?.at(-1)?.text || "No messages yet")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
