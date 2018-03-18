import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { get } from '@app/_shared/baseService';
import { startLoading, stopLoading } from '@shared/globalRedux/global.actions';
import { ReviewsList } from '../roomDetails/reviewsList';
import { Link } from 'react-router-dom';
import { AppState, Review } from '@models';
import { fetchProfileReviews } from '@app/components/profile/profile.actions';
import { Loading } from '@app/components';

type ProfileProps = {
  fetchProfileReviews: () => any;
  profileReviews?: Review[];
  profileLoading: boolean;
  profileError: string;
  session?: any;
};

class Profile extends React.Component<ProfileProps, any> {
  constructor(props) {
    super(props);

    if (!props.session) {
      props.history.push('/login');
    }

    this.props.fetchProfileReviews();
  }

  render() {
    if (this.props.profileLoading) {
      return <Loading />;
    }

    return (
      <section>
        <h1>Hello {this.props.session.name}!</h1>
        {!(this.props.profileReviews && this.props.profileReviews.length) ? (
          <p>You haven't left any reviews yet.</p>
        ) : (
          <>
            <h2>Reviews You've Left:</h2>
            <div className="reviews-list">
              {this.props.profileReviews.map((r, idx) => (
                <div key={idx} className="review">
                  <div className="review-rating">{r.rating}</div>
                  <div className="review-content">
                    <h3>
                      <Link to={`/room/${r.restroom.id}`}>{r.title}</Link>
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

const mapStateToProps = (state: AppState) => ({
  session: state.global.session,
  ...state.profile,
});

const mapDispatchToProps = {
  fetchProfileReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
