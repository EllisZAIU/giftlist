import React, { useState } from 'react';
import './GiftForm.css';

function GiftForm({ onAddGift }) {
  const [formData, setFormData] = useState({
    person: '',
    giftitem: '',
    price: '',
    purchased: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const giftData = {
      ...formData,
      price: parseFloat(formData.price)
    };

    onAddGift(giftData);
    
    setFormData({
      person: '',
      giftitem: '',
      price: '',
      purchased: false
    });
  };

  return (
    <form className="gift-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Gift</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="person">Recipient</label>
          <input
            type="text"
            id="person"
            name="person"
            value={formData.person}
            onChange={handleChange}
            required
            placeholder="Who's the gift for?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="giftitem">Gift Item</label>
          <input
            type="text"
            id="giftitem"
            name="giftitem"
            value={formData.giftitem}
            onChange={handleChange}
            required
            placeholder="What's the gift?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <div className="price-input">
            <span className="dollar-sign">$</span>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-group purchased-group">
          <label className="purchased-label">
            <input
              type="checkbox"
              name="purchased"
              checked={formData.purchased}
              onChange={handleChange}
            />
            <span>Already Purchased</span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-button">
          Add Gift
        </button>
      </div>
    </form>
  );
}

export default GiftForm;