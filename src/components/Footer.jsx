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
          d='m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68'
        />
        <text className={styles.svgText} style={{ fill: 'red' }}>
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => (paths.current[i] = ref)}
                startOffset={i * 40 + '%'}
                href='#curve'
              >
                cody derbyshire is a web dev + designer
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

  /* const  */

  return (
    <div className={styles.footerDiv}>
      <motion.div style={{ y }} className={styles.motionFooterDiv}>
        {[...Array(5)].map((_, i) => {
          return (
            <img
              key={`img_${i}`}
              className={styles.footerImgs}
              src={`/images/${i + 1}.png`}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
