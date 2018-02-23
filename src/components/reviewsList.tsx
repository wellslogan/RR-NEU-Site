import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';

const ReviewsList = ({ reviews, handleAddClick, session }) => {
  return (
    <>
      <h2>
        Reviews ({reviews.length}){' '}
        {session ? (
          <span className="add-review-link" onClick={() => handleAddClick()}>
            Add Review
          </span>
        ) : null}
      </h2>
      <div className="reviews-list">
        {reviews.map((r, idx) => (
          <div key={idx} className="review">
            <div className="review-rating">{r.rating}</div>
            <div className="review-content">
              <h3>{r.title}</h3>
              <h4>By {r.author == null ? 'Anonymous' : r.author.name}</h4>
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

const mapStateToProps = state => ({
  session: state.session,
});

const connected = connect(mapStateToProps)(ReviewsList);

export { connected as ReviewsList };
