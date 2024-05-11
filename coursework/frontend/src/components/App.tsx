import React, { useState } from 'react';
import VacationForm from './VacationForm';
import Modal from "./Modal";

interface PopupItem {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };

  const handleLikedPlaces = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const items: PopupItem[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    // Add more items as needed
  ];

  return (
    <div className="app">
      <VacationForm onSubmit={handleFormSubmit} />
      <button onClick={handleLikedPlaces} className="liked-places-btn">Liked Places</button>
      {isPopupOpen && (
        <Modal
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          onLike={handleLikeClick}
          items={items}
        >
          Liked Places
        </Modal>
      )}
    </div>
  );
};

const handleLikeClick = (item: PopupItem) => {
  // Handle like click logic here
};

export default App;