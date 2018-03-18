import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import ReCAPTCHA from 'react-google-recaptcha';
import { meanBy, sortBy } from 'lodash';

import { get, post } from '@shared/baseService';
import { startLoading, stopLoading } from '@shared/globalRedux/global.actions';
import { Room, AppState, Review } from '@models';
import { SubmitReviewRequest } from './room.service';
import { ReviewsList } from './reviewsList';
import { RatingComponent } from './ratingComponent';
import { RestroomGenderComponent } from './genderComponent';
import { precisionRound } from '@shared/utils';
import {
  fetchRoomDetailsAsync,
  addReviewAsync,
  deleteReviewAsync,
  addRoomDetailsError,
} from './roomDetails.actions';

import { ReviewForm, AddReviewFormModel } from '../roomDetails/addReviewForm';
import { Loading } from '@app/components';

type RoomDetailsProps = {
  match: {
    params: {
      id: number;
    };
  };
  fetchRoomDetailsAsync: (id: number) => any;
  addReviewAsync: (review: SubmitReviewRequest) => any;
  deleteReviewAsync: (id: number) => any;
  addRoomDetailsError: (error: string) => any;
  roomDetailsLoading: boolean;
  roomDetailsError: string;
  roomDetails?: Room;
};

type RoomDetailsState = {
  showForm: boolean;
  addReviewForm: AddReviewFormModel;
  formError: string;
};

class RoomDetails extends React.Component<RoomDetailsProps, RoomDetailsState> {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      addReviewForm: {},
      formError: '',
    };

    this.props.fetchRoomDetailsAsync(this.props.match.params.id);
  }

  submitForm = event => {
    event.preventDefault();

    if (!this.state.addReviewForm.recaptchaResponse) {
      this.props.addRoomDetailsError('Please fill out the reCAPTCHA form.');
      return;
    }

    if (!this.state.addReviewForm.title || !this.state.addReviewForm.rating) {
      this.props.addRoomDetailsError('Title and Rating are required.');
      return;
    }

    this.props
      .addReviewAsync({
        review: {
          ...this.state.addReviewForm,
          restroomId: this.props.roomDetails.id,
        },
        recaptchaResponse: this.state.addReviewForm.recaptchaResponse,
      })
      .then(result => {
        if (result.success) {
          this.setState({
            showForm: false,
            addReviewForm: {},
          });
        }
      });
  };

  calcRating = () => {
    return meanBy(this.props.roomDetails.reviews, 'rating');
  };

  handleDeleteClick(review) {
    if (confirm('Permanently delete this review?')) {
      this.props.deleteReviewAsync(review.id);
    }
  }

  render() {
    if (this.props.roomDetailsLoading || !this.props.roomDetails) {
      return <Loading />;
    }

    if (!this.props.roomDetails) {
      return <span className="error">{this.props.roomDetailsError}</span>;
    }

    return (
      <section>
        <h2>{this.props.roomDetails.description}</h2>
        <RestroomGenderComponent
          gender={this.props.roomDetails.restroomGender}
        />
        <h3>
          Average Rating: {precisionRound(this.calcRating(), 1) || '--'} / 10
        </h3>
        <p>{this.props.roomDetails.location}</p>
        <p>
          <sup>
            Added on {this.formatDate(this.props.roomDetails.createDate)}
          </sup>
        </p>
        {!this.state.showForm ? null : (
          <ReviewForm
            errorMsg={this.props.roomDetailsError}
            handleSubmit={this.submitForm}
            handleChange={e => {
              const value =
                e.target.type === 'checkbox'
                  ? e.target.checked
                  : e.target.value;

              this.setState({
                addReviewForm: {
                  ...this.state.addReviewForm,
                  [e.target.name]: value,
                },
              });
            }}
            formValues={this.state.addReviewForm}
            handleCancel={e => {
              e.preventDefault();
              this.setState({
                addReviewForm: {},
                showForm: false,
              });
            }}
          />
        )}
        <ReviewsList
          handleAddClick={() => {
            this.setState({
              showForm: true,
            });
          }}
          handleDeleteClick={review => {
            this.handleDeleteClick(review);
          }}
          reviews={sortBy(
            this.props.roomDetails.reviews,
            'createDate'
          ).reverse()}
        />
      </section>
    );
  }

  private formatDate(date: string): string {
    return moment(date).format('MM-DD-YYYY');
  }
}

const mapStateToProps = (state: AppState, ownProps) => ({
  ...state.roomDetails,
});

const mapDispatchToProps = {
  fetchRoomDetailsAsync,
  addReviewAsync,
  deleteReviewAsync,
  addRoomDetailsError,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetails);
