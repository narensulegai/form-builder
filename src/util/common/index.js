// const FormulaParser = import ('hot-formula-parser').Parser;
import {Parser} from "hot-formula-parser";

export const evalShowOn = (showOn) => {
  if (typeof showOn === 'function') {
    return showOn;
  }
  if (typeof showOn === 'string') {
    return (args) => {
      const parser = new Parser();
      parser.setFunction('LENGTH', (params) => {
        return params[0].length;
      });
      for (let key in args) {
        parser.setVariable(key, args[key]);
      }
      const res = parser.parse(showOn);
      if (res.error !== null) {
        console.error('Something went wrong while parsing formula', parser);
      }
      return res.result;
    }
  }
  return () => true;
};
