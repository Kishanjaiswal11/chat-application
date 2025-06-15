export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md h-14 z-20 flex items-center justify-between px-4 md:px-6">
      <div className="text-xl font-bold text-blue-600">Logo</div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full bg-blue-200 text-blue-800 font-bold text-sm flex items-center justify-center">
          ME
        </button>
      </div>
    </nav>
  );
}
