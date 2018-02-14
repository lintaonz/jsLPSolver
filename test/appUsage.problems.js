// model notes
//
// accept users: [{qty, features: []}]
//
// have hardcoded products: [{price, name, features: []}]
//
// building constraints: one for every user, with equal of user quantity * all feature count
//
// building variables
//
// - one for each product, with cost and features. features ratioed as 1/all feature count
//
// - one for each user, with features. features ratioed as 1/features used
//
// ints - set for all products so it doesn't give half a license

// the cheap model:

const appUsageModel = {
  optimize: 'cost',
  opType: 'min',
  constraints: {
    // shouldnt need min: 0 for products
    // will merge in user constraints = qty*features.length -> must be equal e.g
    u1: { equal: 4 }, //1 user
    u2: { equal: 8 } //2 users
  },

  variables: {
    e1: {
      cost: 2, //or whatever the price is
      skype: 0.25, // these are ratios of 1/n features
      outlook: 0.25
    },

    e3: {
      cost: 5, //or whatever the price is
      skype: 0.25,
      outlook: 0.25,
      word: 0.25,
      excel: 0.25
    },

    // merge in user variables e.g.

    u1: {
      skype: 1 //= 1/n features used
    },

    u2: {
      outlook: 0.5,
      word: 0.5
    }
  },
  ints: { e1: 1, e2: 1 }
};

describe.only("The Solve method takes a problem and solves it", () => {
  it('should solve appUsage problem', () => {
    const solver = require("../src/solver");
    const obtainedResult = solver.Solve(appUsageModel);
    console.log(obtainedResult);
  });
});