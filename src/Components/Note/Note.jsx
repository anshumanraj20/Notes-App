import React, { useState, useCallback, useEffect } from 'react';
import deleteIcon from "../../assets/delete.png";
import "./Note.css";
import shareIcon from "../../assets/share.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

const timer = 300;
const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const Note = React.memo((props) => {
  const [voiceInput, setVoiceInput] = useState(props.note.text || ''); // Initialize with the note's text
  const [titleInput, setTitleInput] = useState(props.note.title || ''); // Initialize with the note's title
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Update the voiceInput state when the note's text changes
    setVoiceInput(props.note.text || '');
    // Update the titleInput state when the note's title changes
    setTitleInput(props.note.title || '');
  }, [props.note.text, props.note.title]);

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const hrs = date.getHours();
    const amPm = hrs >= 12 ? "PM" : "AM";
    const formattedHrs = hrs ? (hrs > 12 ? 24 - hrs : hrs) : "12";
    const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${formattedHrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateTitle = useCallback((value, id) => {
    setTitleInput(value); // Update the local state
    props.updateTitle(value, id);
  }, [props.updateTitle]);

  const updateText = useCallback((text, id) => {
    debounce(() => props.updateText(text, id));
  }, [props.updateText]);

  const shareNote = useCallback(() => {
    const shareContent = props.note.text;
    const shareUrl = `whatsapp://send?text=${shareContent}`;
    window.open(shareUrl, '_blank');
  }, [props.note.text]);

  const startVoiceRecognition = () => {
    setIsListening(true);

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setVoiceInput(voiceText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <input
        type="text"
        className="note_title"
        placeholder="Title"
        value={titleInput}
        onChange={(event) => updateTitle(event.target.value, props.note.id)}
      />
      <textarea
        className="note_text"
        value={voiceInput}
        style={{ fontFamily: props.selectedFont }} // Apply selected font
        onChange={(event) => setVoiceInput(event.target.value)}
      />

      <div className="note_footer">
        <p>{formatDate(props.note.time)}</p>
        <img
          src={shareIcon}
          alt="SHARE"
          onClick={shareNote}
        />
        <img
          src={deleteIcon}
          alt="DELETE"
          onClick={() => props.deleteNote(props.note.id)}
        />
        <button className="voice-button" onClick={startVoiceRecognition} disabled={isListening}>
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      </div>
    </div>
  );
});

export default Note;
