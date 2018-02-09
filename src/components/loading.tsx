import * as React from 'react';
import { connect } from 'react-redux';

const Loading: React.StatelessComponent<any> = props => {
  return props.loading ? (
    <div className="loading-overlay">
      <div className="spinner">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.loading,
});

const conLoading = connect(mapStateToProps)(Loading);

export { conLoading as Loading };
