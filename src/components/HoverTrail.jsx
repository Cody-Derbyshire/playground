'use client';

import React, { useRef, useEffect } from 'react';
import styles from '../app/page.module.css';

const HoverTrail = () => {
  const refs = useRef([]);
  let currentIndex = 0;
  let steps = 0;
  let nbOfImages = 0;

  const manageTouchMove = (e) => {
    const { touches } = e;
    const touch = touches[0]; // Assuming only one touch for simplicity
    const { clientX, clientY } = touch;

    steps +=
      Math.abs(touch.clientX - touch.pageX) +
      Math.abs(touch.clientY - touch.pageY);

    if (steps >= currentIndex * 150) {
      moveImage(clientX, clientY);
    }

    if (currentIndex === refs.current.length) {
      currentIndex = 0;
      steps = -150;
    }
  };

  const setZIndex = () => {
    const images = getCurrentImages();

    images.forEach((image, index) => {
      image.style.zIndex = index;
    });
  };

  const moveImage = (x, y) => {
    const currentImage = refs.current[currentIndex];

    currentImage.style.left = x + 'px';
    currentImage.style.top = y + 'px';
    currentImage.style.display = 'block';

    currentIndex++;
    nbOfImages++;
    setZIndex();
  };

  const getCurrentImages = () => {
    let images = [];
    let indexOfFirst = currentIndex - nbOfImages;

    for (let i = indexOfFirst; i < currentIndex; i++) {
      let targetIndex = i;
      while (targetIndex < 0) {
        targetIndex += refs.current.length;
      }

      targetIndex %= refs.current.length;

      if (refs.current[targetIndex]) {
        images.push(refs.current[targetIndex]);
      }
    }

    return images;
  };

  useEffect(() => {
    const container = document.getElementById('touchContainer');
    container.addEventListener('touchmove', manageTouchMove);
    return () => {
      container.removeEventListener('touchmove', manageTouchMove);
    };
  }, []);

  return (
    <div id='touchContainer' className={styles.hvrImg}>
      <h1 className={styles.h1bgtext}>touch trail</h1>
      {[...Array(15).keys()].map((index) => {
        const ref = useRef(null);
        refs.current[index] = ref.current;
        return (
          <img
            className={styles.nameImg}
            key={index}
            ref={ref}
            src={`/images/name/${index}.png`}
          ></img>
        );
      })}
    </div>
  );
};

export default HoverTrail;
