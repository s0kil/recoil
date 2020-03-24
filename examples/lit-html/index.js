import { $, $$, _ } from "recoil";
import { html, render } from "lit-html";

_.person = {
  name: "The Recoiler",
  age: Infinity
};

const personNode = document.body.appendChild(document.createElement("div"));
$$(person => {
  const Person = person =>
    html`
      <div>${person.name} is ${person.age} years old.</div>
    `;

  render(Person(person), personNode);
});

/*
setInterval(() => {
  $({
    person: {
      ..._.person,
      age: Math.round(Math.random() * 10000)
    }
  });
}, 1000);
*/

_.counter = 0;
_.CounterComponent = $$(counter => {
  return html`
    <button @click=${() => $({ counter: _.counter - 1 })}>-</button>
    <span>${String(counter)}</span>
    <button @click=${() => $({ counter: _.counter + 1 })}>+</button>
  `;
});

function main() {
  const rootNode = document.body.appendChild(document.createElement("div"));

  render(_.CounterComponent, rootNode);
}
main();
