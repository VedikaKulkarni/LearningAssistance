import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/notes`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  const deleteNote = async (noteId) => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/chat/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.ok) {
        setNotes((prev) => prev.filter((note) => note._id !== noteId));
        setSelectedNote(null);
      } else {
        alert("Failed to delete the note.");
      }
    } catch (err) {
      alert("Error deleting note.");
    }
  };

  if (selectedNote) {
    return (
      <div className="min-h-screen bg-black text-green-300 p-6 flex flex-col items-center">
        <div className="bg-zinc-900 border border-green-600 rounded-xl p-6 shadow-lg max-w-2xl w-full">
          <h2 className="text-xl font-bold text-green-400 mb-2">💬 {selectedNote.prompt}</h2>
          <p className="text-xs text-green-500 mb-4">
            🗓️ {new Date(selectedNote.createdAt).toLocaleString()}
          </p>
         

<div className="bg-gray-900 text-green-200 rounded-lg p-4 overflow-y-auto max-h-[60vh]">
  <ReactMarkdown>
    {selectedNote.summary}
  </ReactMarkdown>
</div>


          <div className="flex justify-between">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={() => deleteNote(selectedNote._id)}
            >
              🗑️ Delete
            </button>
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
              onClick={() => setSelectedNote(null)}
            >
              ↩️ Back to Notes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-300 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400 drop-shadow">
        🧾 Your Smart Notes
      </h1>
      {notes.length === 0 ? (
        <p className="text-center text-green-500">No notes available yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedNote(note)}
              className="bg-zinc-900 border border-green-600 rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition duration-200 cursor-pointer"
            >
              <h2 className="text-lg font-semibold mb-2 text-green-400">💬 {note.prompt}</h2>
              <p className="text-xs text-green-500 mb-2">
                🗓️ {new Date(note.createdAt).toLocaleString()}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {note.summary?.split('\n').slice(0, 3).map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
                {note.summary?.split('\n').length > 3 && (
                  <li className="italic text-green-500">...click to view more</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
