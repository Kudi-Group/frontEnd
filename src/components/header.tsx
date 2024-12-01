import { Bell } from "lucide-react";

export function Header() {
  return (
    <div className="flex justify-between items-center bg-gray-50 px-8 py-2 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold">Hello Mira</h1>
        <span role="img" aria-label="wave">
          👋
        </span>
      </div>
      <div>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Bell className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};
