// Selection based on fitness
export function selection(population, fitness) {
    // Convert fitness into probabilities (e.g., based on how long the flower was hovered over)
    let totalFitness = fitness.reduce((total, f) => total + f, 0);
    
    // Normalize fitness into probabilities and select a parent based on probability
    let randomFitness = Math.random() * totalFitness;
    let runningTotal = 0;
  
    for (let i = 0; i < population.length; i++) {
      runningTotal += fitness[i];
      if (runningTotal >= randomFitness) {
        return population[i];
      }
    }
  
    return population[0]; // Default to the first flower in case of an error
}
  
export function createNewPopulation(population, fitness) {
  // Step 1: Combine the population and fitness into an array of objects
  const combined = population.map((flower, index) => ({
    flower,
    fitness: fitness[index],
  }));

  // Step 2: Sort the combined array by fitness in decreasing order
  combined.sort((a, b) => b.fitness - a.fitness);

  // Step 3: Get the top 4 flowers based on fitness
  const topFlowers = combined.slice(0, 4).map(item => item.flower);

  // Step 4: Create the new population by duplicating the top flowers
  const newPopulation = [...topFlowers, ...topFlowers]; // Duplicate top flowers

  return newPopulation; // Return the new population
}
  
  // Crossover between two parents
//   export function crossover(parentA, parentB) {
//     const childDNA1 = {};
//     const childDNA2 = {};
  
//     // Randomly combine genes from both parents for child 1
//     childDNA1.centerSize = Math.random() < 0.5 ? parentA.dna.centerSize : parentB.dna.centerSize;
  
//     childDNA1.centerColor = {
//       red: Math.random() < 0.5 ? parentA.dna.centerColor.red : parentB.dna.centerColor.red,
//       green: Math.random() < 0.5 ? parentA.dna.centerColor.green : parentB.dna.centerColor.green,
//       blue: Math.random() < 0.5 ? parentA.dna.centerColor.blue : parentB.dna.centerColor.blue,
//     };
  
//     childDNA1.petalColor = {
//       red: Math.random() < 0.5 ? parentA.dna.petalColor.red : parentB.dna.petalColor.red,
//       green: Math.random() < 0.5 ? parentA.dna.petalColor.green : parentB.dna.petalColor.green,
//       blue: Math.random() < 0.5 ? parentA.dna.petalColor.blue : parentB.dna.petalColor.blue,
//     };
  
//     childDNA1.numberOfPetals = Math.random() < 0.5 ? parentA.dna.numberOfPetals : parentB.dna.numberOfPetals;
  
//     // Randomly combine genes from both parents for child 2
//     childDNA2.centerSize = Math.random() < 0.5 ? parentA.dna.centerSize : parentB.dna.centerSize;
  
//     childDNA2.centerColor = {
//       red: Math.random() < 0.5 ? parentA.dna.centerColor.red : parentB.dna.centerColor.red,
//       green: Math.random() < 0.5 ? parentA.dna.centerColor.green : parentB.dna.centerColor.green,
//       blue: Math.random() < 0.5 ? parentA.dna.centerColor.blue : parentB.dna.centerColor.blue,
//     };
  
//     childDNA2.petalColor = {
//       red: Math.random() < 0.5 ? parentA.dna.petalColor.red : parentB.dna.petalColor.red,
//       green: Math.random() < 0.5 ? parentA.dna.petalColor.green : parentB.dna.petalColor.green,
//       blue: Math.random() < 0.5 ? parentA.dna.petalColor.blue : parentB.dna.petalColor.blue,
//     };
  
//     childDNA2.numberOfPetals = Math.random() < 0.5 ? parentA.dna.numberOfPetals : parentB.dna.numberOfPetals;
  
//     // Create and return new flowers with the combined DNA
//     return [new parentA.constructor(childDNA1), new parentA.constructor(childDNA2)];
// }
  

