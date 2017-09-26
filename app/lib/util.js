
class Util {
// https://jasonharper.wordpress.com/2012/09/22/select-and-selectmany-for-javascript-arrays/
  static mapMany(array, projector) {
    let result = [];
    for (let i = 0; i < array.length; i += 1) {
      result = result.concat(projector(array[i]));
    }
    return result;
  }
}

export default Util;
