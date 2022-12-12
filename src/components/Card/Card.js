import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

function Card({ heading, text, Icon }) {
  return (
    <article className="card">

      <Icon className="card__icon"/>
      <h3 className="heading heading--no-margin heading--color-2 heading--small">{heading}</h3>
      <p className="paragraph paragraph--no-margin paragraph--color-2">{text}</p>

    </article>
  );
}

Card.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  Icon: PropTypes.object
};

export default Card;