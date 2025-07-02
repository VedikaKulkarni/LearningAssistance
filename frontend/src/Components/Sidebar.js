const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { id: "chat", label: "💬 Chat" },
    { id: "notes", label: "📝 Notes" },
    { id: "quiz", label: "📋 Quiz" },
  ];

  return (
    <div className="w-64 h-full bg-black text-green-400 p-4 border-r border-green-500 shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-green-300 tracking-wide">
        ⚡ Assist.AI
      </h1>
      <ul className="space-y-2">
        {menu.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer p-2 rounded-md transition duration-200 ease-in-out
              ${
                activeTab === item.id
                  ? "bg-green-600 text-black font-bold shadow-sm"
                  : "hover:bg-green-800 hover:text-white"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="mt-10 text-xs text-green-700 opacity-60">
        Built with 💻 by Gen Z for Gen Z
      </div>
    </div>
  );
};

export default Sidebar;
