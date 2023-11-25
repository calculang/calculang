(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export table */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return order; });
/* unused harmony export order_row */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return customer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return item; });
/* harmony import */ var _items_cul_js_cul_scope_id_3_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _customers_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
const table = ({}) => [
{ order: 1, customer: 1, item: 'A' },
{ order: 2, customer: 1, item: 'B' },
{ order: 3, customer: 2, item: 'B' }];


const order = ({ order_in }) => order_in;
const order_row = ({ order_in }) => table({}).find((d) => d.order == order({ order_in }));
const customer = ({ order_in }) => order_row({ order_in }).customer;
const item = ({ order_in }) => order_row({ order_in }).item;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export table */
/* unused harmony export customer_ */
/* unused harmony export customer_row */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rating; });
/* harmony import */ var _items_cul_js_cul_scope_id_3_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
const table = ({}) => [
{
  customer: 1, name: 'Adam', rating: 101 },
{ customer: 2, name: 'Eve', rating: 105 }];


const customer_ = ({ customer_in }) => customer_in;
const customer_row = ({ order_in }) => table({}).find((d) => d.customer == Object(_orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__[/* customer */ "a"])({ order_in }));
const name = ({ order_in }) => customer_row({ order_in }).name;
const rating = ({ order_in }) => customer_row({ order_in }).rating;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export table */
/* unused harmony export item_ */
/* unused harmony export item_row */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sales_price; });
/* harmony import */ var _customers_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
const table = ({}) => [
{ item: 1, sales_price: 1000 },
{ item: 2, sales_price: 1500 }];


const item_ = ({ item_in }) => item_in;
const item_row = ({ order_in }) => table({}).find((d) => d.item == Object(_orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__[/* item */ "b"])({ order_in }));
const sales_price = ({ order_in }) => item_row({ order_in }).sales_price;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "order", function() { return _orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "customer", function() { return _orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "item", function() { return _orders_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony import */ var _customers_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "name", function() { return _customers_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rating", function() { return _customers_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony import */ var _items_cul_js_cul_scope_id_3_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sales_price", function() { return _items_cul_js_cul_scope_id_3_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_2__["a"]; });

 // driving keys





/***/ })
/******/ ]);
});
//# sourceMappingURL=join.js.map