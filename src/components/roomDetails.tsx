import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { meanBy, sortBy } from 'lodash';

import { Room } from '@app/models/room';
import { ApiService } from '@app/services/apiService';
import { Loading } from '@app/components/loading';
import * as Actions from '@app/_shared/actions';
import { ReviewsList } from '@app/components/reviewsList';

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
    this.props.dispatch(Actions.startLoading());
    ApiService.get('/api/restrooms/' + this.props.match.params.id).then(
      room => {
        this.props.dispatch(Actions.stopLoading());
        this.setState((state, props) => {
          props.dispatch(Actions.stopLoading());
          return {
            room,
          };
        });
      }
    );
  };

  submitForm = () => {
    this.props.dispatch(Actions.startLoading());
    ApiService.post('/api/reviews/add', {
      review: {
        ...this.state.addRoomForm,
        restroomId: this.state.room.id,
      },
    }).then(res => {
      this.props.dispatch(Actions.stopLoading());
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

  render() {
    return this.props.loading || !this.state.room ? null : (
      <section>
        <h2>{this.state.room.description}</h2>
        <h3>Average Rating: {this.calcRating() || '--'} / 10</h3>
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
              this.setState({
                addRoomForm: {
                  ...this.state.addRoomForm,
                  [e.target.name]: e.target.value,
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
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formValues.author}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="form-row">
        <label>Rating</label>
        <input
          type="number"
          name="rating"
          value={formValues.rating}
          onChange={e => handleChange(e)}
        />
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
        <button onClick={e => handleCancel(e)}>Cancel</button>&nbsp;
        <button type="submit">Submit</button>
      </div>
    </form>
  </>
);

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
});

const cRoomDetails = connect(mapStateToProps)(RoomDetails);

export { cRoomDetails as RoomDetails };