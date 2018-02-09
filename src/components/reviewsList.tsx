import * as React from 'react';
import * as moment from 'moment';

const ReviewsList = ({ reviews, handleAddClick }) => {
  return (
    <>
      <h2>
        Reviews ({reviews.length}){' '}
        <span className="add-review-link" onClick={() => handleAddClick()}>
          Add Review
        </span>
      </h2>
      <div className="reviews-list">
        {reviews.map((r, idx) => (
          <div key={idx} className="review">
            <div className="review-rating">{r.rating}</div>
            <div className="review-content">
              <h3>{r.title}</h3>
              <h4>By {r.author}</h4>
              <p>
                Posted{' '}
                {moment(r.createDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </p>
              <p>{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export { ReviewsList };
