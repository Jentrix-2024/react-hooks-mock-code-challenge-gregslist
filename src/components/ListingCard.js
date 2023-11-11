import React, { useState } from "react";

function ListingCard({ listing, onDelete }) {
  const [isFavorite, setIsFavorite] = useState(listing.favorite);

  const handleFavoriteToggle = () => {
    // Toggle the favorite status
    setIsFavorite(!isFavorite);
  };

  const handleDelete = () => {
    // Perform the delete request and call the provided onDelete callback
    fetch(`http://localhost:3000/listings/${listing.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Call the provided onDelete callback to update the state in the parent component
        onDelete(listing.id);
      })
      .catch(error => {
        // Handle errors here
        console.error('Error deleting listing:', error);
      });
  };

  return (
    <li className="card">
      <div className="image">
        <span className="price">${listing.price}</span>
        <img src={listing.image} alt={listing.description} />
      </div>
      <div className="details">
        <button
          className={`emoji-button favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? '★' : '☆'}
        </button>
        <strong>{listing.description}</strong>
        <span> · {listing.location}</span>
        <button className="emoji-button delete" onClick={handleDelete}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;
