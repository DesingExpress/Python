import { Pure } from "@design-express/fabrica";
import { nanoid } from "nanoid";
import Worker from "./py.worker";

export class pyodide extends Pure {
  static path = "Python";
  static title = "Loader";
  static description = "Run python scripts powered by Pyodide wasm";
  constructor() {
    super();
    this.addOutput("onLoaded", -1);
    if (!window.python) {
      window.python = new Promise((r) => {
        const tasks = new Map();

        const worker = new Worker();
        worker.onmessage = (e) => {
          const { id, results, error } = e.data;
          if (error) {
            console.error(id, error);
            tasks.get(id)?.();
            return;
          }
          tasks.get(id)?.(results);
        };

        r({
          exec: (python, args, options = {}) => {
            const id = nanoid();
            let r;
            const lock = new Promise((_r) => {
              r = _r;
            });
            tasks.set(id, r);
            worker.postMessage({ id, python, args: [...args], options });
            return lock;
          },
        });
      });
    }
  }
  getTitle() {
    return "Loader(Python)";
  }
  async onExecute() {
    this.triggerSlot(1);
  }
}
