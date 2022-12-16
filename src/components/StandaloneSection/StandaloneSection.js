import React from 'react';
import css from './StandaloneSection.module.css';
import PropTypes from 'prop-types';

function StandaloneSection({ children, backgroundID, isProtruding, isCentered }) {
  let sectionClasses = css['section'];
  sectionClasses += (backgroundID ? ` ${css[`section--background-${backgroundID}`]}` : '');
  sectionClasses += (isProtruding ? ` ${css[`section--protruding`]}` : '');
  sectionClasses += (isCentered ? ` ${css[`section--centered`]}` : '');

  return (
    <section className={sectionClasses}>
      <div className="max-width">
        {children}
      </div>
    </section>
  );
}

StandaloneSection.propTypes = {
  children: PropTypes.node,
  backgroundID: PropTypes.number,
  isProtruding: PropTypes.bool,
  isCentered: PropTypes.bool
};

export default StandaloneSection;