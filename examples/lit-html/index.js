import { $, $$, _ } from "recoil";
import { html, render } from "lit-html";

_.person = {
  name: "The Recoiler",
  age: Infinity
};

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
      age: Math.round(Math.random() * 10000)
    }
  });
}, 0 /* quick! */);
