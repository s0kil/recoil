import memoize from "memoize-one";

// Special Thanks To: https://gist.github.com/KoryNunn/5488215
export function inEach(items, callback) {
  for (
    let i = 0, l = items.length;
    i < l && !callback(items[i], i, items);
    i++
  ) {}
  return items;
}

export function functionArguments(func) {
  const functionAsString = func.toString();
  return functionAsString
    .slice(functionAsString.indexOf("(") + 1, functionAsString.indexOf(")"))
    .split(", ");
}

export function functionArgumentsMemoize(func) {
  return memoize(func => functionArguments(func))(func);
}
