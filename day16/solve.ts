// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string

const [task, sample] = read("day16")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l, 16)))
  .map((file) => file.map((l) => l.toString(2)))
  .flat()

console.clear()
console.log("🎄 Day 16: Packet Decoder")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

const solve1 = (data: Puzzle) => {
  function parseLabel(binary: string): [number, string] {
    const packets = _.chunk(binary, 5).map(([h, ...r]) => [h, r.join("")])
    const length = packets.findIndex(([h]) => h === "0")
    const literalPackets = packets.splice(0, length + 1)
    const literalBytes = literalPackets.map(([_h, r]) => r).join("")
    const literal = parseInt(literalBytes, 2)
    return [literal, packets.flat().join("")]
  }

  function parseOperator(binary: string): [string | number, string] {
    const bin = binary.split("")
    const type = bin.shift()

    if (type === "0") {
      const lengthString = bin.splice(0, 15).join("")
      const length = parseInt(lengthString, 2)
      const payload = bin.splice(0, length).join("")
      const rest = bin.join("")
      return [payload, rest]
    }

    if (type !== "1") throw "Invalid type"
    const lengthString = bin.splice(0, 11).join("")
    const subPackets = parseInt(lengthString, 2)
    const rest = bin.join("")
    return [subPackets, rest]
  }

  function parse(binary: string, count = 0) {
    if (/^0+$/.test(binary)) return count

    console.log(binary)
    const V = binary.substring(0, 3)
    const T = binary.substring(3, 6)
    const R = binary.substring(6)
    const version = parseInt(V, 2)
    const type = parseInt(T, 2)
    count += version

    if (type == 4) {
      const [literal, rest] = parseLabel(R)
      console.log('%c"%s"', "color: lime", literal)
      count += parse(rest, count)
    }

    if (type != 4) {
      const [operator, rest] = parseOperator(R)
      if (_.isString(operator)) {
        count += parse(operator, count)
        count += parse(rest, count)
      } else {
        let [nOperator, nRest] = [operator, rest]
        for (let o = 0; o < operator; o++) {
          count += parse(nOperator, count, true)
        }
        count += parse(rest, count)
      }
    }

    return count
  }

  return parse("11101110000000001101010000001100100000100011000001100000")
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
