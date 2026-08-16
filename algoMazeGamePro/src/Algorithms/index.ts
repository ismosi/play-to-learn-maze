import { createMazeByPrims } from "@/Algorithms/create-maze-algos/prims";
import { createMazeByRecursivePartition } from "@/Algorithms/create-maze-algos/recursive-partition";
import { createMazeByRecursiveBacktracking } from "@/Algorithms/create-maze-algos/recursive-backtracking";
import { generateBinaryMaze } from "@/Algorithms/create-maze-algos/binary";
import { generateKruskalMaze } from "@/Algorithms/create-maze-algos/kruskal";
import { generateSideWinderMaze } from "@/Algorithms/create-maze-algos/side-winder";
import { generateWilsonMaze } from "@/Algorithms/create-maze-algos/wilson";

import { aStar } from "@/Algorithms/chennel-success-finder/a-star";
import { breadthFirstSearch } from "@/Algorithms/chennel-success-finder/bfs";
import { greedy } from "@/Algorithms/chennel-success-finder/greedy";
import { generateLabyrinthMaze } from "./create-maze-algos/labyrinth";
import { generateEllersMaze } from "./create-maze-algos/ellers";

export const pathFinders = new Map([
  ["bfs", { name: "Breadth First Search", fn: breadthFirstSearch }],
  ["a-star", { name: "A* Search", fn: aStar }],
  ["greedy", { name: "Greedy Best First", fn: greedy }],
]);

export const mazeGenerators = new Map([
  ["prims", { name: "Prims", fn: createMazeByPrims }],
  ["kruskal", { name: "Kruskal", fn: generateKruskalMaze }],
  [
    "recursiveBacktracking",
    { name: "Recursive Backtracking", fn: createMazeByRecursiveBacktracking },
  ],
  [
    "recursiveDivision",
    { name: "Recursive Division", fn: createMazeByRecursivePartition },
  ],
  ["wilson", { name: "Wilson", fn: generateWilsonMaze }],
  ["ellers", { name: "Ellers", fn: generateEllersMaze }],
  ["sidewinder", { name: "Side Winder", fn: generateSideWinderMaze }],
  ["binary", { name: "Binary Tree", fn: generateBinaryMaze }],
  ["labyrinth", { name: "Labyrinth", fn: generateLabyrinthMaze }],
]);
