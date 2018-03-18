import * as React from 'react';

export const Loading: React.StatelessComponent = () => (
  <div className="loading-overlay">
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  </div>
);
