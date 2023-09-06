// App.js
import React, { useState } from 'react';
import Popup from './Popup';

function Cookies() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>Open Popup</button>
      <Popup isOpen={isOpen} onClose={closePopup}>
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
      </Popup>
    </div>
  );
}

export default Cookies;
