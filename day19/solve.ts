// @deno-types="npm:@types/lodash"
import _, { functions } from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [number, number[]][]
type Scanner = Record<string, Beacons>
type Beacons = Record<string, Rotations>
type Rotations = Record<string, Coordinates>
type Coordinates = { id: string; x: number; y: number; z: number }

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

function hash(beacons: Beacons) {
  const hashes = []

  for (const [id, cord] of _.entries(beacons)) {
    for (const [nId, nCord] of _.entries(beacons)) {
      if (id == nId) continue
      const dx = Math.abs(cord.r0.x - nCord.r0.x)
      const dy = Math.abs(cord.r0.y - nCord.r0.y)
      const dz = Math.abs(cord.r0.z - nCord.r0.z)
      hashes.push([dx, dy, dz].sort((l, r) => l - r).join(":"))
    }
  }

  return _.uniq(hashes)
}

function overlap(a: Beacons, b: Beacons) {
  const hashA = hash(a)
  const hashB = hash(b)
  return _.intersection(hashA, hashB).length >= 66
}

function rot([x, y, z]: [number, number, number]) {
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

function buildScanners(data: Puzzle): Scanner {
  const scanners = {}

  for (const [si, bs] of data) {
    for (const [bi, b] of bs.entries()) {
      for (const [ri, r] of rot(b).entries()) {
        const path = [`s${si}`, `b${bi}`, `r${ri}`]
        const [[x, y, z], id] = [r, path.join("")]
        _.set(scanners, path, { id, x, y, z })
      }
    }
  }

  return scanners
}

const coordinates = { "s0": { x: 0, y: 0, z: 0 } }

function getNextCoordinates(root: string, b: Beacons) {
  const { x, y, z } = coordinates[root]

  return { x, y, z }
}

const solve1 = (data: Puzzle) => {
  const scanners = buildScanners(data)

  for (const [s1, b1] of _.entries(scanners)) {
    for (const [s2, b2] of _.entries(scanners)) {
      if (s1 == s2) continue
      console.log(s1, "overlap", s2, overlap(b1, b2))
    }
  }

  const s0 = scanners["s0"]
  const s1 = scanners["s1"]
  return getNextCoordinates("s0", s1)
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
