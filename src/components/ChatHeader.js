import { HiArrowLeft } from "react-icons/hi";
export default function ChatHeader({ contact, onBack }) {
  if (!contact) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white sticky top-0 z-10 pt-16">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="md:hidden mr-2 text-blue-600 font-bold"
        >
          <HiArrowLeft />
        </button>

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
          {contact.initials}
        </div>
        <div>
          <div className="font-medium">{contact.name}</div>
          {contact.online && (
            <div className="text-green-500 text-sm">Online</div>
          )}
        </div>
      </div>
    </div>
  );
}
