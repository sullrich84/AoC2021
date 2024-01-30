// @deno-types="npm:@types/lodash"
import _, { isPlainObject } from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string

const [task, sample] = read("day16")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) =>
    file.map((l) => {
      return l
        .split("")
        .map((c) => parseInt(c, 16).toString(2))
        .map((b) => b.padStart(4, "0"))
        .join("")
    })
  )
  .flat()

console.clear()
console.log("🎄 Day 16: Packet Decoder")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

function parse(data: string, lvl = 0): [number, string[], number] {
  const bin = data.split("")

  // Helper methods
  const readBits = (size: number) => bin.splice(0, size).join("")
  const toInt = (value: string) => parseInt(value, 2)
  const idnt = Array(lvl).fill("  ").join("")

  // Read packet header
  const version = toInt(readBits(3))
  const type = toInt(readBits(3))
  let versionSum = version

  let lit!: number
  const literals: number[] = []

  if (type === 4) {
    // Read literal
    let [val, end] = ["", false]
    while (!end) {
      end = readBits(1) === "0"
      val += readBits(4)
    }
    lit = toInt(val)
  } else {
    // Read operator
    const lenType = toInt(readBits(1))

    if (lenType === 0) {
      const len = toInt(readBits(15))
      let payload = readBits(len)

      while (payload.length > 0) {
        const [rVerSum, rBin, rLit] = parse(payload, lvl + 1)
        rLit != undefined && literals.push(rLit)
        payload = rBin.join("")
        versionSum += rVerSum
      }
    } else {
      const len = toInt(readBits(11))
      let payload = bin.join("")

      for (let i = 0; i < len; i++) {
        const [rVerSum, rBin, rLit] = parse(payload, lvl + 1)
        readBits(payload.length - rBin.length)
        rLit != undefined && literals.push(rLit)
        payload = rBin.join("")
        versionSum += rVerSum
      }
    }
  }

  if (type != 4) lit = evaluate(type, literals)
  return [versionSum, bin, lit]
}

function evaluate(type: number, literals: number[]): number {
  if (type === 0) return literals.reduce((p, c) => p + c, 0)
  if (type === 1) return literals.reduce((p, c) => p * c, 1)
  if (type === 2) return _.min(literals)!
  if (type === 3) return _.max(literals)!

  if (type === 5) return literals[0] > literals[1] ? 1 : 0
  if (type === 6) return literals[0] < literals[1] ? 1 : 0
  if (type === 7) return literals[0] === literals[1] ? 1 : 0

  throw "invalid type: " + type
}

const solve1 = (data: Puzzle) => {
  return parse(data)[0]
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  return parse(data)[2]
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
