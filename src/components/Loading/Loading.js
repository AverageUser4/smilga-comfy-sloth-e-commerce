import React from 'react';
import PropTypes from 'prop-types';
import css from './Loading.module.css';

function Loading({ style }) {
  return (
    <div aria-description="Loading, please wait." style={style} className={css['loading']}></div>
  );
}

Loading.propTypes = {
  style: PropTypes.object
};

export default Loading;