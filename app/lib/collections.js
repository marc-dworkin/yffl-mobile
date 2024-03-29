class Collections {
  // https://jasonharper.wordpress.com/2012/09/22/select-and-selectmany-for-javascript-arrays/
  static mapMany(array, projector) {
    let result = [];
    for (let i = 0; i < array.length; i += 1) {
      result = result.concat(projector(array[i]));
    }
    return result;
  }

  // to get the key of a KeyValuePair
  // TODO: Should I be using Map?
  static key(obj) {
    return Object.keys(obj)[0];
  }

  // https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
  static intersect(arr1, arr2) {
    const s1 = new Set(arr1);
    const s2 = new Set(arr2);
    const intersection = new Set([...s1].filter((x) => s2.has(x)));
    return Array.from(intersection);
  }

  // since we seem to be using objects as dictionaries, or hashes.
  // ability to filter by dictionary key or value.
  static filter(obj, keyFilter = () => true, valueFilter = () => true) {
    if (obj == null) {
      return null;
    }

    return Object.keys(obj).reduce((acc, cv) => {
      if (keyFilter(cv) && valueFilter(obj[cv])) {
        acc[cv] = obj[cv];
      }
      return acc;
    }, {});
  }

  // since we seem to be using objects as dictionaries, or hashes.
  // map the key/value in one object to another
  static map(obj, selector) {
    if (obj == null) {
      return null;
    }

    return Object.keys(obj).reduce((acc, cv) => {
      acc[cv] = selector(obj[cv]);
      return acc;
    }, {});
  }

  static sortBy(selector, ascending = true) {
    return (a1, a2) => {
      const s1 = selector(a1);
      const s2 = selector(a2);

      if (s1 === s2) {
        return 0;
      }

      if (ascending) {
        if (s1 > s2) {
          return 1;
        }
        return -1;
      }

      if (s1 < s2) {
        return 1;
      }
      return -1;
    };
  }

  // since we seem to be using objects as dictionaries, or hashes.
  // ability to filter by dictionary key or value.
  static toDictionary(arr, keySelector = true, valueSelector = (c) => c) {
    if (arr == null) {
      return null;
    }

    return arr.reduce((acc, cv) => {
      acc[keySelector(cv)] = valueSelector(cv);
      return acc;
    }, {});
  }

  // TODO: doesn't belong in collections move to util
  // https://arjunphp.com/capitalize-first-letter-string-javascript/
  static ucFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static remove(arr, val) {
    for (let i = arr.indexOf(val); i > -1; i = arr.indexOf(val)) {
      arr.splice(i, 1);
    }
    return arr;
  }

  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-an-array-remove-duplicates
  static distinct(arr, valueSelector = null) {
    if (!valueSelector) {
      return arr.filter((value, index, self) => self.indexOf(value) === index);
    }
    const valArr = arr.map(valueSelector);
    return arr.filter(
      (value, index) => valArr.indexOf(valueSelector(value)) === index,
    );
  }
}

export default Collections;
