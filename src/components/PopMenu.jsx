'use client';

import React, { useRef, useEffect } from 'react';
import styles from '../app/page.module.css';
import Project from './Project';

const PopMenu = () => {
  const projects = [
    {
      title1: 'Black',
      title2: 'Garlic',
      src: '0.png',
    },
    {
      title1: "Devil's",
      title2: 'Draught',
      src: '2.png',
    },
    {
      title1: 'Green',
      title2: 'Grove',
      src: '5.png',
    },
  ];

  return (
    <>
      {projects.map((project, index) => {
        return <Project key={index} project={project} />;
      })}
    </>
  );
};

export default PopMenu;
