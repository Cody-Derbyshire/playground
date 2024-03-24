'use client';

import React, { useRef, useEffect } from 'react';
import styles from '../app/page.module.css';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function Footer() {
  const container = useRef();
  const paths = useRef([]);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    scrollYProgress.on('change', (e) => {
      paths.current.forEach((path, i) => {
        path.setAttribute('startOffset', -40 + i * 40 + e * 40 + '%');
      });
    });
  }, []);

  return (
    <div ref={container}>
      <svg className={styles.svgPath} viewBox='0 0 250 90'>
        <path
          fill='none'
          id='curve'
          /* stroke='black' */
          /* d='m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68' */
          d='M0.3,47.7C37.2,19,60.7,17.3,75.8,22.2c30.1,9.7,34.1,47.5,70.4,53.4c1.4,0.2,29.4,4.3,44.5-13.1
	c5.9-6.9,13.5-21.3,6.6-31.3c-6.6-9.6-23.8-11.1-33.6-2.7c-8.8,7.5-8.5,20.3-5.8,28.2c5,14.6,21.1,20,27.1,22
	c23.4,7.9,48-2.7,64.9-13.2'
        />
        <text className={styles.svgText} style={{ fill: 'black' }}>
          {[...Array(7)].map((_, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => (paths.current[i] = ref)}
                startOffset={i * 40 + '%'}
                href='#curve'
              >
                cody is an interactive digital designer
              </textPath>
            );
          })}
        </text>
      </svg>
      <Logos scrollProgress={scrollYProgress} />
    </div>
  );
}

const Logos = ({ scrollProgress }) => {
  const y = useTransform(scrollProgress, [0, 1], [-225, 0]);

  const footerMenuArray = ['About', 'Projects', 'Design', 'Contact', 'Gallery'];

  return (
    <div className={styles.footerDiv}>
      <motion.div style={{ y }} className={styles.motionFooterDiv}>
        {footerMenuArray.map((word, index) => {
          return (
            <div key={index}>
              <p className={styles.footerWords}>{word}</p>
            </div>
          );
        })}
        {/* {[...Array(5)].map((_, i) => {
          return (
            <img
              key={`img_${i}`}
              className={styles.footerImgs}
              src={`/images/${i + 1}.png`}
            />
          );
        })} */}
      </motion.div>
    </div>
  );
};
