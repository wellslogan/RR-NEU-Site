import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { get } from '@app/_shared/baseService';
import { startLoading, stopLoading } from '@app/_shared/actions';
import { ReviewsList } from '@app/components';
import { Link } from 'react-router-dom';

class Profile extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {};

    if (!props.session) {
      props.history.push('/login');
    }

    this.getCurrentUserReviewsAsync();
  }

  getCurrentUserReviewsAsync = () => {
    this.props.dispatch(startLoading());
    get('/api/users/getCurrentUserReviews')
      .then(res => {
        this.props.dispatch(stopLoading());
        this.setState({
          reviews: res,
        });
      })
      .catch(err => {
        this.props.dispatch(stopLoading());
      });
  };

  render() {
    get('/api/users/getCurrentUserReviews').then(res => {});

    return (
      <section>
        <h1>Hello {this.props.session.name}!</h1>
        {!(this.state.reviews && this.state.reviews.length) ? (
          <p>You haven't left any reviews yet.</p>
        ) : (
          <>
            <h2>Reviews You've Left:</h2>
            <div className="reviews-list">
              {this.state.reviews.map((r, idx) => (
                <div key={idx} className="review">
                  <div className="review-rating">{r.rating}</div>
                  <div className="review-content">
                    <h3>
                      <Link to={'/room/' + r.restroom.id}>{r.title}</Link>
                    </h3>
                    <p>
                      Posted{' '}
                      {moment(r.createDate).format(
                        'dddd, MMMM Do YYYY, h:mm:ss a'
                      )}
                    </p>
                    <p>{r.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
});

const connected = connect(mapStateToProps)(Profile);

export { connected as Profile };
