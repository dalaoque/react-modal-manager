'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeModal = exports.showModal = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createSubscription = require('create-subscription');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function Manager() {
  var _this = this;

  _classCallCheck(this, Manager);

  this.counter = 0;
  this.modals = [];

  this.add = function (modal) {
    var index = _this.counter++;
    var modalId = window.Symbol ? Symbol(index) : index;
    var close = closeModal.bind(null, modalId);
    modal = _react2.default.cloneElement(modal, { key: index, closeModal: close });
    _this.modals = _this.modals.concat({ modalId: modalId, modal: modal });
    _this.onChanged(_this.modals);
    return modalId;
  };

  this.remove = function (modalId) {
    _this.modals = _this.modals.filter(function (p) {
      return p.modalId !== modalId;
    });
    _this.onChanged(_this.modals);
  };

  this.onChanged = function () {};
};

var manager = new Manager();

var showModal = exports.showModal = function showModal(modal) {
  // console.log('showModal', modal, manager.modals)
  var el = modal;
  if (!_react2.default.isValidElement(modal)) {
    el = function el() {
      return modal;
    };
  }
  return manager.add(modal);
};

var closeModal = exports.closeModal = function closeModal(modal_id) {
  // console.log('closeModal', modal_id)
  manager.remove(modal_id);
};

var Subscription = (0, _createSubscription.createSubscription)({
  getCurrentValue: function getCurrentValue(manager) {
    return manager.modals;
  },
  subscribe: function subscribe(manager, callback) {
    // console.log('subscribe')
    manager.onChanged = function (modals) {
      // console.log('onModalsChange', modals)
      callback(modals);
    };
    return function () {};
  }
});

exports.default = function () {
  return _react2.default.createElement(
    Subscription,
    { source: manager },
    function (modals) {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        modals.map(function (p) {
          return p.modal;
        })
      );
    }
  );
};