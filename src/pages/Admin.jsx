import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/Admin.css';
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
];

const Admin = () => {
  const [dishes, setDishes] = useState(initialDishes);
  const [formData, setFormData] = useState({
    name: '',
    restaurant: '',
    price: '',
    rating: '',
    phone: '',
    image: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDishes(prev => prev.map(dish => 
        dish.id === editingId 
          ? { ...formData, id: dish.id, price: Number(formData.price), rating: Number(formData.rating) }
          : dish
      ));
      toast.success('Dish updated successfully!');
      setEditingId(null);
    } else {
      const newDish = {
        ...formData,
        id: Date.now(),
        price: Number(formData.price),
        rating: Number(formData.rating)
      };
      setDishes(prev => [...prev, newDish]);
      toast.success('Dish added successfully!');
    }
    setFormData({
      name: '',
      restaurant: '',
      price: '',
      rating: '',
      phone: '',
      image: ''
    });
  };

  const handleDelete = (id) => {
    setDishes(prev => prev.filter(dish => dish.id !== id));
    toast.success('Dish deleted successfully!');
  };

  const handleEdit = (dish) => {
    setFormData(dish);
    setEditingId(dish.id);
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="admin-content">
        <div className="form-section">
          <h2>{editingId ? 'Edit Dish' : 'Add New Dish'}</h2>
          <form onSubmit={handleSubmit} className="dish-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Dish Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="restaurant"
                placeholder="Restaurant Name"
                value={formData.restaurant}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={formData.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              {editingId ? 'Update Dish' : 'Add Dish'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: '',
                    restaurant: '',
                    price: '',
                    rating: '',
                    phone: '',
                    image: ''
                  });
                }}
                className="cancel-button"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="dishes-list">
          <h2>Current Dishes</h2>
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
                  <div className="dish-actions">
                    <button onClick={() => handleEdit(dish)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(dish.id)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;