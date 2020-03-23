import { $, $$, _ } from "recoil";

_.numbers = [1, 2, 3, 4, 5];
console.table(_.numbers);
$({ numbers: [..._.numbers, 6] });

_.person = {
  name: "Daniel",
  age: NaN
};
console.log("Person: ", _.person);

// Since Recoil.Objects Are Immutable,
// We Update A Target Property,
// By Including The Properties Of The Old Target Object
// So Instead Of: `_.person.age = Infinity;`, We Do:
$({
  person: {
    ..._.person,
    age: Infinity
  }
});
console.log("Person: ", _.person);

// `$$` Creates A Reactive Subscriber,
// The Arguments To The Function Are Dependencies Of The Function
$$(person => console.log("Person: ", person));
$$(numbers => console.log("Numbers: ", numbers));

$({
  person: {
    ..._.person,
    name: "Dan The Man"
  }
});

setInterval(() => {
  $({
    person: {
      ..._.person,
      age: Math.round(Math.random() * 100)
    }
  });
}, 1000);

// Benchmark Reactivity
_.bench = 0;
console.time("simpleReactiveBenchmarkUpdates");
for (let i = 0; i < 1000000; i++) {
  $({
    bench: i + Math.random()
  });
}
console.timeEnd("simpleReactiveBenchmarkUpdates");

// Benchmark Without Reactivity
let bencher = 0;
console.time("simpleBenchmarkUpdates");
for (let i = 0; i < 1000000; i++) {
  bencher = i + Math.random();
}
console.timeEnd("simpleBenchmarkUpdates");
