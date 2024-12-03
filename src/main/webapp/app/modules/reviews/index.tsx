import React, { useState, useEffect } from 'react';
import { useAppSelector } from 'app/config/store';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export default function Reviews() {
  const isAuthenticated = useAppSelector(
    state => state.authentication.isAuthenticated,
  );
  const isAdmin = useAppSelector(state =>
    hasAnyAuthority(state.authentication.account.authorities, [
      AUTHORITIES.ADMIN,
    ]),
  );

  const [mockData, setMockData] = useState(() => {
    const cachedReviews = localStorage.getItem('reviews');
    return cachedReviews
      ? JSON.parse(cachedReviews)
      : [
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

  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(mockData));
  }, [mockData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating > 0 && message.trim() !== '') {
      setMockData(
        (prev: { rating: number; message: string; user: string }[]) => [
          ...prev,
          { rating, message, user: 'CurrentUser' },
        ],
      );
      setRating(1);
      setMessage('');
      setIsModalOpen(false);
    }
  };

  const renderStars = (stars: number) => {
    return (
      <span style={{ color: '#01458e' }}>
        {'★'.repeat(stars)}
        {'☆'.repeat(5 - stars)}
      </span>
    );
  };

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        minHeight: '100vh', // Aseguramos que el contenedor ocupe todo el alto de la página
        zIndex: 1, // Aseguramos que el contenido esté por debajo de la barra
        position: 'relative',
      }}
    >
      <h1 style={{ color: '#01458e' }}>RESEÑAS</h1>
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
        }}
      >
        {mockData.map(
          (
            review: { rating: number; message: string; user: string },
            index: number,
          ) => (
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
          ),
        )}
      </div>

      {isAuthenticated && !isAdmin && (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#01458e',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add a Review
          </button>

          {isModalOpen && (
            <div
              style={{
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  width: '90%',
                  maxWidth: '400px',
                }}
              >
                <h2 style={{ color: '#01458e' }}>Add Your Review</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="rating" style={{ color: '#01458e' }}>
                      Rating:
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '5px',
                        marginTop: '5px',
                      }}
                    >
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          onClick={() => handleStarClick(star)}
                          style={{
                            cursor: 'pointer',
                            fontSize: '1.5em',
                            color: star <= rating ? '#01458e' : '#ccc',
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
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
                      style={{
                        width: '100%',
                        padding: '5px',
                        marginTop: '5px',
                      }}
                    ></textarea>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
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
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      style={{
                        backgroundColor: '#ccc',
                        color: '#333',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
      {!isAuthenticated && (
        <p style={{ color: '#01458e', marginTop: '20px' }}>
          Please log in to add a review.
        </p>
      )}
    </div>
  );
}
