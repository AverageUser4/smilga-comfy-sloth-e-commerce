import React from 'react';
import CurrentPath from '../../components/CurrentPath/CurrentPath.js';
import StandaloneSection from '../../components/StandaloneSection/StandaloneSection.js';
import furniture from '../../assets/furniture.jpeg';
import css from './temporary.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';

function About() {
  useDocumentTitle('About Us');

  return (
    <>
      
      <CurrentPath/>

      <StandaloneSection>
        <article className={css['block-and-image']}>
          <img className={css['block-and-image__image']} src={furniture} alt="Example of our amazing furniture."/>
          <div>
            <h1 className="heading heading--underline heading--underline-alt heading--no-margin">Our Story</h1>
            <p className="paragraph paragraph--width-cap">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi, omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore, obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum, nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex, voluptate accusamus nesciunt totam vitae esse iste.</p>
          </div>
        </article>
      </StandaloneSection>
      
    </>
  );
}

export default About;