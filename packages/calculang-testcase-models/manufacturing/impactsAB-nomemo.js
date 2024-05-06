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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return units; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return price; });
/* unused harmony export price_multiplier */
/* unused harmony export step */
/* harmony import */ var _impactsAB_nomemo_cul_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _base_cul_cul_scope_id_4_cul_parent_scope_id_2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _base_cul_cul_scope_id_4_cul_parent_scope_id_2__WEBPACK_IMPORTED_MODULE_2__["b"]; });

 // this model takes inputs base price and units, and a price_multiplier.
// it derives a proposed price by applying the multiplier and derives consequent units, constrained to the demand curve below.

// via an additional input step_in it provides a mini reconciliation (if you can call it that) feature, moving units from the amount reflecting the update to the demand curve (when step_in is 0)
// back to the base unit value (when step_in is 1) i.e. giving the results without the demand curve impact.

// both revenue and units are impacted by the step input (and profit, and any other units-dependent functions throughout the complete model: this works no matter how complicated the base model)

// 'mini' is because price is already updated throughout the steps - step is really just acting like a switch here.
// A real reconciliation should move through all the inputs, and should be structured more logically (as in a model-of- a more general model, separated), but this is just for testing

// this tests some key language features of calculang and demos their technical motivations

 // don't pollute the _ modifier

//export { revenue, units_, price_ };

// import { all } from './base.cul.js'; TODO use this in place of above when I fix issue #13
// export { all };

const units = ({ step_in, units_in, price_in, price_multiplier_in }) =>
step({ step_in }) >= 1 ? Object(_base_cul_cul_scope_id_4_cul_parent_scope_id_2__WEBPACK_IMPORTED_MODULE_2__[/* units_ */ "c"])({ units_in }) + (price({ price_in, price_multiplier_in }) - Object(_base_cul_cul_scope_id_4_cul_parent_scope_id_2__WEBPACK_IMPORTED_MODULE_2__[/* price_ */ "a"])({ price_in })) * -0.005 : Object(_base_cul_cul_scope_id_4_cul_parent_scope_id_2__WEBPACK_IMPORTED_MODULE_2__[/* units_ */ "c"])({ units_in });
const price = ({ price_in, price_multiplier_in }) => Object(_base_cul_cul_scope_id_4_cul_parent_scope_id_2__WEBPACK_IMPORTED_MODULE_2__[/* price_ */ "a"])({ price_in }) * price_multiplier({ price_multiplier_in });

// new inputs
const price_multiplier = ({ price_multiplier_in }) => price_multiplier_in;
const step = ({ step_in }) => step_in;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return units; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return price; });
/* harmony import */ var _impactsAB_nomemo_cul_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _base_cul_cul_scope_id_3_cul_parent_scope_id_1__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _base_cul_cul_scope_id_3_cul_parent_scope_id_1__WEBPACK_IMPORTED_MODULE_2__["a"]; });




const units = ({}) => 100;
const price = ({}) => 500;

// this fixes (or constrains) the 2 inputs in base, so that this model is independent of inputs
// e.g. revenue() and profit() can be called without inputs and the values specified above are used

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "revenue_impact", function() { return revenue_impact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "profit_impact", function() { return profit_impact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "costs_impact", function() { return costs_impact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "units_impact", function() { return units_impact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "price_impact", function() { return price_impact; });
/* harmony import */ var _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A_revenue", function() { return _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A_profit", function() { return _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["profit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A_costs", function() { return _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["costs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A_units", function() { return _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A_price", function() { return _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["b"]; });

/* harmony import */ var _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "B_revenue", function() { return _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "B_profit", function() { return _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["profit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "B_costs", function() { return _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["costs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "B_units", function() { return _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "B_price", function() { return _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["b"]; });



 // model A
 // model B // sometimes B goes through cul loader before A!

 // should fail without this, but doesn't? : => internally everything effectively exported by webpack (maybe just b/c module concatenation plugin)

const revenue_impact = ({ step_in, units_in, price_in, price_multiplier_in }) => Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* revenue */ "d"])({}) - Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__[/* revenue */ "d"])({ step_in, units_in, price_in, price_multiplier_in }); // todo units, price, or maybe generate via impacts loader
const profit_impact = ({}) => Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["profit"])({}) - Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["profit"])({});
const costs_impact = ({}) => Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__["costs"])({}) - Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__["costs"])({});
const units_impact = ({ step_in, units_in, price_in, price_multiplier_in }) => Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* units */ "e"])({}) - Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__[/* units */ "e"])({ step_in, units_in, price_in, price_multiplier_in });
const price_impact = ({ price_in, price_multiplier_in }) => Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* price */ "b"])({}) - Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_1__[/* price */ "b"])({ price_in, price_multiplier_in });

// because concatenation module doesn't use the 'as' part, it does some of its own renaming instead

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return revenue; });
/* unused harmony export costs */
/* unused harmony export profit */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return units_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return price_; });
/* harmony import */ var _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _impactsAB_nomemo_cul_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
const revenue = ({ step_in, units_in, price_in, price_multiplier_in }) => {
  return Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* units */ "e"])({ step_in, units_in, price_in, price_multiplier_in }) * Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* price */ "b"])({ price_in, price_multiplier_in });
};

// variable costs only, OK for testing
const costs = ({ step_in, units_in, price_in, price_multiplier_in }) => 100 * Object(_price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* units */ "e"])({ step_in, units_in, price_in, price_multiplier_in });

const profit = ({ step_in, units_in, price_in, price_multiplier_in }) => revenue({ step_in, units_in, price_in, price_multiplier_in }) - costs({ step_in, units_in, price_in, price_multiplier_in });

// inputs
const units_ = ({ units_in }) => units_in;
const price_ = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return revenue; });
/* unused harmony export costs */
/* unused harmony export profit */
/* unused harmony export units_ */
/* unused harmony export price_ */
/* harmony import */ var _revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _impactsAB_nomemo_cul_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _price_change_reconciliation_cul_js_cul_scope_id_2_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
const revenue = ({}) => {
  return Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* units */ "e"])({}) * Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* price */ "b"])({});
};

// variable costs only, OK for testing
const costs = ({}) => 100 * Object(_revenue_fixed_inputs_cul_js_cul_scope_id_1_cul_parent_scope_id_0__WEBPACK_IMPORTED_MODULE_0__[/* units */ "e"])({});

const profit = ({}) => revenue({}) - costs({});

// inputs
const units_ = ({ units_in }) => units_in;
const price_ = ({ price_in }) => price_in;

// ?? what if an explicit import in base referred back to A or B?

/***/ })
/******/ ]);
});
//# sourceMappingURL=impactsAB-nomemo.js.map