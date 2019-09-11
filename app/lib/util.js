
// TODO: Add More
export const LOG_LEVEL_INFO = 'LOG_LEVEL_INFO';
export const LOG_LEVEL_ERROR = 'LOG_LEVEL_ERROR';

export const log = (msg, logLevel) => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.tron.log(msg);
  } else if (logLevel === LOG_LEVEL_ERROR) {
    // eslint-disable-next-line no-console
    console.log(msg);
  }
};

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
  condition1,
  content1,
  condition2,
  content2,
  condition3,
  content3,
  condition4,
  content4,
  condition5,
  content5,
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
