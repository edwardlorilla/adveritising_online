webpackJsonp([10],{

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(219)
}
var normalizeComponent = __webpack_require__(47)
/* script */
var __vue_script__ = __webpack_require__(221)
/* template */
var __vue_template__ = __webpack_require__(222)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/advert-publisher/view.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d763f94", Component.options)
  } else {
    hotAPI.reload("data-v-8d763f94", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(47)
/* script */
var __vue_script__ = __webpack_require__(216)
/* template */
var __vue_template__ = __webpack_require__(217)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Table/Grid.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-92c5d39c", Component.options)
  } else {
    hotAPI.reload("data-v-92c5d39c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        userAdvert: {
            type: Boolean,
            default: false
        },
        toolbar: {
            type: Boolean,
            default: true
        },
        createName: String,
        onCreateName: String,
        onEditName: String,
        onDelete: String,
        data: Array,
        columns: Array
    },
    data: function data() {
        return {
            search: null,
            loading: false
        };
    },

    methods: {
        search_: function search_() {
            var vm = this;
            vm.onSearch(vm.search, vm);
        },

        onSearch: _.debounce(function (query, vm) {
            var vm = this;
            vm.loading = true;
            vm.$router.push({
                path: '' + vm.$route.path,
                query: { search: query }
            }, function () {
                vm.loading = false;
            }, function () {
                vm.loading = false;
            });
        }, 500),
        handleEdit: function handleEdit(index, row) {
            var vm = this;
            vm.$router.push({ name: vm.onEditName, params: { id: row.id } });
        },
        handleDelete: function handleDelete(index, row) {
            var _this = this;

            var vm = this;
            vm.loading = true;
            vm.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(function () {
                axios.delete((vm.onDelete ? vm.onDelete : '/api/agencies') + '/' + row.id);
                vm.$emit('delete', index);
                _this.$message({
                    type: 'success',
                    message: 'Delete completed'
                });
                vm.loading = false;
            }).catch(function () {
                _this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
                vm.loading = false;
            });
        }
    }
});

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-row",
        [
          _vm.onCreateName
            ? _c(
                "el-col",
                { attrs: { span: 6 } },
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary" },
                      on: {
                        click: function($event) {
                          _vm.$router.push({ name: _vm.onCreateName })
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.createName))]
                  )
                ],
                1
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-table",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.loading,
              expression: "loading"
            }
          ],
          staticStyle: { width: "100%" },
          attrs: { data: _vm.data }
        },
        [
          _vm._t("default"),
          _vm._v(" "),
          _vm._l(_vm.columns, function(column, index) {
            return _c("el-table-column", {
              key: index,
              attrs: { label: column.label, prop: column.prop }
            })
          }),
          _vm._v(" "),
          _vm.toolbar
            ? _c("el-table-column", {
                attrs: { align: "right" },
                scopedSlots: _vm._u([
                  {
                    key: "header",
                    fn: function(scope) {
                      return [
                        _c("el-input", {
                          attrs: {
                            size: "mini",
                            placeholder: "Type to search"
                          },
                          on: { input: _vm.search_ },
                          model: {
                            value: _vm.search,
                            callback: function($$v) {
                              _vm.search = $$v
                            },
                            expression: "search"
                          }
                        })
                      ]
                    }
                  },
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        _vm.userAdvert
                          ? _c(
                              "el-button",
                              {
                                attrs: {
                                  slot: "button",
                                  type: "primary",
                                  size: "mini"
                                },
                                on: {
                                  click: function($event) {
                                    _vm.$router.push({
                                      name: "advert-user",
                                      params: { id: scope.row.id }
                                    })
                                  }
                                },
                                slot: "button"
                              },
                              [_vm._v("User Advert")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { size: "mini" },
                            on: {
                              click: function($event) {
                                _vm.handleEdit(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("Edit\n                ")]
                        ),
                        _vm._v(" "),
                        _c(
                          "el-button",
                          {
                            attrs: { size: "mini", type: "danger" },
                            on: {
                              click: function($event) {
                                _vm.handleDelete(scope.$index, scope.row)
                              }
                            }
                          },
                          [_vm._v("Delete\n                ")]
                        )
                      ]
                    }
                  }
                ])
              })
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-92c5d39c", module.exports)
  }
}

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(220);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(78)("5ec0df2c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d763f94\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-8d763f94\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./view.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(77)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Table_Grid_vue__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Table_Grid_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Table_Grid_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            columns: [{
                label: 'Detail',
                prop: 'details'
            }],
            data: []
        };
    },

    components: {
        GridView: __WEBPACK_IMPORTED_MODULE_0__Table_Grid_vue___default.a
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        axios.get('/api/advertpublishers', { params: to.query }).then(function (response) {
            next(function (vm) {
                return vm.setData(response.data);
            });
        });
    },
    beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
        var vm = this;
        axios.get('/api/advertpublishers', { params: to.query }).then(function (response) {
            vm.setData(response.data);
            next();
        });
    },

    methods: {
        setData: function setData(response) {
            this.data = response;
        }
    }
});

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("grid-view", {
        attrs: {
          columns: _vm.columns,
          data: _vm.data,
          "create-name": "Add Advertise Publisher",
          "on-delete": "/api/advertisepublisher",
          "on-edit-name": "edit-advert-publisher",
          "on-create-name": "create-advert-publisher"
        },
        on: {
          delete: function($event) {
            _vm.data.splice($event, 1)
          }
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8d763f94", module.exports)
  }
}

/***/ })

});