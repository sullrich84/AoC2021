// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = number[][]

const [task, sample] = read("day18")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => eval(l)))

console.clear()
console.log("🎄 Day 18: Snailfish")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

function explode() {
  
}

const solve1 = (data: Puzzle) => {
  for (const row of data) {
    console.log(row)
  }

  return [data[0], data[1]]
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
