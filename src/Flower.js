class Flower {
    constructor(dna) {
      this.dna = dna || this.generateRandomDNA();
    }
  
    generateRandomDNA() {
      return {
        centerSize: Math.random(),
        centerColor: {
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
        },
        petalColor: {
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
        },
        numberOfPetals: Math.floor(Math.random() * 8),
      };
    }
  }

  export default Flower;