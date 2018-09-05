
// Replaces newline with \r*\n and tab with \t
export function encodeSlashes(str) {
  if (str) {
    return str
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
  }
  return str;
}

// https://kylewbanks.com/blog/how-to-conditionally-render-a-component-in-react-native
export function renderIf(condition, content) {
  if (condition) {
    return content;
  }
  return null;
}

export function renderIfElse(
  condition1, content1,
  condition2, content2,
  condition3, content3,
  condition4, content4,
  condition5, content5,
) {
  if (condition1) {
    return content1;
  }
  if (condition2) {
    return content2;
  }
  if (condition3) {
    return content3;
  }
  if (condition4) {
    return content4;
  }
  if (condition5) {
    return content5;
  }
  return null;
}


export default null;
