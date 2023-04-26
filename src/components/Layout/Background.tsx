import { useEffect, useState } from 'react';
import { randomInRange } from '../../utils/math';
import { useWindowDimensions } from '../../hooks/useDimensions';

import styles from './Background.module.scss';

interface Triangle {
  index: string;
  top: string;
  left: string;
  class: string;
}

const Background = () => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [triangles, setTriangles] = useState<Triangle[]>([]);

  useEffect(() => {
    const tempTriangles: Triangle[] = [];

    for (let index = 0; index < 100; index++) {
      const top = randomInRange(0, windowHeight);
      const left = randomInRange(0, windowWidth);

      let className: string = '';
      const randomNo: number = randomInRange(0, 3);
      switch (randomNo) {
        case 0:
          className = 'triangle-primary';
          break;
        case 1:
          className = 'triangle-primary-reverse';
          break;
        case 2:
          className = 'triangle-secondary';
          break;
        case 3:
          className = 'triangle-secondary-reverse';
          break;
        default:
          break;
      }

      tempTriangles.push({
        index: `${index}${top}${left}${randomInRange(0, 99999)}`,
        top: `${top}px`,
        left: `${left}px`,
        class: className,
      });
    }

    setTriangles(tempTriangles);
  }, [windowWidth, windowHeight]);
  
  return (
    <>
      {triangles.map((triangle) => (
        <div
          className={styles[triangle.class]}
          key={triangle.index}
          style={{ top: triangle.top, left: triangle.left }}
        />
      ))}
    </>
  );
};

export default Background;
