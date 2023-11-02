from pyodide.ffi import to_js

def main(str="Hello world!"):
    return to_js(str + " from Pyodide!")
    
to_js(main)