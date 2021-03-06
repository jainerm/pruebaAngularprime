"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isCustomProp = _interopRequireDefault(require("./isCustomProp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const important = node => node.important;

const unimportant = node => !node.important;

const hasInherit = node => node.value.toLowerCase() === 'inherit';

const hasInitial = node => node.value.toLowerCase() === 'initial';

const hasUnset = node => node.value.toLowerCase() === 'unset';

var _default = (props, includeCustomProps = true) => {
  if (props.some(hasInherit) && !props.every(hasInherit)) {
    return false;
  }

  if (props.some(hasInitial) && !props.every(hasInitial)) {
    return false;
  }

  if (props.some(hasUnset) && !props.every(hasUnset)) {
    return false;
  }

  if (includeCustomProps && props.some(_isCustomProp.default) && !props.every(_isCustomProp.default)) {
    return false;
  }

  return props.every(unimportant) || props.every(important);
};

exports.default = _default;
module.exports = exports.default;