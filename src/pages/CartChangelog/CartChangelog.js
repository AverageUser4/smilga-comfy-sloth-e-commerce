import React from 'react';
import { Link } from 'react-router-dom';
import CurrentPath from '../../components/CurrentPath/CurrentPath';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection';
import { useCartContext } from '../../utils/CartContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function CartChangelog() {
  const { mergeNotificationData } = useCartContext();
  useDocumentTitle('Cart Changelog');

  return (
    <div>

      <CurrentPath lastPathName="Cart Changelog"/>

      <StandaloneSection>
        {
          mergeNotificationData.data?.length ?
              <ul className="list">
                {mergeNotificationData.data}
              </ul>
          :
            <>
              <h1 className="heading heading--only-bottom-margin heading--medium">Nothing to see here...</h1>
              <Link to="/" className="button button--uppercase">Homepage</Link>
            </>
        }
      </StandaloneSection>

    </div>
  );
}

export default CartChangelog;