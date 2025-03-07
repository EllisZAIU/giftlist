import React, { useState, useEffect } from 'react';
import GiftForm from './components/GiftForm';
import GiftList from './components/GiftList';
import { getAllGifts, createGift, updateGift, deleteGift } from './services/giftService';

function App() {
  const [gifts, setGifts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch gifts on component mount
  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      setError(null);
      const data = await getAllGifts();
      console.log('Fetched Gifts:', data);  // Debug log
      setGifts(data);
    } catch (err) {
      console.error('Fetch Gifts Error:', err);
      setError(`Failed to fetch gifts: ${err.message}`);
    }
  };

  const handleAddGift = async (giftData) => {
    try {
      console.log('Adding Gift:', giftData);  // Debug log
      const newGift = await createGift(giftData);
      console.log('New Gift Created:', newGift);  // Debug log
      setGifts(prevGifts => [...prevGifts, newGift]);
      setError(null);
    } catch (err) {
      setError('Failed to add gift');
      console.error(err);
    }
  };

  const handleUpdateGift = async (id, updatedData) => {
    try {
      console.log('Updating Gift - ID:', id);  // Debug log
      console.log('Updated Data:', updatedData);  // Debug log
      
      const updatedGift = await updateGift(id, updatedData);
      console.log('Server Response - Updated Gift:', updatedGift);  // Debug log
      
      setGifts(prevGifts => 
        prevGifts.map(gift => {
          if (gift._id === id) {
            console.log('Replacing gift:', gift, 'with', updatedGift);  // Debug log
            return updatedGift;
          }
          return gift;
        })
      );
      
      setError(null);
    } catch (err) {
      setError('Failed to update gift');
      console.error(err);
    }
  };

  const handleDeleteGift = async (id) => {
    try {
      await deleteGift(id);
      setGifts(gifts.filter(gift => gift._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete gift');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6 text-center">Gift Tracker</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      <GiftForm onAddGift={handleAddGift} />
      
      <GiftList 
        gifts={gifts} 
        onUpdateGift={handleUpdateGift}
        onDeleteGift={handleDeleteGift}
      />
    </div>
  );
}

export default App;