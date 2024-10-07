import React, { useState, forwardRef, useImperativeHandle } from "react"; 

const Flower = forwardRef(({ petalCount, centerSize, centerColor, petalColor }, ref) => {
  const [currentPetalCount, setCurrentPetalCount] = useState(petalCount);
  const [currentCenterSize, setCurrentCenterSize] = useState(centerSize);
  const [currentPetalColor, setCurrentPetalColor] = useState(petalColor);
  const [currentCenterColor, setCurrentCenterColor] = useState(centerColor);
  const [fitness, setFitness] = useState(0); 
  const [timerId, setTimerId] = useState(null);

  useImperativeHandle(ref, () => ({
    getFitness(){
      return fitness;
    },
    getCenterColor() {
      return centerColor;
    },
    getCenterSize() {
      return centerSize;
    },
    getPetalCount() {
      return petalCount;
    },
    getPetalColor() {
      return petalColor;
    },
    updateFitness(newFitness){
      setFitness(newFitness);
    },
    updatePetalColor(color) {
      setCurrentPetalColor(color);
    },
    updateCenterColor(color) {
      setCurrentCenterColor(color);
    },
    updateCenterSize(size) {
      setCurrentCenterSize(size);
    },
    updatePetalCount(count) {
      setCurrentPetalCount(count);
    },
  }));

  const petals = Array.from({ length: currentPetalCount }, (_, index) => {
    const angle = (index / currentPetalCount) * (2 * Math.PI);
    const radius = (currentCenterSize / 2) + 20;
    const x = radius * Math.cos(angle); 
    const y = radius * Math.sin(angle); 

    return (
      <div
        key={index}
        className="petal"
        style={{
          position: 'absolute',
          width: '70px', 
          height: '70px', 
          backgroundColor: currentPetalColor,
          borderRadius: '50%',
          left: '50%',
          top: '50%', 
          transform: `translate(calc(${x}px - 35px), calc(${y}px - 35px))`,
        }}
      ></div>
    );
  });

  const CursorStillOnTheFlower = () => {
    const id = setInterval(() => {
      setFitness(prevCount => prevCount + 1);
    }, 120); 
    
    setTimerId(id); 
  };

  const CursorNotOnTheFlower = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null); 
    }
  };

  return (
    <div
      className="flower"
      style={{ position: 'relative', width: '150px', height: '200px' }}
      onMouseEnter={CursorStillOnTheFlower} 
      onMouseLeave={CursorNotOnTheFlower} 
    >
      <div
        className="flower-center"
        style={{
          width: `${currentCenterSize}px`, 
          height: `${currentCenterSize}px`,
          backgroundColor: currentCenterColor,
        }}
      ></div>
      {petals}
      <div
        className="flower-stem"
        style={{
          position: 'absolute',
          bottom: `-45px`, 
          width: '10px',
          height: '150px',
          backgroundColor: 'green',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      ></div>
      <div style={{ textAlign: 'center', marginTop: '280px' }}>{fitness}</div> 
    </div>
  );
});

export default Flower;
