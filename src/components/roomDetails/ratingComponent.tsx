import * as React from 'react';

type RatingComponentProps = {
  rating: number;
  handleClick: (num: number) => void;
};

export const RatingComponent: React.StatelessComponent<
  RatingComponentProps
> = ({ rating, handleClick }) => {
  return (
    <div className="rating-component">
      {Array(10)
        .fill(0)
        .map((_, idx) => idx + 1)
        .map(i => (
          <span
            key={i}
            className={`rating-option ${rating === i ? 'active' : ''}`}
            onClick={() => handleClick(i)}
          >
            {i}
          </span>
        ))}
    </div>
  );
};
