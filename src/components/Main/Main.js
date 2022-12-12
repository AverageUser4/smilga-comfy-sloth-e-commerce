import React from 'react';
import PropTypes from 'prop-types';
import css from './Main.module.css';

function Main({ children }) {
  return (
    <main className={css['main']}>
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node
};

export default Main;