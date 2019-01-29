module.exports = {
  ifEqual: function (obj, value, trueString, falseString) {
    return ((obj === value) ? trueString : falseString);
  }
}