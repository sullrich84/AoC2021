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
const runPart2 = false
const runBoth = true

/// Part 1

function parse(data: string) {
  const bin = data.split("")

  // Helper methods
  const readBits = (size: number) => bin.splice(0, size).join("")
  const toInt = (value: string) => parseInt(value, 2)

  // Read packet header
  const version = toInt(readBits(3))
  const type = toInt(readBits(3))
  let versionSum = version

  if (type === 4) {
    // Read literal
    let [val, end] = ["", false]
    while (!end) {
      end = readBits(1) === "0"
      val += readBits(4)
    }
    console.log("ver:", version, "type:", type, "lit:", toInt(val))
  } else {
    // Read operator
    const lenType = toInt(readBits(1))

    if (lenType === 0) {
      const len = toInt(readBits(15))
      let payload = readBits(len)
      console.log("ver:", version, "type:", type, "op0", `${len} bits`)
      while (payload.length > 0) {
        const [rVerSum, rBin] = parse(payload)
        payload = rBin.join("")
        versionSum += rVerSum
      }
    } else {
      const len = toInt(readBits(11))
      let payload = readBits(bin.length)
      console.log("ver:", version, "type:", type, "op1", `${len} packets`)
      for (let i = 0; i < len; i++) {
        const [rVerSum, rBin] = parse(payload)
        payload = rBin.join("")
        versionSum += rVerSum
      }
    }
  }

  return [versionSum, bin]
}

const solve1 = (data: Puzzle) => {
  console.log()
  return parse(data)
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
