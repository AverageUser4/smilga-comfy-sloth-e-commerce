import React from 'react';
import css from './StandaloneSection.module.css';
import PropTypes from 'prop-types';

function StandaloneSection({ children, backgroundID, isProtruding, isCentered }) {
  let sectionClasses = css['section'];
  sectionClasses += (backgroundID ? ` ${css[`section--background-${backgroundID}`]}` : '');
  sectionClasses += (isProtruding ? ` ${css[`section--protruding`]}` : '');
  sectionClasses += (isCentered ? ` ${css[`section--centered`]}` : '');
  
  return (
    <div className={sectionClasses}>
      <div className="max-width">
        {children}
      </div>
    </div>
  );
}

StandaloneSection.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundID: PropTypes.number,
  isProtruding: PropTypes.bool,
  isCentered: PropTypes.bool,
  isSemanticSection: PropTypes.bool
};

export default StandaloneSection;