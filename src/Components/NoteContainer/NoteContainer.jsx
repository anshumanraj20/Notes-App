import React, { useState } from 'react';
import Note from '../Note/Note';
import Search from '../Search';
import './NoteContainer.css';

const NoteContainer = (props) => {
  const [searchText, setSearchText] = useState('');

  const reverseArray = (arr) => {
    const array = [];

    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }

    return array;
  };

  const notes = reverseArray(props.notes);

  const handleSearchNote = (searchText) => {
    setSearchText(searchText);
  };

  return (
    <div className="note-container">
      <h2>Notes</h2>
      <Search handleSearchNote={handleSearchNote} />
      <div className="note-container_notes custom-scroll">
        {notes?.length > 0 ? (
          notes
            .filter((item) =>
              item.text.toLowerCase().includes(searchText.toLowerCase()) || item.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((item) => (
              <Note
                key={item.id}
                note={item}
                deleteNote={props.deleteNote}
                updateText={props.updateText}
                selectedFont={props.selectedFont} // Pass the selected font
              />

            ))
        ) : (
          <h3>No Notes present</h3>
        )}
      </div>
    </div>
  );
};

export default NoteContainer;
