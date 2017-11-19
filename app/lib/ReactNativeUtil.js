// https://kylewbanks.com/blog/how-to-conditionally-render-a-component-in-react-native

export function renderIf(condition, content) {
  if (condition) {
    return content;
  }
  return null;
}

export default null;
