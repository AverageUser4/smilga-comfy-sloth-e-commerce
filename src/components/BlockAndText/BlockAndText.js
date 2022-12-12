import React from 'react';
import PropTypes from 'prop-types';
import css from './BlockAndText.module.css';

function BlockAndText({ children, isBlockFirst = false }) {
  let containerClasses = css['container'];
  containerClasses += (isBlockFirst ? ` ${css['container--reversed']}` : '');
  
  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}

BlockAndText.propTypes = {
  children: PropTypes.node,
  isBlockFirst: PropTypes.bool
};

export default BlockAndText;