// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string

const [task, sample] = read("day16")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l, 16)))
  .map((file) => file.map((l) => l.toString(2)))
  .map((file) => file.map((l) => _.padStart(l, l.length + l.length % 4, "0")))
  .flat()

console.clear()
console.log("🎄 Day 16: Packet Decoder")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

function parse(data: string) {
  const bin = data.split("")

  const readBits = (size: number) => bin.splice(0, size).join("")
  const prevBits = (size?: number) => bin.join("").slice(0, size || bin.length)
  const cutApdx = () => readBits(bin.length % 4)
  const toInt = (value: string) => parseInt(value, 2)

  const version = toInt(readBits(3))
  const type = toInt(readBits(3))
  const subPackets = []

  console.log("VER: %c%s", "color: yellow", version)
  console.log("TYP: %c%s", "color: red", type)

  if (type === 4) {
    let [val, end] = ["", false]
    while (!end) {
      end = readBits(1) === "0"
      val += readBits(4)
    }
    console.log("LIT: %c%s", "color: lime", toInt(val))
    // console.log("APX: %c%s", "color: gray", cutApdx() || "/")
  } else {
    const lenType = readBits(1)
    if (lenType == "0") {
      const len = toInt(readBits(15))
      console.log("OPS: %c%s", "color: purple", len)
      const payload = readBits(len)
      let [apdx, end] = [payload, false]
      while (!end) {
        const res = parse(apdx)
        subPackets.push(res)
        apdx = res.apdx
        end = apdx === ""
      }
    } else {
      const len = toInt(readBits(11))
      console.log("OPS: %c%s", "color: cyan", len)
      let apdx = prevBits()
      for (let i = 0; i < len; i++) {
        const res = parse(apdx)
        subPackets.push(res)
        apdx = res.apdx
      }
    }
  }

  return { version, type, subPackets, subPackets, apdx: prevBits() }
}

const solve1 = (data: Puzzle) => {
  data = "001010100000000001101010000000000000000000000000000000"
  console.log(data)
  let versionSum = 0
  const stack = [parse(data)]

  while (stack.length > 0) {
    const res = stack.shift()
    console.log(res)
    versionSum += res.version
    stack.push(...res.subPackets)
  }

  return versionSum
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
