'use client';

import styles from './page.module.css';
import Footer from '@/components/Footer';
import PopMenu from '@/components/PopMenu';
import Lenis from '@studio-freight/lenis';

import { useRef, useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  let refs = [];

  let currentIndex = 0;

  let steps = 0;

  let nbOfImages = 0;

  /* let maxNumberOfImages = 8; */

  const manageMouseMove = (e) => {
    const { clientX, clientY, movementX, movementY } = e;

    steps += Math.abs(movementX) + Math.abs(movementY);

    if (steps >= currentIndex * 150) {
      moveImage(clientX, clientY);
    }

    /* if (nbOfImages == maxNumberOfImages) {
      removeImage();
    } */

    if (currentIndex == refs.length) {
      currentIndex = 0;

      steps = -150;
    }
  };

  /* const removeImage = () => {
    const images = getCurrentImages();

    images[0].style.display = 'none';

    nbOfImages--;
  }; */

  const setZIndex = () => {
    const images = getCurrentImages();

    for (let i = 0; i < images.length; i++) {
      images[i].style.zIndex = i;
    }
  };

  const moveImage = (x, y) => {
    const currentImage = refs[currentIndex].current;

    currentImage.style.left = x + 'px';

    currentImage.style.top = y + 'px';

    currentImage.style.display = 'block';

    currentIndex++;

    nbOfImages++;

    setZIndex();
  };

  /* const getCurrentImages = () => {
    let images = [];

    let indexOfFirst = currentIndex - nbOfImages;

    for (let i = indexOfFirst; i < currentIndex; i++) {
      let targetIndex = i;

      if (targetIndex < 0) targetIndex += refs.length;

      images.push(refs[targetIndex].current);
    }

    return images;
  }; */

  const getCurrentImages = () => {
    let images = [];

    let indexOfFirst = currentIndex - nbOfImages;

    for (let i = indexOfFirst; i < currentIndex; i++) {
      let targetIndex = i;

      // Ensure targetIndex is within the valid range of indices
      while (targetIndex < 0) {
        targetIndex += refs.length;
      }

      targetIndex %= refs.length; // Ensure targetIndex wraps around if it exceeds array length

      // Check if refs[targetIndex] is defined before accessing its current property
      if (refs[targetIndex]) {
        images.push(refs[targetIndex].current);
      }
    }

    return images;
  };

  return (
    <>
      <div
        onMouseMove={(e) => {
          manageMouseMove(e);
        }}
        className={styles.hvrImg}
      >
        <h1 className={styles.h1bgtext}>mouse hover image trail</h1>
        {[...Array(6).keys()].map((_, index) => {
          const ref = useRef(null);

          refs.push(ref);

          return <img key={index} ref={ref} src={`/images/${index}.png`}></img>;
        })}
      </div>
      <div className={styles.div}>
        <div className={styles.motionPathDiv}>
          <h1 className={styles.h1bgtext}>sticky footer</h1>
        </div>
        <Footer />
      </div>
      <div className={styles.div}>
        <h1 className={styles.h1bgtext}>image pop menu</h1>
        <div className={styles.menuContainer}>
          <PopMenu />
        </div>
      </div>
    </>
  );
}
