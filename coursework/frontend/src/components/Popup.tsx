import React, { useState } from 'react';

interface PopupProps {
  onClose: () => void;
  data: any;
}

const Popup: React.FC<PopupProps> = ({ onClose, data }) => {
  return (
      <div className="modal">
          <div className='modal-content'>
              <div className='modal-header'>
                  <h2>Search Results</h2>
                  <button className='modal-close-button' onClick={onClose}>×</button>
              </div>
              <div className='modal-body'>
                   {/* Display all data values */}
                  <div className='result-item-block'>
                      <p><b>Country:</b></p>
                      <p>{data.country}</p>
                  </div>
                  <div className='result-item-block'>
                      <p><b>City:</b></p>
                      <p>{data.city}</p>
                  </div>

                  <div className='result-item-description'>
                      <p><b>Description:</b></p>
                      <p>{data.description}</p>
                  </div>

                  <div className='result-item-block'>
                      <p><b>Budget:</b></p>
                      <p>{data.budget}</p>
                  </div>

                  <div className='result-item-block'>
                      <p><b>Temperature:</b></p>
                      <p>{data.temperature}</p>
                  </div>

                  <div className='result-item-block'>
                      <p><b>Specifics:</b></p>
                      <p>{data.specifics}</p>
                  </div>

                  <div className='result-item-block'>
                      <p><b>Popularity:</b></p>
                      <p>{data.popularity}</p>
                  </div>

              </div>
          </div>
      </div>
  );
};

export default Popup;
