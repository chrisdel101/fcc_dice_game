// GAME INSTRUCTIONS
// - to run: node dicegame.js
// -To change runs: change the runs variable in main function
// -to change number of dice used: change the dice variable in main function
// -TODO optimcally these would be accepted from the command line by user. That would make this even more dyamic

// MAIN game running function - this runs the game
// called at bottom
const main = () => {
  try {
    const runs = 10000
    const dice = 5
    const startTime = performance.now()
    //   run all the games simulations
    const scores = gameRunner(runs, dice)
    //   print the desired outputs
    printScores(scores, runs, dice)
    const endTime = performance.now()
    //   print the time taken
    const elapsedTime = endTime - startTime
    console.log(`Total simulation too ${elapsedTime / 1000} seconds.`)
  } catch (e) {
    console.error('An error ocurred in main', e)
  }
}
// INPUT(3): obj - object of key/val pairs, int - number of runs, int- dice use
// OUTPUT: none
// DESC: prints the desired output to console
const printScores = (scores, totalRuns, dice) => {
  console.log(`Number of simulations was ${totalRuns} using ${dice} dice.`)
  scores &&
    totalRuns > 0 &&
    Object.entries(scores).forEach(([key, val]) => {
      const percent = val / totalRuns
      const output = `Total ${key} occurs ${percent} occurred ${val}.0 times.`
      console.log(output)
    })
}
// INPUT(2): int num of times to run, int num of dice
// OUTPUT: obj scores object
// DESC: runs the game x times
const gameRunner = (timesToRun, dice) => {
  try {
    if (timesToRun < 0) {
      console.log('Cannot run less than zero times')
      return
    }
    const scores = {}
    while (timesToRun) {
      const score = diceGame(dice)
      if (!scores[score]) {
        scores[score] = 1.0
      } else {
        scores[score]++
      }
      timesToRun--
    }
    return scores
  } catch (e) {
    console.error('An error occured in gameRunner', e)
  }
}
// INPUT: int - num of dice to start with
// OUTPUT: game score int
// DESC: runs a single game
const diceGame = (dice) => {
  let score = 0
  //   let dice = 5
  // roll all remaining dice on each iteration
  while (dice) {
    let rolls = diceRollValues(dice)
    // if any 3s are found
    if (rolls.includes(3)) {
      // remove all 3s - leave rest
      rolls = removeAllValuesFromArr(rolls, 3)
      dice = rolls.length
    } else if (!rolls.includes(3)) {
      // get lowest roll
      const lowest = findLowestArrVal(rolls)
      // remove lowest - only one instance of it
      rolls = removeSingleValueFromArr(rolls, lowest)
      // assign lowest as score
      score += lowest
      dice = rolls.length
    }
  }
  return score
}
////////////////////////
////////////////////////
////UTILITY FUNCTIONS /
////////////////////////
////////////////////////
// INPUT: none
// OUTPUT: int 1-6
// DESC: simulate the rolling of die - return vals 1-6
const rollSingleDice = () => {
  const min = 1
  const max = 6
  // refernce: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
// INPUT: int numDice to roll
// OUTPUT: int[] each roll val
// DESC: simulates rolling multiple dice, returns array of rolls
const diceRollValues = (numDice) => {
  // sntax for cleanliness https://stackoverflow.com/a/30651275/5972531
  return Array(numDice)
    .fill(0)
    .map((_) => {
      return rollSingleDice()
    })
}
// INPUT(2): int[] rolls, int val to remove
// OUTPUT: int[]
// DESC: // removes all instances of a valuse from arr  - returns new arr
const removeAllValuesFromArr = (arr, toRemove) => {
  return arr.filter((item) => item !== toRemove)
}
// INPUT(2): int[] rolls, int val to remove
// OUTPUT: int[]
// DESC: // removes single instance of value from arr, or does nothing
var removeSingleValueFromArr = (arr, toRemove) => {
  // copy to avoid mutating arr
  const arrCopy = [...arr]
  const foundIndex = arrCopy.indexOf(toRemove)
  //   if found, remove val
  if (foundIndex !== -1) {
    arrCopy.splice(foundIndex, 1)
    return arrCopy
  }
  //   else return unchanged arr
  return arr
}
// INPUT: int[] rolls
// OUTPUT: int
// DESC: // returns smallet val in arr
const findLowestArrVal = (arr) => {
  // fancy hack to make Math.min work on array
  return Math.min(...arr)
}
main()

// PSEUDOCODE SCRATCH
// Dice Game - Summary
// Pseudcode to start ideas
// - creacte roll dice function - gen random num btw 1/6
// - use loop to act as dice throws - condition until dice > 0
// - track dice number
// - track score
// - remove any 3s = score 0
// - no 3s then lowest taken off -> [1,2,4, 5, 5] - take off 1 - score 1
