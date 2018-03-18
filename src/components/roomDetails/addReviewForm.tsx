import * as React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { RatingComponent } from './ratingComponent';

export type AddReviewFormModel = {
  title?: string;
  description?: string;
  rating?: number;
  authorIsAnonymous?: boolean;
  recaptchaResponse?: string;
};

type ReviewFormProps = {
  handleSubmit: any;
  handleChange: any;
  handleCancel: any;
  formValues: AddReviewFormModel;
  errorMsg: string;
};

export const ReviewForm: React.StatelessComponent<ReviewFormProps> = ({
  handleSubmit,
  handleChange,
  handleCancel,
  formValues,
  errorMsg,
}) => (
  <>
    <h2>Add Review</h2>
    <form onSubmit={e => handleSubmit(e)}>
      {errorMsg ? (
        <div className="form-row">
          <span className="error">{errorMsg}</span>
        </div>
      ) : null}
      <div className="form-row">
        <label>Title*</label>
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
          checked={formValues.authorIsAnonymous}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className="form-row">
        <label>Rating*</label>
        <RatingComponent
          rating={formValues.rating}
          handleClick={num => {
            handleChange({
              target: {
                name: 'rating',
                value: num,
              },
            });
          }}
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
