// https://shift.infinite.red/react-navigation-drawer-tutorial-a802fc3ee6dc
import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppNavigation from './routes';

// here is our redux-aware our smart component
function ReduxNavigation(props) {
  const { dispatch, nav } = props;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
  });

  return <AppNavigation navigation={navigation} />;
}

ReduxNavigation.propTypes = {
  dispatch: PropTypes.func,
  nav: PropTypes.object,
};

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
