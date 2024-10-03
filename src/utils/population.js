import Flower from '../Flower';
import { selection, crossover, mutate, createNewPopulation } from './evolution';

export function initializePopulation() {
  const population = [];
  const populationSize = 8; 
  for (let i = 0; i < populationSize; i++) {
    population.push(new Flower());
  }
  return population;
}

export function evolvePopulation(population, fitness) {
  const newPopulation = createNewPopulation(population, fitness);
  const crossoverPopulation = crossover(newPopulation);
  const mutatedPopulation = mutate(crossoverPopulation);
  return mutatedPopulation;
}
