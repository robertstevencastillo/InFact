import React from "react";
import "./FlashMessages.css";

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((message, index) => {
        return (
          <div key={index} className="floating-alert">
            {message}
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;
