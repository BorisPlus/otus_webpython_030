import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <>
      <a href='#login' onClick={() => props.display_form('login')}>[Log in]</a> or <a href='#signup' onClick={() => props.display_form('signup')}>[Sign Up]</a>
    </>
  );

  const logged_in_nav = (
    <>
      <a href='#logout' onClick={props.handle_logout}>[Log out]</a>
    </>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};