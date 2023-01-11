import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import css from './CurrentPath.module.css';

function CurrentPath({ lastPathName }) {
  const { path } = useRouteMatch();

  const paths = path.split('/').filter(isTruthy => isTruthy);
  if(lastPathName)
    paths[paths.length - 1] = lastPathName;

  const pathElements = [<Fragment key="a"><Link to="/" className={css['link']}>home</Link> / </Fragment>];

  for(let i = 0; i < paths.length; i++) {
    if(i < paths.length - 1) {
      pathElements.push(
        <Fragment key={i}>
          <Link to={`/${paths[i]}`} className={css['link']}>{paths[i]}</Link> /
        </Fragment>
      );
    } else {
      pathElements.push(
        <span key={i}>{paths[i]}</span>
      );
    }
  }
  
  return (
    <div className={css['background']}>
      <div data-testid="paths-container" className={css['container']}>
        {pathElements}
      </div>
    </div>
  );
}

CurrentPath.propTypes = {
  lastPathName: PropTypes.string
};

export default CurrentPath;