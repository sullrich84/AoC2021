// @deno-types="npm:@types/lodash"
import _, { intersection } from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [number, [number, number, number][]][]

const [task, sample] = read("day19")
  .map((file) => file.split("\n\n"))
  .map((file) =>
    file.map((block, scanner) => {
      const lines = block.split("\n")
      const beacons = _.tail(lines)
        .filter((r) => r !== "")
        .map((r) => r.split(",").map((n) => parseInt(n)))
      return [scanner, beacons]
    })
  )

console.clear()
console.log("🎄 Day 19: Beacon Scanner")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

function hash(s: number, beacons: [number, number, number][]) {
  const hashes = {}

  for (let i = 0; i < beacons.length; i++) {
    for (let ii = 0; ii < beacons.length; ii++) {
      if (i == ii) continue
      const [ax, ay, az] = beacons[i]
      const [bx, by, bz] = beacons[ii]

      const dx = Math.abs(ax - bx)
      const dy = Math.abs(ay - by)
      const dz = Math.abs(az - bz)

      const hash = [dx, dy, dz].sort((a, b) => a - b).join(":")
      hashes[hash] = [i, ii].sort((a, b) => b - a).map((n) => "s" + s + "b" + n)
    }
  }

  return hashes
}

function rot([x, y, z]: [number, number, number]): [number, number, number][] {
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
  const size = data.map(([_s, b]) => b.length)
  const dups: Set<number>[] = []

  for (const [redScanner, redBeacons] of data) {
    const redHashes = hash(redScanner, redBeacons)

    for (const [blueScanner, blueBeacons] of data) {
      if (redScanner == blueScanner) continue
      const blueHashes = hash(blueScanner, blueBeacons)

      const redKeys = _.keys(redHashes)
      const blueKeys = _.keys(blueHashes)

      const intersections = _.intersection(redKeys, blueKeys)
      if (intersections.length < 66) continue

      const pairs = intersections
        .map((k) => _.zip(redHashes[k], blueHashes[k]))
        .flat()

      insert: for (const [left, right] of pairs) {
        for (const dup of dups) {
          if (dup.has(left) || dup.has(right)) {
            dup.add(left)
            dup.add(right)
            continue insert
          }
        }
        // Create new dup
        dups.push(new Set([left, right]))
      }

      console.log(
        `scanner ${redScanner}`,
        `overlaps with`,
        `scanner ${blueScanner}`,
        pairs,
      )
    }
  }

  return _.sum(size) - dups.length * 2
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
