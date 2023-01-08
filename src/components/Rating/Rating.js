import React from 'react';
import PropTypes from 'prop-types';
import css from './Rating.module.css';
import { ReactComponent as StarEmpty } from '../../assets/star-empty.svg';
import { ReactComponent as StarFull } from '../../assets/star-full.svg';
import { ReactComponent as StarHalf } from '../../assets/star-half.svg';

function Rating({ amount, outOf }) {
  const rating = (amount / outOf * 5).toFixed(2);
  const ratingString = `${rating} starts out of 5`;
  let stars = rating;
  const starElements = [];

  for(let i = 0; i < 5; i++) {
    if(stars >= 1)
      starElements.push(<StarFull key={i}/>)
    else if(stars >= 0.5)
      starElements.push(<StarHalf key={i}/>)
    else
      starElements.push(<StarEmpty key={i}/>)

    stars--;
  }

  return (
    <div className={css['container']} title={ratingString} aria-description={ratingString}>
      {starElements}
    </div>
  );
}

Rating.propTypes = {
  amount: PropTypes.number.isRequired,
  outOf: PropTypes.number.isRequired,
};

export default Rating;