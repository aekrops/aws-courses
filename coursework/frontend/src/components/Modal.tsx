import React from 'react';
import CatalogItem from "./CatalogItem";

interface PopupItem {
  id: number;
  name: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLike: (item: PopupItem) => void;
  children: React.ReactNode;
  items: PopupItem[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onLike, children, items }) => {
  if (!isOpen) {
    return null;
  }

  const handleLikeClick = (item: PopupItem) => {
    onLike(item);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
          <h2>{children}</h2> {/* Move the title to the header */}
        </div>
        <div className="modal-body">
          <div className="modal-popup">
            <div className="modal-popup-content">
              <div className="catalog-items-container">
                {items.map(item => (
                  <CatalogItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;