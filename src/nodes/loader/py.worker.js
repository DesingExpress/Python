/* eslint-disable */
/* eslint-disable no-restricted-globals */
import { loadPyodide } from "pyodide";

async function loadPyodideAndPackages() {
  // loadPyodide()
  // await import("https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js");
  // self.pyodide = await self.loadPyodide();
  self.pyodide = await loadPyodide({
    // indexURL: "https://indigo-quixotic-koala-538.mypinata.cloud/ipfs/QmPiy9dd5rzsTnxeWQc6MUocnhpe1ReT9UePq2R3iQoRkB",
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full",
  });
  // await self.pyodide.loadPackage(["numpy", "pytz"]);
}
let pyodideReadyPromise = loadPyodideAndPackages();
let callableFunc = new Map();

self.onmessage = async (event) => {
  await pyodideReadyPromise;

  const { id, python, args, options } = event.data;
  const { returnable = true, cache = false } = options;
  //   // The worker copies the context in its own "memory" (an object mapping name to values)
  //   for (const key of Object.keys(context)) {
  //     self[key] = context[key];
  //   }
  // Now is the easy part, the one that is similar to working in the main thread:
  try {
    await self.pyodide.loadPackagesFromImports(python);
    let results = await self.pyodide.runPythonAsync(python);
    if (typeof results === "function") {
      const lastArgs = args.at(-1);
      const hasKWArgs =
        typeof lastArgs === "object" ? lastArgs.__kwargs : false;
      delete lastArgs["__kwargs"];

      let _results = undefined;
      if (hasKWArgs) _results = results.callKwargs(...args);
      else {
        _results = results(...args);
      }
      self.postMessage({ id, results: _results });
      return;
    }
    self.postMessage({ results, id });
  } catch (error) {
    self.postMessage({ error: error.message, id });
  }
};
