import { $, $$, _ } from "./index.js";

const Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

// Benchmark Reactivity
suite.add("reactiveUpdates", function() {
  _.bench = 0;
  for (let i = 0; i < 1000000; i++) {
    $({
      bench: _.bench + i + Math.random()
    });
  }
});

// Benchmark Without Reactivity
suite.add("imperativeUpdates", function() {
  let bench = 0;
  for (let i = 0; i < 1000000; i++) {
    bench = bench + i + Math.random();
  }
});

suite.on("cycle", function(event) {
  console.info(String(event.target));
});

suite.on("complete", function() {
  console.info("Fastest is " + this.filter("fastest").map("name"));
});

suite.run();
