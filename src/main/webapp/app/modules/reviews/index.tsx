import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export default function Reviews() {
  const isAuthenticated = useAppSelector(
    state => state.authentication.isAuthenticated
  );
  const isAdmin = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ])
  );

  const [mockData, setMockData] = useState(() => {
    // Obtener las reseñas almacenadas en la caché
    const cachedReviews = localStorage.getItem('reviews');
    return cachedReviews ? JSON.parse(cachedReviews) : [
      {
        rating: 3,
        message: 'This is a review message for the first review',
        user: 'User1',
      },
      {
        rating: 5,
        message: 'This is a review message for the second review',
        user: 'User2',
      },
      {
        rating: 4,
        message: 'This is a review message for the third review',
        user: 'User3',
      },
    ];
  });

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Actualizar la caché cuando las reseñas cambien
    localStorage.setItem('reviews', JSON.stringify(mockData));
  }, [mockData]);

  const handleSubmit = e => {
    e.preventDefault();
    if (rating > 0 && message.trim() !== '') {
      setMockData(prev => [
        ...prev,
        { rating, message, user: 'CurrentUser' }, // Replace 'CurrentUser' with actual username
      ]);
      setRating(0);
      setMessage('');
    }
  };

  const renderStars = stars => {
    return (
      <span style={{ color: '#01458e' }}>
        {'★'.repeat(stars)}
        {'☆'.repeat(5 - stars)}
      </span>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <h1 style={{ color: '#01458e' }}>REVIEWS</h1>
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {mockData.map((review, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#01458e' }}>
              <span style={{ fontSize: '0.8em', fontWeight: 'bold' }}>
                {review.user}
              </span>
              : {renderStars(review.rating)}
            </h3>
            <p style={{ color: '#01458e' }}>{review.message}</p>
          </div>
        ))}
      </div>

      {isAuthenticated && !isAdmin && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <h2 style={{ color: '#01458e' }}>Add Your Review</h2>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="rating" style={{ color: '#01458e' }}>
              Rating (1-5):
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="message" style={{ color: '#01458e' }}>
              Review Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#01458e',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Submit Review
          </button>
        </form>
      )}
      {!isAuthenticated && (
        <p style={{ color: '#01458e', marginTop: '20px' }}>
          Please log in to add a review.
        </p>
      )}
    </div>
  );
}
