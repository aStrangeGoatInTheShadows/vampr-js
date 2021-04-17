const treeLogger = require('tree-logger');

const log = console.log;

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {    
    this.offspring.push(vampire);
    vampire.creator = this;
  }
  
  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }
  
  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vamp = this;
    let count = 0;

    while (vamp.creator) {
      vamp = vamp.creator;
      count++;
    }

    return count;
  }

  // Returns true if vampire is offspring of this
  isOffspring(vampire) {
    return this.offspring.includes(vampire);
  }
  
  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal)    
  }
  
  /** Stretch **/
  
  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }

    //// Make oldMan the most senior vampire
    let oldMan = this;
    let youngMan = vampire;
    if (vampire.isMoreSeniorThan(this)){
      oldMan = vampire;
      youngMan = this;
    }

    // if oldman has no creator, he is root so return self
    if(!oldMan.creator) {
      return oldMan;
    }
    // if young man is old mans child
    if (oldMan.offspring.includes(youngMan)) {
      return oldMan;
    }
    
    if (youngMan.creator === oldMan.creator) {
      return youngMan.creator;
    }

    let parent = oldMan.creator;

    for(let i = parent.numberOfVampiresFromOriginal; i >= 0; i--){
      log(`${i}th time ran`)
      log(parent);
      if(parent.offspring.includes(youngMan)){
        return parent;
      }
      parent = parent.creator;
    }
    
    return null;
  }
}

//////////////////////////////////// THIS PROBABLY NEEDS RECURSION ///////////////////////////////////////////
////////////////////////////////////  NEED TO CHECKALL SIBLINGS AND THEIR SIBLINGS FOR THE YOUNG ONE ///////////////////////////////////////////

// //////////////////////////////////////////// WORKING HERE  ////////////////////////////////////
// const ted = new Vampire (`Ted`, 34); // original
// const vlad = new Vampire ('Vlad', 37); // second
// const fred = new Vampire ('Fred', 40);

// ted.addOffspring(vlad);
// vlad.addOffspring(fred);
// // Returns the total number of vampires created by that vampire
// //log(ted.closestCommonAncestor(fred));


let rootVampire = new Vampire("root");

let offspring1 = new Vampire("1");
let offspring2 = new Vampire("2");
let offspring3 = new Vampire("3");
let offspring4 = new Vampire("4");
let offspring5 = new Vampire("5");
let offspring6 = new Vampire("6");
let offspring7 = new Vampire("7");
let offspring8 = new Vampire("8");

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

// log(offspring1);
// log('-------------------------------------------');
// log(offspring2);
// log('-------------------------------------------');
 offspring8.closestCommonAncestor(offspring7);

const root = rootVampire;
const aTree = treeLogger(root, (node) => node.offspring, (node) => node.name);
log(aTree);

// it("should be the root vampire for first two offspring", () => {
  //   expect(offspring1.closestCommonAncestor(offspring2).name).to.equal(rootVampire.name);
  // })
  
  module.exports = Vampire;

  //1) should be offspring 3 for offspring 4 and 7
  