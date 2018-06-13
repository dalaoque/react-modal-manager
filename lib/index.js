'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showModal = showModal;
exports.closeModal = closeModal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createSubscription = require('create-subscription');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modals = [];

var counter = 0;

var onModalsChange = function onModalsChange() {};

var createModalId = function createModalId(id) {
  return window.Symbol ? Symbol(id) : id;
};

function showModal(modal) {
  // console.log('showModal', modal, modals)
  var el = modal;
  if (!_react2.default.isValidElement(modal)) {
    el = function el() {
      return modal;
    };
  }
  var modal_id = counter++;
  var symbol_modal_id = createModalId(modal_id);
  var close = closeModal.bind(null, symbol_modal_id);
  modal = _react2.default.cloneElement(modal, { key: modal_id, __modal_id: symbol_modal_id, closeModal: close });

  modals = modals.concat(modal);
  onModalsChange(modals);
  return symbol_modal_id;
}

function closeModal(modal_id) {
  // console.log('closeModal', modal_id)
  modals = modals.filter(function (p) {
    return p.props.__modal_id !== modal_id;
  });
  onModalsChange(modals);
}

var ModalSubscription = (0, _createSubscription.createSubscription)({
  getCurrentValue: function getCurrentValue(_) {
    return modals;
  },
  subscribe: function subscribe(_, callback) {
    // console.log('subscribe')
    onModalsChange = function onModalsChange(modals) {
      // console.log('onModalsChange', modals)
      callback(modals);
    };
    return function () {};
  }
});

exports.default = function (props) {
  return _react2.default.createElement(
    ModalSubscription,
    { source: modals },
    function (modals) {
      return _react2.default.createElement(
        'div',
        { className: props.className, style: props.style },
        modals
      );
    }
  );
};