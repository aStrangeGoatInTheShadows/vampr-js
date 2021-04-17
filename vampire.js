const treeLogger = require('tree-logger');

const log = console.log;
let sum = 0;

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
    this.traverse = false;
    this.Descendents = 0;
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

  /** Tree traversal methods **/

  depthFirstTraversal() {
    for (const childNode of this.offspring) {
      childNode.depthFirstTraversal(); // 2
    }
  }

  // ........ it gets the root....
  get root() {
    let vamp = this;

    while (vamp.creator) {
      vamp = vamp.creator;
    }

    return vamp;
  }



  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vamp = null;
    log(this.name);
    // log(name);

    if (this.name === name) {
      return this;
    }

    for (const childNode of this.offspring) {
      if (childNode.name === name) {
        return childNode;
      }
      vamp = childNode.vampireWithName(name);
    }

    return vamp;
  }
  //////////////////////////////////////////// WORKING HERE  ////////////////////////////////////
  //////////////////////////////////////////// WORKING HERE  ////////////////////////////////////
  // Returns the total number of vampires that exist

  get totalDescendents() {
    let parent = this;
    let sum = 0;
    let next = 0;

    while (parent.offspring.length > 0) {
      sum += parent.offspring.length
      if()
    }

    
    
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

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
    if (vampire.isMoreSeniorThan(this)) {
      oldMan = vampire;
      youngMan = this;
    }

    // if oldman has no creator, he is root so return self
    if (!oldMan.creator) {
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

    for (let i = parent.numberOfVampiresFromOriginal; i >= 0; i--) {
      if (parent.offspring.includes(youngMan)) {
        return parent;
      }
      parent = parent.creator;
    }

    return null;
  }
}



// └── root
//     ├── 1
//     ├── 2
//     |   └── 8
//     └── 3
//         ├── 4
//         └── 5
//             └── 6
//                 └── 7

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

// rootVampire.vampireWithName(offspring7.name);

log(rootVampire.totalDescendents);
// root.depthFirstTraversal();

// const aTree = treeLogger(root, (node) => node.offspring, (node) => node.name);
// log(aTree);


module.exports = Vampire;

