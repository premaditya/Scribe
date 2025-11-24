import React from "react";

export default function About(props) {
  // style based on global mode
  const myStyle = {
  color: props.mode === "dark" ? "white" : "black",
  backgroundColor: props.mode === "dark" ? "#140e5c" : "white",
  borderRadius: "10px",
  padding: "30px",
};


  return (
    <div className="container my-4" style={myStyle}>
      <h1 className="mb-3">About Scribe</h1>

      <p>
        <strong>Scribe</strong> is a fast and easy-to-use text utility tool designed
        to help you transform and clean your text instantly. Whether you're a student,
        writer, developer, or content creator, Scribe makes text formatting simple
        and efficient.
      </p>

      <h3 className="mt-4">✨ What Scribe Can Do</h3>
      <p>Scribe provides multiple powerful text transformation features such as:</p>
      <ul>
        <li>🔠 Convert text to <strong>Uppercase</strong></li>
        <li>🔡 Convert text to <strong>Lowercase</strong></li>
        <li>📝 Convert to <strong>Title Case</strong></li>
        <li>🔤 Convert to <strong>Sentence Case</strong></li>
        <li>🎭 <strong>Alternate Case</strong> transformation</li>
        <li>↔️ <strong>Reverse</strong> the entire text</li>
        <li>🚫 <strong>Remove spaces</strong> (extra or all)</li>
        <li>📋 <strong>Copy</strong> text with one click</li>
      </ul>

      <h3 className="mt-4">💡 Why Scribe?</h3>
      <p>
        Scribe is created with a focus on simplicity and speed. No distractions,
        no complex UI — just a clean interface where you paste your text and instantly
        convert it into the format you need.
      </p>

      <h3 className="mt-4">🌙 Light & Dark Mode</h3>
      <p>
        Scribe supports both <strong>Light</strong> and <strong>Dark</strong> mode,
        automatically adjusting to your theme for a smooth reading experience.
      </p>
    </div>
  );
}
