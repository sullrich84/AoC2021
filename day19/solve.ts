// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[][]

const [task, sample] = read("day19")
  .map((file) => file.split("\n\n"))
  .map((file) =>
    file.map((block, scanner) => {
      const lines = block.split("\n")
      const beacons = _.tail(lines)
        .filter((r) => r !== "")
        .map((r) => r.split(",").map((n) => parseInt(n)))

      return { scanner, beacons }
    })
  )

console.clear()
console.log("🎄 Day 19: Beacon Scanner")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

const solve1 = (data: Puzzle) => {
  for (let a = 0; a < data.length; a++) {
    const scannerA = data[a]
    for (let b = 0; b < data.length; b++) {
      if (a == b) continue
      const scannerB = data[b]
      const intersections = _.intersection(scannerA, scannerB)
      console.log(scannerA.scanner, scannerB.scanner, intersections)
    }
  }

  return 0
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