export function crossover(population) {
  const newPopulation = [...population]; // Create a copy of the original population
  const crossoverRate = 0.5;
  const crossoverParents = Math.floor(population.length * crossoverRate); // Calculate half of the population size

  for (let i = 0; i < crossoverParents/2; i++) {
    var parentIndexA = Math.floor(Math.random() * population.length);
    var parentIndexB;

    do {
      parentIndexB = Math.floor(Math.random() * population.length);
    } while (parentIndexA === parentIndexB); 

    const parentA = population[parentIndexA];
    const parentB = population[parentIndexB];

    // Create offspring via crossover
    const [child1, child2] = createChildren(parentA, parentB);

    // Replace parents in the new population with the children
    var parentIndexA = newPopulation.indexOf(parentA);
    var parentIndexB = newPopulation.indexOf(parentB);

    // Replace parents with children in the new population
    if (parentIndexA !== -1) newPopulation[parentIndexA] = child1; 
    if (parentIndexB !== -1) newPopulation[parentIndexB] = child2; 
  }

  return newPopulation; // Return the new population with children
}

// Helper function to create children from parents
function createChildren(parentA, parentB) {
  const childDNA1 = {};
  const childDNA2 = {};

  // Randomly combine genes from both parents for child 1
  childDNA1.centerSize = Math.random() < 0.5 ? parentA.dna.centerSize : parentB.dna.centerSize;

  childDNA1.centerColor = {
    red: Math.random() < 0.5 ? parentA.dna.centerColor.red : parentB.dna.centerColor.red,
    green: Math.random() < 0.5 ? parentA.dna.centerColor.green : parentB.dna.centerColor.green,
    blue: Math.random() < 0.5 ? parentA.dna.centerColor.blue : parentB.dna.centerColor.blue,
  };

  childDNA1.petalColor = {
    red: Math.random() < 0.5 ? parentA.dna.petalColor.red : parentB.dna.petalColor.red,
    green: Math.random() < 0.5 ? parentA.dna.petalColor.green : parentB.dna.petalColor.green,
    blue: Math.random() < 0.5 ? parentA.dna.petalColor.blue : parentB.dna.petalColor.blue,
  };

  childDNA1.numberOfPetals = Math.random() < 0.5 ? parentA.dna.numberOfPetals : parentB.dna.numberOfPetals;

  // Randomly combine genes from both parents for child 2
  childDNA2.centerSize = Math.random() < 0.5 ? parentA.dna.centerSize : parentB.dna.centerSize;

  childDNA2.centerColor = {
    red: Math.random() < 0.5 ? parentA.dna.centerColor.red : parentB.dna.centerColor.red,
    green: Math.random() < 0.5 ? parentA.dna.centerColor.green : parentB.dna.centerColor.green,
    blue: Math.random() < 0.5 ? parentA.dna.centerColor.blue : parentB.dna.centerColor.blue,
  };

  childDNA2.petalColor = {
    red: Math.random() < 0.5 ? parentA.dna.petalColor.red : parentB.dna.petalColor.red,
    green: Math.random() < 0.5 ? parentA.dna.petalColor.green : parentB.dna.petalColor.green,
    blue: Math.random() < 0.5 ? parentA.dna.petalColor.blue : parentB.dna.petalColor.blue,
  };

  childDNA2.numberOfPetals = Math.random() < 0.5 ? parentA.dna.numberOfPetals : parentB.dna.numberOfPetals;

  // Create and return new flowers with the combined DNA
  return [new parentA.constructor(childDNA1), new parentA.constructor(childDNA2)];
}

  
  
  // Mutation to introduce random changes in the child's DNA
export function mutate(population) {
    const mutationRate = 0.05;
    const mutationCount = mutationRate * population.length * 8;
    for (let i = 0; i < mutationCount; i++) {
      let randIndex = Math.floor(Math.random() * 8);
      let randGene = Math.floor(Math.random() * 8);
      let value;
      switch (randGene) {
        case 0: value = Math.random(); break;
        case 1: value = Math.floor(Math.random() * 256); break;
        case 2: value = Math.floor(Math.random() * 256); break;
        case 3: value = Math.floor(Math.random() * 256); break;
        case 4: value = Math.floor(Math.random() * 256); break;
        case 5: value = Math.floor(Math.random() * 256); break;
        case 6: value = Math.floor(Math.random() * 256); break;
        case 7: value = Math.floor(Math.random() * 8); break;
      }
      population[randIndex][randGene] = value;

  }
  return population;
  }
  