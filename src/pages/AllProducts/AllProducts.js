import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import ProductsFilterForm from '../../components/ProductsFilterForm/ProductsFilterForm.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import Grid from '../../components/Grid/Grid.js';
import Product from '../../components/Product/Product.js';
import Siblings from '../../components/Siblings/Siblings.js';

// using fieldsets instead of sections makes more sense

function AllProducts() {
  return (
    <>
      <CurrentPath/>

      <StandaloneSection>

        <Siblings>

          <ProductsFilterForm/>

          <Grid>
          <Product
                name="sofa"
                price={123}
                image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
              />            <Product
              name="sofa"
              price={123}
              image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
            />            <Product
            name="sofa"
            price={123}
            image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
          />            <Product
                name="sofa"
                price={123}
                image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
              />            <Product
              name="sofa"
              price={123}
              image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
            />            <Product
            name="sofa"
            price={123}
            image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
          />            <Product
          name="sofa"
          price={123}
          image="https://cdn.wamiz.fr/cdn-cgi/image/format=auto,quality=80,width=400,height=400,fit=cover/animal/breed/pictures/613f5a1a89c13770998047.jpg"
        />
          </Grid>
            

        </Siblings>
      </StandaloneSection>
    </>
  );
}

export default AllProducts;