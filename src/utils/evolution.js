export function selection(population, fitness) {
    let totalFitness = fitness.reduce((total, f) => total + f, 0);
    let randomFitness = Math.random() * totalFitness;
    let runningTotal = 0;
  
    for (let i = 0; i < population.length; i++) {
      runningTotal += fitness[i];
      if (runningTotal >= randomFitness) {
        return population[i];
      }
    }
  
    return population[0]; 
}
  
export function createNewPopulation(population, fitness) {
  const combined = population.map((flower, index) => ({
    flower,
    fitness: fitness[index],
  }));
  combined.sort((a, b) => b.fitness - a.fitness);
  const topFlowers = combined.slice(0, 4).map(item => item.flower);
  const newPopulation = [...topFlowers, ...topFlowers]; 
  return newPopulation; 
}


export function crossover(population) {
  const newPopulation = [...population]; 
  const crossoverRate = 0.5;
  const crossoverParents = Math.floor(population.length * crossoverRate); 

  for (let i = 0; i < crossoverParents/2; i++) {
    var parentIndexA = Math.floor(Math.random() * population.length);
    var parentIndexB;

    do {
      parentIndexB = Math.floor(Math.random() * population.length);
    } while (parentIndexA === parentIndexB); 

    const parentA = population[parentIndexA];
    const parentB = population[parentIndexB];
    const [child1, child2] = createChildren(parentA, parentB);
    var parentIndexA = newPopulation.indexOf(parentA);
    var parentIndexB = newPopulation.indexOf(parentB);

    if (parentIndexA !== -1) newPopulation[parentIndexA] = child1; 
    if (parentIndexB !== -1) newPopulation[parentIndexB] = child2; 
  }

  return newPopulation; 
}
function createChildren(parentA, parentB) {
  const childDNA1 = {};
  const childDNA2 = {};
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

  return [new parentA.constructor(childDNA1), new parentA.constructor(childDNA2)];
}

  
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
  