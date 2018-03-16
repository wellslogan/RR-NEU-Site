import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import ReCAPTCHA from 'react-google-recaptcha';
import { meanBy, sortBy } from 'lodash';
import { get, post  } from '@shared/baseService';
import { startLoading, stopLoading } from '@shared/actions';
import { deleteReview } from './room.service';
import { Room } from '@models';
import { Loading } from '@app/components/loading';
import { ReviewsList } from '../reviewsList';
import { RatingComponent } from '@app/components/rating';
import { RestroomGenderComponent} from './gender';
import { precisionRound } from '@shared/utils';

type RoomDetailsProps = {
  match: {
    params: {
      id: number;
    };
  };
};

type RoomDetailsState = {
  loading: boolean;
  room?: Room;
  showForm: boolean;
  addRoomForm: any;
};

class RoomDetails extends React.Component<
  RoomDetailsProps & any,
  RoomDetailsState
> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showForm: false,
      addRoomForm: {},
    };
    this.loadRoom();
  }

  loadRoom = () => {
    this.props.startLoading();
    get<any>('/api/restrooms/' + this.props.match.params.id).then(room => {
      this.props.stopLoading();
      this.setState((state, props) => {
        props.stopLoading();
        return {
          room,
        };
      });
    });
  };

  submitForm = () => {
    if (
      !this.state.addRoomForm.recaptchaResponse ||
      this.state.addRoomForm.recaptchaResponse === ''
    ) {
      return;
    }
    this.props.startLoading();
    post<any>('/api/reviews/add', {
      review: {
        ...this.state.addRoomForm,
        restroomId: this.state.room.id,
      },
      recaptchaResponse: this.state.addRoomForm.recaptchaResponse,
    }).then(res => {
      this.props.stopLoading();
      if (res.success) {
        this.setState({
          showForm: false,
          addRoomForm: {},
        });
        this.loadRoom();
      }
    });
  };

  calcRating = () => {
    return meanBy(this.state.room.reviews, 'rating');
  };

  handleDeleteClick(review) {
    if (confirm('Delete this review?')) {
      this.props.startLoading();
      deleteReview(review.id).then((res) => {
        this.props.stopLoading();
        this.setState(prevState => ({
          room: {
            ...prevState.room,
            reviews: prevState.room.reviews.filter(r => r.id !== review.id),
          }
        }))
      })
      .catch(err => this.props.stopLoading());
    }
  }

  render() {
    return this.props.loading || !this.state.room ? null : (
      <section>
        <h2>{this.state.room.description}</h2>
        <RestroomGenderComponent gender={this.state.room.restroomGender} />
        <h3>Average Rating: {precisionRound(this.calcRating(), 1) || '--'} / 10</h3>
        <p>{this.state.room.location}</p>
        <p>
          <sup>Added on {this.formatDate(this.state.room.createDate)}</sup>
        </p>
        {!this.state.showForm ? null : (
          <ReviewForm
            handleSubmit={e => {
              e.preventDefault();
              this.submitForm();
            }}
            handleChange={e => {
              const value =
                e.target.type === 'checkbox'
                  ? e.target.checked
                  : e.target.value;

              this.setState({
                addRoomForm: {
                  ...this.state.addRoomForm,
                  [e.target.name]: value,
                },
              });
            }}
            formValues={this.state.addRoomForm}
            handleCancel={e => {
              e.preventDefault();
              this.setState({
                addRoomForm: {},
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
          handleDeleteClick={(review) => {
            this.handleDeleteClick(review);
          }}
          reviews={sortBy(this.state.room.reviews, 'createDate').reverse()}
        />
      </section>
    );
  }

  private formatDate(date: string) {
    return moment(date).format('MM-DD-YYYY');
  }
}

const ReviewForm = ({
  handleSubmit,
  handleChange,
  handleCancel,
  formValues,
}) => (
  <>
    <h2>Add Review</h2>
    <form onSubmit={e => handleSubmit(e)}>
      <div className="form-row">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formValues.title}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="form-row">
        <label>Post Anonymously</label>
        <input
          type="checkbox"
          name="authorIsAnonymous"
          value={formValues.authorIsAnonymous}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="form-row">
        <label>Rating</label>
        <RatingComponent rating={formValues.rating} handleClick={(num) => {
          handleChange({
            target: {
              name: 'rating',
              value: num
            }
          });
        }}/>
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea
          rows={5}
          name="description"
          value={formValues.description}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="form-row">
        <ReCAPTCHA
          sitekey="6LcBDEQUAAAAAIB2kbmEh7eChcdxB6jPu4MBYWBx"
          onChange={val =>
            handleChange({
              target: {
                name: 'recaptchaResponse',
                value: val,
              },
            })
          }
        />
      </div>
      <div className="form-row">
        <button onClick={e => handleCancel(e)}>Cancel</button>&nbsp;
        <button type="submit">Submit</button>
      </div>
    </form>
  </>
);

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
});

const mapDispatchToProps = {
  startLoading,
  stopLoading
}

const cRoomDetails = connect(mapStateToProps, mapDispatchToProps)(RoomDetails);

export { cRoomDetails as RoomDetails };
