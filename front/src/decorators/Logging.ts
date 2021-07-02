export function Logging<T extends { new (...args: any[]): {} }>(target: T): T {
  // save a reference to the original constructor
  const original = target;

  // the new constructor behaviour
  const f = function (...args: any[]) {
    console.log("Currently instantiating: " + original.name);
    return new original(...args); // according the comments
  };

  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;

  // return new constructor (will override original)
  return f as unknown as T;
}
