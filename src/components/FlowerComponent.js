import React, { useEffect, useState } from 'react';

function FlowerComponent({ flower, fitness, onHoverEnd }) {
  const centerColor = `rgb(${flower.dna.centerColor.red},${flower.dna.centerColor.green},${flower.dna.centerColor.blue})`;
  const petalColor = `rgb(${flower.dna.petalColor.red},${flower.dna.petalColor.green},${flower.dna.petalColor.blue})`;
  const petalCount = flower.dna.numberOfPetals;

  // State to track hover time and hovering status
  const [hoverTime, setHoverTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let timer;

    // Start a timer when hovering starts
    if (isHovering) {
      timer = setInterval(() => {
        setHoverTime((prev) => prev + 1); // Increase hoverTime by 1 every second
      }, 0); // Set the interval to 1000ms (1 second)
    }

    // Clean up the timer on unmount or when hovering stops
    return () => {
      clearInterval(timer);
      if (hoverTime > 0) {
        onHoverEnd(hoverTime); // Update fitness when hover ends
      }
    };
  }, [isHovering, hoverTime, onHoverEnd]);

  const handleMouseEnter = () => {
    setIsHovering(true); // Start hovering
    setHoverTime(0); // Reset hover time
  };

  const handleMouseLeave = () => {
    setIsHovering(false); // Stop hovering
    if (hoverTime > 0) {
      onHoverEnd(hoverTime); // Update fitness when hover ends
    }
    setHoverTime(0); // Reset hover time when mouse leaves
  };

  // Style for the flower container with a transparent background and a border
  const flowerContainerStyle = {
    backgroundColor: 'transparent', // Transparent background
    border: '2px solid black', // Black border
    borderRadius: '10px', // Rounded corners for the box
    display: 'inline-block', // Inline block to keep flowers next to each other
    position: 'relative', // Position relative for absolute positioning of children
    padding: '80px', // Padding around the flower
    margin: '10px',
  };

  // Style for the flower itself
  const flowerStyle = {
    position: 'relative',
    display: 'inline-block',
    margin: '0', // Remove margin since we have padding in the container
    width: '150px', // Overall width of the flower
    height: '150px', // Overall height of the flower
  };

  // Style for the center of the flower
  const centerStyle = {
    width: `${flower.dna.centerSize * 50 + 50}px`,
    height: `${flower.dna.centerSize * 50 + 50}px`,
    backgroundColor: centerColor,
    borderRadius: '50%',
    position: 'absolute',
    top: '20%',
    left: '50%',
    zIndex: 100, // Set zIndex as a number
    transform: 'translate(-50%, -50%)', // Center the circle
  };
  
  // Create petals
  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * 2 * Math.PI; // Angle for the petal
    const petalStyle = {
      width: '30px', // Width of each petal
      height: '80px', // Height of each petal
      backgroundColor: petalColor,
      borderRadius: '15px', // Rounded edges for petal shape
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -100%) rotate(${angle}rad) translateY(-60px)`, // Rotate and position petal
    };
    petals.push(<div key={i} style={petalStyle} />);
  }

  // Style for the root (stick) of the flower
  const rootStyle = {
    width: '10px', // Width of the stick
    height: '100px', // Height of the stick
    backgroundColor: 'brown', // Color for the stick
    position: 'absolute',
    bottom: '80px', // Position below the flower
    left: '50%',
    transform: 'translateX(-50%)', // Center the stick under the flower
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
      <div style={rootStyle}></div> {/* Add the root (stick) below the flower */}
    </div>
  );
}

export default FlowerComponent;
