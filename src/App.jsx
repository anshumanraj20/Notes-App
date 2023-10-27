import React, { useEffect, useState } from "react";
import "./App.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Sidebar from "./Components/Sidebar/Sidebar";
import NoteContainer from "./Components/NoteContainer/NoteContainer";

const App = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes-app")) || []);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Arial');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addNote = (color) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now() + "" + Math.floor(Math.random() * 78),
        title: "",
        text: "",
        time: Date.now(),
        color,
      },
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const updateText = (text, id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text } : note
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="font-selector">
        <label>Select Font:</label>
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Calibri">Calibri</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Algerian">Algerian</option> {/* Add Algerian font */}
          {/* Add more font options here */}
        </select>
      </div>
      <Sidebar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
        selectedFont={selectedFont}
      />
      <DarkModeSwitch
        onClick={toggleDarkMode}
        style={{
          marginTop: "-1rem",
          width: "50px",
          height: "70px",
        }}
      />
    </div>
  );
};

export default App;
