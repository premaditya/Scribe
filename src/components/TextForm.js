import React, { useState, useEffect } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');
  const [lastSearch, setLastSearch] = useState('');

  // Highlight and count search term occurrences
  useEffect(() => {
    if (!props.searchValue || props.searchValue.trim() === "" || text.trim() === "") return;

    if (props.searchValue !== lastSearch) {
      const regex = new RegExp(`\\b(${props.searchValue})\\b`, "gi");
      const matches = text.match(regex);

      if (matches && matches.length > 0) {
        props.showAlert(`Found "${props.searchValue}" ${matches.length} time(s)`, "success");
      } else {
        props.showAlert(`No matches found for "${props.searchValue}"`, "danger");
      }
      setLastSearch(props.searchValue);
    }
  }, [props.searchValue, text, lastSearch, props]);

  const getHighlightedText = (inputText, highlight) => {
    if (!highlight) return inputText;

    const regex = new RegExp(`\\b(${highlight})\\b`, 'gi');
    const parts = inputText.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Text transformation functions
  const handleUpClick = () => { setText(text.toUpperCase()); props.showAlert("Converted to Upper Case", "success"); };
  const handleLoClick = () => { setText(text.toLowerCase()); props.showAlert("Converted to Lower Case", "success"); };
  const handleClearClick = () => { setText(''); props.showAlert("Cleared the text", "success"); };
  const handleRevClick = () => { setText(text.split(" ").reverse().join(" ")); props.showAlert("Reversed the text", "success"); };
  const handleCopy = () => { navigator.clipboard.writeText(text); props.showAlert("Copied text to clipboard", "success"); };
  const handleExtraSpaces = () => { setText(text.trim().split(/\s+/).join(" ")); props.showAlert("Removed extra spaces", "success"); };
  const handleSentenceCase = () => { setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())); props.showAlert("Converted to Sentence Case", "success"); };
  const handleCapitalizedCase = () => { setText(text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())); props.showAlert("Converted to Capitalized Case", "success"); };
  const handleAlternatingCase = () => { setText(text.split('').map((c,i) => i%2===0 ? c.toLowerCase() : c.toUpperCase()).join('')); props.showAlert("Converted to Alternating Case", "success"); };
  const handleTitleCase = () => {
    const smallWords = ['a','an','the','and','but','or','for','nor','on','in','at','with','to','of','by'];
    setText(text.toLowerCase().split(/\s+/).map((word, idx, arr) =>
      idx === 0 || idx === arr.length-1 || !smallWords.includes(word)
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word
    ).join(' '));
    props.showAlert("Converted to Title Case", "success");
  };
  const handleInverseCase = () => { setText(text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')); props.showAlert("Converted to Inverse Case", "success"); };

  const handleOnChange = (event) => setText(event.target.value);

  // Character-based reading time
  const charCount = text.length;
  const totalSeconds = Math.floor((charCount / 1000) * 60);  // 1000 chars = 1 minute

  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  let formattedTime = "";
  if (hours > 0) formattedTime += `${hours} hr `;
  if (minutes > 0) formattedTime += `${minutes} min `;
  if (seconds > 0) formattedTime += `${seconds} sec`;
  if (formattedTime.trim() === "") formattedTime = "0 sec";

  return (
    <>
      <div className="container my-2" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
            placeholder="Enter your text here..."
            style={{
              backgroundColor: props.mode === 'light' ? 'white' : '#bdd8ff',
              color: props.mode === 'dark' ? '#fff' : 'black',
              border: '1px solid black'
            }}
          ></textarea>
        </div>

        <div className="mb-3 d-flex flex-wrap gap-2">
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleUpClick}>Uppercase</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleLoClick}>Lowercase</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleClearClick}>Clear</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleRevClick}>Reverse</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleCopy}>Copy</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleExtraSpaces}>Remove Spaces</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleSentenceCase}>Sentence Case</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleCapitalizedCase}>Capitalized Case</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleAlternatingCase}>Alternating Case</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleTitleCase}>Title Case</button>
          <button disabled={text.length===0} className="btn btn-custom btn-sm" onClick={handleInverseCase}>Inverse Case</button>
        </div>

        <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>
          <h2>Your text summary</h2>
          <p>{text.trim().split(/\s+/).filter(word => word.length>0).length} words, {text.length} characters</p>
          <p>Estimated reading time: {formattedTime}</p>

          <h2>Preview</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {text.length > 0 ? getHighlightedText(text, props.searchValue) : "Enter something in textbox to preview here..."}
          </p>
        </div>
      </div>
    </>
  );
}
