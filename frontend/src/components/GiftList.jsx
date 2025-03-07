import React, { useState } from 'react';
import './GiftList.css';

function GiftList({ gifts, onUpdateGift, onDeleteGift }) {
  const [editingGift, setEditingGift] = useState(null);

  const handleEditClick = (gift) => {
    setEditingGift(gift);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingGift(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveEdit = () => {
    onUpdateGift(editingGift._id, {
      ...editingGift,
      price: parseFloat(editingGift.price)
    });
    setEditingGift(null);
  };

  if (gifts.length === 0) {
    return (
      <div className="empty-list">
        <p>No gifts found. Start adding some gifts!</p>
      </div>
    );
  }

  return (
    <div className="gift-list-container">
      <table className="gift-list">
        <thead>
          <tr>
            <th>Person</th>
            <th>Gift</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map((gift) => (
            <tr key={gift._id} className="gift-row">
              {editingGift && editingGift._id === gift._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="person"
                      value={editingGift.person}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="giftitem"
                      value={editingGift.giftitem}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={editingGift.price}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="purchased"
                      checked={editingGift.purchased}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveEdit} className="save-btn">Save</button>
                    <button onClick={() => setEditingGift(null)} className="cancel-btn">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{gift.person}</td>
                  <td>{gift.giftitem}</td>
                  <td className="price">${gift.price.toFixed(2)}</td>
                  <td>
                    <span className={`status ${gift.purchased ? 'purchased' : 'not-purchased'}`}>
                      {gift.purchased ? 'Purchased' : 'Not Purchased'}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEditClick(gift)} className="edit-btn">Edit</button>
                    <button onClick={() => onDeleteGift(gift._id)} className="delete-btn">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GiftList;