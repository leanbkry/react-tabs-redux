'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs() {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this));

        _this.state = {
            selectedTab: null
        };

        _this.handleSelect = _this.handleSelect.bind(_this);
        return _this;
    }

    _createClass(Tabs, [{
        key: 'handleSelect',
        value: function handleSelect(tab) {
            this.setState({
                selectedTab: tab
            });
        }
    }, {
        key: 'findDefault',
        value: function findDefault(children) {
            if (this.defaultTab) {
                return this.defaultTab;
            }

            var firstLink = void 0;
            var firstDefaultLink = void 0;

            var traverse = function traverse(child) {
                if (!child.props || firstDefaultLink) {
                    return;
                }

                if (child.props.to) {
                    firstLink = firstLink || child.props.to;
                    firstDefaultLink = firstDefaultLink || child.props.default && child.props.to;
                }

                _react2.default.Children.forEach(child.props.children, traverse);
            };

            _react2.default.Children.forEach(children, traverse);

            this.defaultTab = firstDefaultLink || firstLink;
            return this.defaultTab;
        }
    }, {
        key: 'transformChildren',
        value: function transformChildren(children, _ref) {
            var _this2 = this;

            var handleSelect = _ref.handleSelect,
                selectedTab = _ref.selectedTab,
                activeLinkStyle = _ref.activeLinkStyle,
                visibleTabStyle = _ref.visibleTabStyle,
                name = _ref.name;

            if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) !== 'object') {
                return children;
            }

            return _react2.default.Children.map(children, function (child) {
                if (child.props && child.props.to) {
                    return _react2.default.cloneElement(child, {
                        handleSelect: handleSelect,
                        isActive: child.props.to === selectedTab,
                        activeStyle: activeLinkStyle,
                        namespace: name
                    });
                }

                if (child.props && child.props.for) {
                    return _react2.default.cloneElement(child, {
                        isVisible: child.props.for === selectedTab,
                        visibleStyle: visibleTabStyle,
                        renderActiveTabContentOnly: _this2.props.renderActiveTabContentOnly
                    });
                }

                return _react2.default.cloneElement(child, {}, _this2.transformChildren(child.props && child.props.children, {
                    handleSelect: handleSelect,
                    selectedTab: selectedTab,
                    activeLinkStyle: activeLinkStyle,
                    visibleTabStyle: visibleTabStyle,
                    name: name
                }));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                handleSelectProp = _props.handleSelect,
                selectedTabProp = _props.selectedTab,
                activeLinkStyle = _props.activeLinkStyle,
                visibleTabStyle = _props.visibleTabStyle,
                name = _props.name,
                divProps = _objectWithoutProperties(_props, ['handleSelect', 'selectedTab', 'activeLinkStyle', 'visibleTabStyle', 'name']);

            var handleSelect = handleSelectProp || this.handleSelect;
            var selectedTab = selectedTabProp || this.state.selectedTab || this.findDefault(this.props.children);

            var children = this.transformChildren(this.props.children, {
                handleSelect: handleSelect,
                selectedTab: selectedTab,
                activeLinkStyle: activeLinkStyle,
                visibleTabStyle: visibleTabStyle,
                name: name
            });

            return _react2.default.createElement(
                'div',
                divProps,
                children
            );
        }
    }]);

    return Tabs;
}(_react.Component);

Tabs.propTypes = {
    name: _react.PropTypes.string,
    handleSelect: _react.PropTypes.func,
    selectedTab: _react.PropTypes.string,
    activeLinkStyle: _react.PropTypes.object,
    visibleTabStyle: _react.PropTypes.object,
    renderActiveTabContentOnly: _react.PropTypes.bool
};

exports.default = Tabs;