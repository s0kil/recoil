# Recoil: The Toolkit For Immutable And Reactive Computations

## API

```JavaScript
import { $, $$, _ } from "./recoil";
import { html, render } from "lit-html";

_.numbers = [1, 2, 3, 4, 5];
$({ numbers: [..._.numbers, 6] });
// console.table(_.numbers);

_.person = {
  name: "Daniel",
  age: NaN
};

// console.log("Person: ", _.person);

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
// console.log("Person: ", _.person);

// TODO: Use `Button` As `_.Button()`,
// The Component Will Be Re-Rendered,
// If The Function Dependencies Change
$$(function Button(numbers) {
  return html`
    <button>${[...numbers]}</button>
  `;
});

// `$$` Creates A Reactive Subscriber,
// The Arguments To The Function Are Dependencies Of The Function
// $$(person => console.log("Person: ", person));

$$(numbers => console.log("Numbers: ", numbers));

$({
  person: {
    ..._.person,
    name: "Dan The Man"
  }
});

// Reactive HTML Templates
$$(person => {
  const Person = person =>
    html`
      <div>${person.name} is ${person.age} years old.</div>
    `;
  render(Person(person), document.body);
});

setInterval(() => {
  $({
    person: {
      ..._.person,
      age: Math.round(Math.random() * 100)
    }
  });
}, 100);
```

#### Why

- Lightweight.
- Simple API.
