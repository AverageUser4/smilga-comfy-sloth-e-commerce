import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import furniture from '../../assets/furniture.jpeg';
import furnitureSmall from '../../assets/furniture-small.jpeg';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';

function About() {
  useDocumentTitle('About Us');

  return (
    <div>
      
      <CurrentPath/>

      <StandaloneSection>
        <article className={'block-and-image'}>
          <picture className={'block-and-image__image'}>
            <source srcSet={furnitureSmall} media="(max-width: 520px)"/>
            <img height="440" style={{ objectPosition: 'center bottom' }} className={'block-and-image__image'} src={furniture} alt="Example of our amazing furniture."/>
          </picture>
          <div>
            <h1 className="heading heading--underline heading--underline-alt heading--no-margin">Our Story</h1>
            <p className="paragraph paragraph--width-cap">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.</p>
          </div>
        </article>
      </StandaloneSection>
      
    </div>
  );
}

export default About;