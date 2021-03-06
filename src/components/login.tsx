import * as React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import Mailto from 'react-protected-mailto'

import { addSession, clearSession } from '@shared/globalRedux/global.actions';
import { get } from '@app/_shared/baseService';

const Login: React.StatelessComponent<any> = props => {
  let loginAgain = false;
  // if we have the 'again' queryparam, need to clear session and login again
  if (parse(location.search).again) {
    loginAgain = true;

    sessionStorage.removeItem('jwtToken');
    if (props.session) {
      props.clearSession(); // will trigger prop change, but just in case:
      return null;
    }
  }

  const responseGoogle = googleUser => {
    const id_token = googleUser.getAuthResponse().id_token;

    sessionStorage.setItem('jwtToken', id_token);

    get('/api/users/findOrCreate').then((res: any) => {
      props.addSession({
        name: googleUser.getBasicProfile().getName(),
        id: res.id,
      });
    });

    props.history.push('/');
  };

  const onLogoutSuccess = () => {
    props.history.push('/');
  };

  const logout = res => {
    props.clearSession();
    sessionStorage.removeItem('jwtToken');
    if ((window as any).gapi) {
      const auth2 = (window as any).gapi.auth2.getAuthInstance();
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect().then(onLogoutSuccess));
      }
    }
  };

  if (props.session) {
    return (
      <section>
        <button onClick={logout} className="google-buttom">
          <span className="google-button__icon">
            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                id="Shape"
                fill="#EA4335"
              />
              <path
                d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
                id="Shape"
                fill="#FBBC05"
              />
              <path
                d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
                id="Shape"
                fill="#4285F4"
              />
              <path
                d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
                fill="#34A853"
              />
            </svg>
          </span>
          <span className="google-button__text">Log out of Google</span>
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1>Please Login {loginAgain ? 'Again' : ''}</h1>
      <GoogleLogin
        className="google-button"
        clientId="1084340095005-ruohgqsnnujh6ics2co0jjc2l2k7ukvd.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      >
        <span className="google-button__icon">
          <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
              id="Shape"
              fill="#EA4335"
            />
            <path
              d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z"
              id="Shape"
              fill="#FBBC05"
            />
            <path
              d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z"
              id="Shape"
              fill="#4285F4"
            />
            <path
              d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z"
              fill="#34A853"
            />
          </svg>
        </span>
        <span className="google-button__text">Sign in with Google</span>
      </GoogleLogin>
      <p>By logging in you agree that your restroom and review information may be used (anonymously) as part of data collection for the senior project of Logan Wells for IS4900 at Northeastern University. If you have any questions, please contact me directly at
      {' '}<Mailto
      email='wells.l@husky.neu.edu'
      headers={
        {subject:'Question about Husky Bathrooms'}
      }/>.</p>
    </section>
  );
};

const mapDispatchToProps = {
  addSession,
  clearSession,
};

const mapStateToProps = state => ({
  session: state.session,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
