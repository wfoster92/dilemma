import { useState, useEffect } from 'react';



function useWindowDimensions() {

  // function getWindowDimensions() {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height
  //   };
  // }

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    const minSide = (width > height) ? height : width;
    const maxSide = (minSide === width) ? height : width;
    return {
      minSide,
      maxSide
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // useEffect(() => {
  //   function handleResize() {
  //     setWindowDimensions(getWindowDimensions());
  //   }

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return windowDimensions;
}


export default useWindowDimensions;
