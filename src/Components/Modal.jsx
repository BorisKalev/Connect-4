import React from "react";

function Modal({ isOpen, content, anotherRound, restartGame }) {
  if (isOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="overlay" onClick={anotherRound}></div>
          <div className="modal-content">
            <h2 className="modal-message">{content}</h2>
            <div id="buttons">
              <button className="anotherRound-btn" onClick={anotherRound}>
                <p id="inner-text">Another Round</p>
                <i className="bi bi-play-fill" id="play-icon"></i>
              </button>

              <button className="restart-btn" onClick={restartGame}>
                <p id="inner-text">Restart match</p>
                <i class="bi bi-arrow-clockwise" id="restart-icon"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
