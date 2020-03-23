# TODO

- Write Tests!

```JavaScript
// TODO: Use `Button` As `_.Button()`,
// The Component Will Be Re-Rendered,
// If The Function Dependencies Change

$$(function Button(numbers) {
  return html`
    <button>${[...numbers]}</button>
  `;
});
// OR
// The Value Of `_.Button` Will Update If The `$$` Function Dependencies Change.
_.Button = $$(
  numbers => html`
    <button>${[...numbers]}</button>
  `
);
// `_.Button` is immutable, just like `const Button`,
const Button = numbers => html`
  <button>${[...numbers]}</button>
`;
```
