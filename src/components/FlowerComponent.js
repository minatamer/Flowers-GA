import React, { useEffect, useState } from 'react';

function FlowerComponent({ flower, fitness, onHoverEnd }) {
  const centerColor = `rgb(${flower.dna.centerColor.red},${flower.dna.centerColor.green},${flower.dna.centerColor.blue})`;
  const petalColor = `rgb(${flower.dna.petalColor.red},${flower.dna.petalColor.green},${flower.dna.petalColor.blue})`;
  const petalCount = flower.dna.numberOfPetals;
  const [hoverTime, setHoverTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let timer;


    if (isHovering) {
      timer = setInterval(() => {
        setHoverTime((prev) => prev + 1);
      }, 0);
    }

    return () => {
      clearInterval(timer);
      if (hoverTime > 0) {
        onHoverEnd(hoverTime); 
      }
    };
  }, [isHovering, hoverTime, onHoverEnd]);

  const handleMouseEnter = () => {
    setIsHovering(true); 
    setHoverTime(0);
  };

  const handleMouseLeave = () => {
    setIsHovering(false); 
    if (hoverTime > 0) {
      onHoverEnd(hoverTime); 
    }
    setHoverTime(0); 
  };

  const flowerContainerStyle = {
    backgroundColor: 'transparent', 
    border: '2px solid black', 
    borderRadius: '10px', 
    display: 'inline-block', 
    position: 'relative', 
    padding: '80px', 
    margin: '10px',
  };

  const flowerStyle = {
    position: 'relative',
    display: 'inline-block',
    margin: '0', 
    width: '150px', 
    height: '150px', 
  };


  const centerStyle = {
    width: `${flower.dna.centerSize * 50 + 50}px`,
    height: `${flower.dna.centerSize * 50 + 50}px`,
    backgroundColor: centerColor,
    borderRadius: '50%',
    position: 'absolute',
    top: '20%',
    left: '50%',
    zIndex: 100,
    transform: 'translate(-50%, -50%)', 
  };
  
  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * 2 * Math.PI; 
    const petalStyle = {
      width: '30px', 
      height: '80px', 
      backgroundColor: petalColor,
      borderRadius: '15px', 
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -100%) rotate(${angle}rad) translateY(-60px)`, 
    };
    petals.push(<div key={i} style={petalStyle} />);
  }

  const rootStyle = {
    width: '10px', 
    height: '100px', 
    backgroundColor: 'brown', 
    position: 'absolute',
    bottom: '80px', 
    left: '50%',
    transform: 'translateX(-50%)', 
    zIndex: -10,
  };

  return (
    <div style={flowerContainerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flower" style={flowerStyle}>
        <div style={centerStyle}></div>
        {petals}
        <div style={{ position: 'absolute', top: '120%', left: '50%', transform: 'translateX(-50%)', color: '#000' }}>
          Fitness: {fitness}
        </div>
      </div>
      <div style={rootStyle}></div> 
    </div>
  );
}

export default FlowerComponent;
