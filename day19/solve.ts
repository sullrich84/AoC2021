// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = Scanner[]
type Scanner = { scanner: number; beacons: Coord[] }
type Coord = [x: number, y: number, z: number]

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

function hashBeacons({ beacons }: Scanner) {
  const hashes = {}

  for (const [a, [ax, ay, az]] of beacons.entries()) {
    for (const [b, [bx, by, bz]] of beacons.entries()) {
      if (a == b) continue
      const dx = Math.abs(ax - bx)
      const dy = Math.abs(ay - by)
      const dz = Math.abs(az - bz)
      const hash = [dx, dy, dz]
        .sort((l, r) => l - r)
        .map((v) => v.toString(36))
        .join(":")

      if (hashes[hash] != undefined) continue
      hashes[hash] = [a, b]
    }
  }

  return hashes
}

function rot([x, y, z]) {
  return [
    [x, y, z],
    [x, z, -y],
    [x, -y, -z],
    [x, -z, y],
    [-x, -y, z],
    [-x, z, y],
    [-x, y, -z],
    [-x, -z, -y],
    [y, z, x],
    [y, x, -z],
    [y, -z, -x],
    [y, -x, z],
    [-y, -z, x],
    [-y, x, z],
    [-y, z, -x],
    [-y, -x, -z],
    [z, x, y],
    [z, y, -x],
    [z, -x, -y],
    [z, -y, x],
    [-z, -x, y],
    [-z, y, x],
    [-z, x, -y],
    [-z, -y, -x],
  ]
}

const solve1 = (data: Puzzle) => {
  const unique = [] 

  for (const [aid, a] of data.entries()) {
    const aHashes = hashBeacons(a)
    for (const [bid, b] of data.entries()) {
      if (aid == bid) continue
      const bHashes = hashBeacons(b)
      const len = _.intersection(_.keys(aHashes), _.keys(bHashes)).length
      console.log({ aid, bid, len } )
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
