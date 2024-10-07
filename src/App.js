import React, { useEffect, useState, useRef } from 'react';
import './styles/Flower.css';
import Flower from './components/Flower';

function App() {
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState([]);
  const flowerRefs = useRef(Array(8).fill().map(() => React.createRef()));

  const initializePopulation = () => {
    const newPopulation = Array.from({ length: 8 }, () => ({
      petalCount: Math.floor(Math.random() * 7) + 1, 
      centerSize: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
      centerColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
      petalColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
    }));
    setPopulation(newPopulation);
  };

  useEffect(() => {
    initializePopulation();
  }, []);


  const SelectedIndividualsBasedOnFitnessValues = () => {
    const fitnessValuesWithRefs = flowerRefs.current.map((ref) => ({
      ref: ref,
      fitness: ref.current ? ref.current.getFitness() : 0,
    }));

    fitnessValuesWithRefs.sort((a, b) => b.fitness - a.fitness);
    const sortedRefs = fitnessValuesWithRefs.map(item => item.ref);
    const halfLength = Math.ceil(sortedRefs.length / 2);
    const firstHalf = sortedRefs.slice(0, halfLength);

    const duplicatedRefs = [];
    for (let i = 0; i < sortedRefs.length; i++) {
      duplicatedRefs.push(firstHalf[i % halfLength]);
    }
    let resultedFromElitism = Array.from({ length: population.length }, () => []);
    
    for (let i = 0; i < resultedFromElitism.length; i++) {
      let ref = duplicatedRefs[i].current; 
      let regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
      let center = ref.getCenterColor().match(regex);
      let petals = ref.getPetalColor().match(regex);
      for (let j = 0; j < 8; j++) {
        switch (j) {
          case 0:
            resultedFromElitism[i][j] = ref.getCenterSize();
            break;
          case 1:
            resultedFromElitism[i][j] = parseInt(center[1], 10);
            break;
          case 2:
            resultedFromElitism[i][j] = parseInt(center[2], 10);
            break;
          case 3:
            resultedFromElitism[i][j] = parseInt(center[3], 10);
            break;
          case 4:
            resultedFromElitism[i][j] = parseInt(petals[1], 10);
            break;
          case 5:
            resultedFromElitism[i][j] = parseInt(petals[2], 10);
            break;
          case 6:
            resultedFromElitism[i][j] = parseInt(petals[3], 10);
            break;
          case 7:
            resultedFromElitism[i][j] = ref.getPetalCount();
            break;
          default:
            break;
        }
      }
    }
    
   return resultedFromElitism
     

  };
  function createChildren(parentA, parentB) {
    let child1 = [];
    let child2 = [];
  
    const crossoverPoint = Math.floor(Math.random() * parentA.length);
   

    for (let i = 0; i < crossoverPoint; i++) {
      child1.push(parentA[i]);
      child2.push(parentB[i]);
    }
    
    for (let i = crossoverPoint; i < parentA.length; i++) {
      child1.push(parentB[i]);
      child2.push(parentA[i]);
    }
  

    return [child1, child2];
  }
    const mutate = (selectedIndividuals) => {

    const mutationRate = 0.05;
    const mutationCount = mutationRate * population.length * 8;
    let mutatedIndividuals = selectedIndividuals.map((individual) => [...individual]); 

    for (let i = 0; i < mutationCount; i++) {
      let randIndex = Math.floor(Math.random() * population.length);
      let randGene = Math.floor(Math.random() * 8);
      let value;
      switch (randGene) {
        case 0:
          value = Math.floor(Math.random() * (50 - 20 + 1) + 20);
          break;
        case 1:
          value = Math.floor(Math.random() * 256);
          break;
        case 2:
          value = Math.floor(Math.random() * 256);
          break;
        case 3:
          value = Math.floor(Math.random() * 256);
          break;
        case 4:
          value = Math.floor(Math.random() * 256);
          break;
        case 5:
          value = Math.floor(Math.random() * 256);
          break;
        case 6:
          value = Math.floor(Math.random() * 256);
          break;
        case 7:
          value = Math.floor(Math.random() * 8);
          break;
      }
      
      mutatedIndividuals[randIndex][randGene] = value;

    }
    return mutatedIndividuals
  };

  const crossOver = (selectedIndividuals) => {
  
    const crossoverRate = 0.5;
    const crossoverParents = Math.floor(selectedIndividuals.length * crossoverRate);
    let result = [];
  
    for (let i = 0; i < crossoverParents / 2; i++) {
      const parentIndexA = Math.floor(Math.random() * selectedIndividuals.length);
      const parentIndexB = Math.floor(Math.random() * selectedIndividuals.length);
  
      const parentA = selectedIndividuals[parentIndexA];
      const parentB = selectedIndividuals[parentIndexB];
  
      const [child1, child2] = createChildren(parentA, parentB);
  
      result.push(child1);
      result.push(child2);
    }
  
    while (result.length < selectedIndividuals.length) {
      const index = Math.floor(Math.random() * selectedIndividuals.length);
      result.push(selectedIndividuals[index]);
    }

    return result;
  };
  
  const evolve = () => {
    let selected=SelectedIndividualsBasedOnFitnessValues()
    let crossoverPopulation = crossOver(selected);
    let mutatedPopulation = mutate(crossoverPopulation);

    const newPopulation = population.map((flower, index) => {
      const newPetalCount = mutatedPopulation[index][7]; 
      const newCenterSize = mutatedPopulation[index][0];
      const newCenterColor = `rgb(${mutatedPopulation[index][1]}, ${mutatedPopulation[index][2]}, ${mutatedPopulation[index][3]})`;
      const newPetalColor = `rgb(${mutatedPopulation[index][4]}, ${mutatedPopulation[index][5]}, ${mutatedPopulation[index][6]})`;
      
      updateFlower(index, newPetalCount, newCenterSize, newCenterColor, newPetalColor);
      
      return {
        petalCount: newPetalCount,
        centerSize: newCenterSize,
        centerColor: newCenterColor,
        petalColor: newPetalColor,
      };
    });
    
    setPopulation(newPopulation);
    flowerRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.updateFitness(0);
      }
    });
    setGeneration(prev => prev + 1);
  };

  const updateFlower = (index, petalCount, centerSize, centerColor, petalColor) => {
    if (flowerRefs.current[index]?.current) {
      flowerRefs.current[index].current.updatePetalCount(petalCount);
      flowerRefs.current[index].current.updateCenterSize(centerSize);
      flowerRefs.current[index].current.updateCenterColor(centerColor);
      flowerRefs.current[index].current.updatePetalColor(petalColor);
    }
  };

  return (
    <div className="App">
      <div className="flower-container">
        {population.map((flower, index) => (
          <div key={index} className="flower-frame">
            <Flower
              ref={flowerRefs.current[index]}
              petalCount={flower.petalCount}
              centerSize={flower.centerSize}
              centerColor={flower.centerColor}
              petalColor={flower.petalColor}
            />
          </div>
        ))}
      </div>
      <div style={{ position: 'relative', top: '80px' }}>
        <button
          onClick={evolve}
          style={{
            backgroundColor: '#4caf50',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            cursor: 'pointer',
            margin: '0',
          }}
        >
          {"evolve generation"}
        </button>
      </div>
      <p style={{fontWeight: 'bold', textAlign: 'left', margin: '0', width: '90%' }}>
        Generation : {generation}
      </p>
    </div>
  );
}

export default App;
