import React from 'react';

import manWorking from '../../assets/man-working.jpeg';
import furniture from '../../assets/furniture.jpeg';

import FancyPics from '../../components/FancyPics/FancyPics.js';

function Home() {
  return (
    <main>

      <article>

        <div>
          <h2>Design your comfort zone</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
          <a href="#">Shop now</a>
        </div>

        <FancyPics
          smallImage={{ src: manWorking, alt: 'Our professional, seasoned and well-paid employee working on our high quality products.' }}
          bigImage={{ src: furniture, alt: 'Our mind-blowing furniture.' }}
        />

      </article>
      
    </main>
  );
}

export default Home;