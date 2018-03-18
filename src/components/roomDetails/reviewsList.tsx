import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import Icon from 'react-icons-kit';
import { remove as removeIcon } from 'react-icons-kit/fa/remove';
import { AppState } from '@models';

const ReviewsList = ({
  reviews,
  handleAddClick,
  handleDeleteClick,
  session,
}) => {
  const getAuthorName = review => {
    if (review.author !== null && review.authorIsAnonymous) {
      return `${review.author.name} (Anonymous to others)`;
    } else if (review.authorIsAnonymous || !review.author) {
      return 'Anonymous';
    } else {
      return review.author.name;
    }
  };

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
              <div className="review-title">
                <h3>{r.title}</h3>
                {r.author && session && r.author.id === session.id ? (
                  <button
                    type="button"
                    className="btn delete-review-btn"
                    onClick={() => handleDeleteClick(r)}
                  >
                    <Icon icon={removeIcon} />
                  </button>
                ) : null}
              </div>
              <h4>By {getAuthorName(r)}</h4>
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

const mapStateToProps = (state: AppState) => ({
  session: state.global.session,
});

const connected = connect(mapStateToProps)(ReviewsList);

export { connected as ReviewsList };
