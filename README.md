# Recoil: The Toolkit For Building Web Interfaces

## API

```JavaScript
import { $, $$, _ } from "./recoil";
import {
  alignRight,
  centerY,
  el,
  fill,
  layout,
  padding,
  rbg255,
  row,
  spacing,
  text,
  width
} from "./element";

import background from "./element/background";
import border from "./element/border";
import font from "./element/font";

_.Element = el(
  [
    background.color(rbg255(240, 0, 245)),
    font.color(rbg255(255, 255, 255)),
    border.rounded(3),
    padding(30)
  ],
  text("Stylish")
);

_.RowOfStuff = row(
  [width(fill()), centerY(), spacing(30)],
  [_.Element, _.Element, el([alignRight()], _.Element)]
);

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
// Instead Of: `_.person.age = Infinity;`
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
$$(function Button(person, numbers) {
  return el([], text("Button"));
});

// `$$` Creates A Reactive Subscriber,
// The Arguments To The Function Are Dependencies Of The Function
$$(person => console.log("Person: ", person));

$({
  person: {
    ..._.person,
    name: "Dan The Man"
  }
});

// Begin The Chaos
_.erupt(layout([], _.RowOfStuff));

```
