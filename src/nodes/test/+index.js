import { Pure } from "@design-express/fabrica";
import func from "./test.py";

export class pyodideTest extends Pure {
  static path = "Python/test";
  static title = "Print";
  static description = "This is the Python Test Node";
  constructor() {
    super();
    this.addInput("input", "string");
    this.addOutput("output", "string");
  }

  async onExecute() {
    const input = this.getInputData(1) ?? "Hello world";
    this.setOutputData(1, await func(input));
  }
}
