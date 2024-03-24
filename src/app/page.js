'use client';

import styles from './page.module.css';
import Lenis from '@studio-freight/lenis';
import Footer from '@/components/Footer';
import PopMenu from '@/components/PopMenu';
import MouseTrail from '@/components/MouseTrail';

import { useRef, useEffect, useState } from 'react';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <MouseTrail />
      <div className={styles.div}>
        <h1 className={styles.h1bgtext}>image pop menu</h1>
        <div className={styles.menuContainer}>
          <PopMenu />
        </div>
      </div>
      <div className={styles.div}>
        <div className={styles.motionPathDiv}>
          <h1 className={styles.h1bgtext}>
            sticky footer + text path on scroll
          </h1>
        </div>
        <Footer />
      </div>
    </>
  );
}
