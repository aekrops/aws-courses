import React, { useState } from 'react';
import ErrorModal from './ErrorModal';
import Popup from './Popup';

interface VacationFormProps {
  onSubmit: (values: VacationFormValues) => void;
}

interface VacationFormValues {
  budget: string;
  temperature: string;
  specifics: string;
  popularity: string;
  text: string;
}

const VacationForm: React.FC<VacationFormProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState<VacationFormValues>({
    budget: '',
    temperature: '',
    specifics: '',
    popularity: '',
    text: 'none',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.budget && formValues.temperature && formValues.specifics && formValues.popularity) {
      try {
        const nestedBody = JSON.stringify({
          budget: formValues.budget,
          temperature: formValues.temperature,
          specifics: formValues.specifics,
          popularity: formValues.popularity,
          text: formValues.text
        });

        const response = await fetch('https://28uevt5r5c.execute-api.eu-central-1.amazonaws.com/course-work/recommend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ body: nestedBody })
        });

        if (response.ok) {
          const responseData = await response.json();
          // Do something with the response from your Lambda function (responseData)
          console.log(responseData);
            setPopupData(responseData);
            setShowPopup(true);
        } else {
          // Handle errors or display an error message
          console.log('Error');
        }
      } catch (error) {
        // Handle network errors or other fetch-related errors
        console.log('Network error');
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // @ts-ignore
  return (
    <>
      <ErrorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>Error</h1>
        <p>Please fill in all fields</p>
      </ErrorModal>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="budget">Budget:</label>
          <select id="budget" value={formValues.budget} onChange={handleInputChange}>
            <option value="">Select budget</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="temperature">Temperature:</label>
          <select id="temperature" value={formValues.temperature} onChange={handleInputChange}>
            <option value="">Select temperature</option>
            <option value="cold">Cold</option>
            <option value="warm">Warm</option>
            <option value="hot">Very Hot</option>
          </select>
        </div>
        <div>
          <label htmlFor="specifics">Specifics:</label>
          <select id="specifics" value={formValues.specifics} onChange={handleInputChange}>
            <option value="">Select specifics</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="park">Park</option>
            <option value="cave">Cave</option>
            <option value="forest">Forest</option>
          </select>
        </div>
        <div>
          <label htmlFor="popularity">Popularity:</label>
          <select id="popularity" value={formValues.popularity} onChange={handleInputChange}>
            <option value="">Select popularity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="text">Additional criteria:</label>
          <input id="text" value={formValues.text} onChange={handleInputChange} />
        </div>
        <button type="submit">Search</button>
      </form>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} data={popupData} />
      )}
    </>
  );
};

export default VacationForm;