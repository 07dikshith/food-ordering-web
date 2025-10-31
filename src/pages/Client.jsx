import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/Client.css';
import dishImage from '../images/image.png';
import susImage from '../images/sus.jpg';
import idliImage from '../images/idli.jpg';
import riceImage from '../images/images.jpeg';
const initialDishes = [
  {
    id: 1,
    name: 'Margherita Pizza',
    restaurant: 'Italian Delight',
    price: 14.99,
    rating: 4.5,
    phone: '555-0123',
    image: dishImage
  },
  {
    id: 2,
    name: 'Sushi Roll Set',
    restaurant: 'Sushi Master',
    price: 24.99,
    rating: 4.8,
    phone: '555-0124',
    image: susImage
  },
  {
    id: 3,
    name: 'Idli',
    restaurant: 'JMR',
    price: 12.99,
    rating: 5.0,
    phone: '555-0124',
    image: idliImage
  },
    {
    id: 4,
    name: 'rice',
    restaurant: 'lk',
    price: 12,
    rating: 5.0,
    phone: '554',
    image: riceImage
  
  }
  // Add more mock dishes here
];

const Client = () => {
  const [dishes] = useState(initialDishes);
  const [selectedDish, setSelectedDish] = useState(null);
  const [feedback, setFeedback] = useState({ rating: 5, comment: '' });

  const handleOrder = (dish) => {
    toast.success('✅ Your order has been placed! Your order will arrive in a few minutes.');
  };

  const handleFeedbackSubmit = (e, dish) => {
    e.preventDefault();
    toast.success('Thank you for your feedback!');
    setFeedback({ rating: 5, comment: '' });
    setSelectedDish(null);
  };

  return (
    <div className="client-container">
      <header className="client-header">
        <h1>Food Delivery</h1>
      </header>
      
      <div className="dishes-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <div className="dish-info">
              <h3>{dish.name}</h3>
              <p className="restaurant">{dish.restaurant}</p>
              <p className="price">${dish.price.toFixed(2)}</p>
              <div className="rating">
                {'★'.repeat(Math.floor(dish.rating))}
                {'☆'.repeat(5 - Math.floor(dish.rating))}
                <span>{dish.rating}</span>
              </div>
              <p className="phone">{dish.phone}</p>
              <button onClick={() => handleOrder(dish)} className="order-button">
                Order Now
              </button>
              <button 
                onClick={() => setSelectedDish(dish)} 
                className="feedback-button"
              >
                Leave Feedback
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDish && (
        <div className="feedback-modal">
          <div className="feedback-content">
            <h3>Leave Feedback for {selectedDish.name}</h3>
            <form onSubmit={(e) => handleFeedbackSubmit(e, selectedDish)}>
              <div className="rating-input">
                {[5, 4, 3, 2, 1].map((star) => (
                  <label key={star}>
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={feedback.rating === star}
                      onChange={(e) => setFeedback({ ...feedback, rating: Number(e.target.value) })}
                    />
                    {'★'}
                  </label>
                ))}
              </div>
              <textarea
                placeholder="Your feedback..."
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
              />
              <div className="feedback-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setSelectedDish(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;