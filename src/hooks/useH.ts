import { useState, useEffect } from 'react';

const useElementHeightByClassName = (className:string) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = document.querySelector(`.${className}`);

    if (element) {
      const updateHeight = () => {
        setHeight(element.getBoundingClientRect().height);
      };

      // Set initial height
      updateHeight();

      // Update on window resize
      window.addEventListener('resize', updateHeight);

      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }
  }, [className]);

  return height;
};

export default useElementHeightByClassName;