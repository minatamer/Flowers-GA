import React, { useState } from 'react';
import FlowerComponent from './components/FlowerComponent';
import { initializePopulation, evolvePopulation } from './utils/population';

function App() {
  const [population, setPopulation] = useState(initializePopulation()); // Initialize population
  const [fitness, setFitness] = useState(new Array(8).fill(0)); // Fitness for each flower
  const [generation, setGeneration] = useState(0);
  // Handle hover end for a specific flower to update its fitness
  const handleHoverEnd = (index, hoverTime) => {
    const newFitness = [...fitness];
    newFitness[index] += 1; // Increase fitness by hover time
    setFitness(newFitness);
  };

  // Trigger evolution for the next generation
  const handleNextGeneration = () => {
    const newPopulation = evolvePopulation(population, fitness); // Evolve the population based on fitness
    setPopulation(newPopulation); // Update population
    setFitness(new Array(8).fill(0));// Reset fitness for the new generation
    setGeneration(prevGeneration => prevGeneration + 1);
  };

  return (
    <div className="App">
      <h1 style={{ marginBottom: '100px' }}>Flower Evolution</h1>
      <div className="flower-container">
        {population.map((flower, index) => (
          <FlowerComponent
            key={index}
            flower={flower}
            fitness={fitness[index]}
            onHoverEnd={(hoverTime) => handleHoverEnd(index, hoverTime)} // Track hover time for fitness
          />
        ))}
      </div>
      <button onClick={handleNextGeneration}>Evolve to Next Generation</button>
      <h5>Generation: { generation}</h5>
    </div>
  );
}

export default App;
