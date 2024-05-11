import React from 'react';

interface PopupItem {
  id: number;
  name: string;
}

interface CatalogItemProps {
  item: PopupItem;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ item }) => {
  return (
    <div className="catalog-item">
      <div className="catalog-item-name">{item.name}</div>
      {/* Add a like button if needed */}
      {/* <button onClick={() => handleLikeClick(item)}>Like</button> */}
    </div>
  );
};

export default CatalogItem;