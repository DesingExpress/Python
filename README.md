![pyodide](https://github.com/pyodide/pyodide/raw/main/docs/_static/img/pyodide-logo-readme.png)

# Python\[[Pyodide](https://github.com/pyodide/pyodide)\] Nodes

> This Repository is the wrapper code from [pyodide/pyodide](https://github.com/pyodide/pyodide) to [Design Express](https://x.nexivil.com) node.

Pyodide is a Python distribution for the browser based on WebAssembly.  
This Node can be supported to run nodes written in Python.

## For Design Express Developer

### ⚡Getting Started

1. `Right Click` on `bootstrap` FBRC
2. Click `Add Node` > `Python` > `Loader`
3. Done!🎉 You can use Python Node in Design Express!

### 🔲Include Node

#### Loader Node

Import `Pyodide` in the Design Express System for run the node written in Python.

```litegraph
{
  "title": "Loader",
  "inputs": [],
  "outputs": [{ "label": "onLoaded", "type":-1 }]
}
```

##### Location

`Python` > `Loader`

##### Slots

###### Inputs

None

###### Outputs

| Label        | Type    | Description                      |
| ------------ | ------- | -------------------------------- |
| **onLoaded** | `Event` | Trigger slot when Pyodide loaded |

---

&nbsp;
&nbsp;

## For Node Developer

### ⚡Getting Started

1. Create Nodes development environment.

```bash
npx @design-express/create-node <path>
```

2. Add Python file in `src/nodes/test.py` and write the example Code.

```python
from pyodide.ffi import to_js

def main(str="Hello world!"):
    return to_js(str + " from Pyodide!")

to_js(main)
```

3. Import Python file and Call function in `src/nodes/+Node.js` file.

```javascript
import { Pure } from "@design-express/fabrica";

// Import Python file
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

    // Just Call the function!
    this.setOutputData(1, await func(input));
  }
}
```

4. Done!🎉

> You can see the complete code in this [folder](https://github.com/DesingExpress/Python/tree/master/src/nodes/test)

### ✨Features

- Support pure Python Package thanks to [micropip](https://pyodide.org/en/stable/usage/api/micropip-api.html)
- Support Ported Packages with C extensions (ex. NumPy, Pandas) from Pyodide. ([Full List](https://github.com/pyodide/pyodide/tree/main/packages))
- Seamless JS ↔ Python Development environment
- Support HotLoader

  ... and [more](https://github.com/pyodide/pyodide)

### 🚧Limitation

- Cannot use UI related (SDL-based) package
- Return Value must be List, Tuple, Dict, Set, Buffer [(more info)](https://pyodide.org/en/stable/usage/type-conversions.html)
- Must use `from pyodide.ffi import to_js` when return Values to prevent memory leak

## &nbsp;

&nbsp;
&nbsp;

## Contributing

Please visit [Github repository [ DesingExpress/Python ]](https://github.com/DesingExpress/Python)

## Sources

[Github repository [ DesingExpress/Python ]](https://github.com/DesingExpress/Python)

## License

[Mozilla Public License Version 2.0](https://choosealicense.com/licenses/mpl-2.0/)
