import React from 'react';
import PropTypes from 'prop-types';
import css from './Card.module.css';

function Card({ heading, text, Icon }) {
  return (
    <article className={css['card']}>

      {Icon && <Icon className={css['icon']} aria-hidden="true" data-testid="icon"/>}
      <h3 className="heading heading--no-margin heading--color-2 heading--small">{heading}</h3>
      <p className="paragraph paragraph--no-margin paragraph--color-2">{text}</p>

    </article>
  );
}

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.object
};

export default Card;