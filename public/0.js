webpackJsonp([0],{

/***/ 255:
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
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {

            form: {
                details: '',
                advertpublisher_id: ''
            },
            advertpublishers: [],
            loading: false,
            disabled: false
        };
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            axios.get('/api/adverts/' + to.params.id).then(function (response) {
                next(function (vm) {
                    return vm.setData(response.data);
                });
            });
        } else {
            next();
        }
    },
    beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
        var vm = this;
        if (to.params.id) {
            axios.get('/api/adverts/' + to.params.id).then(function (response) {
                vm.setData(response.data);
                next();
            });
        } else {
            next();
        }
    },

    methods: {
        setData: function setData(response) {
            this.form = response;
        },
        onCancel: function onCancel() {
            this.$router.push({ name: 'view-advert' });
        },
        onSubmit: function onSubmit() {
            var vm = this;

            this.$refs.form.validate(function (valid) {
                if (valid) {
                    vm.disabled = true;
                    var id = vm.$route.params.id;
                    axios[id ? 'put' : 'post']('/api/adverts' + (id ? '/' + id : ''), vm.form).then(function () {
                        vm.disabled = false;
                        vm.$message({
                            type: 'success',
                            message: 'Advert has been created'
                        });
                    }).catch(function (error) {
                        vm.disabled = false;
                        if (error.response.statusText) {
                            vm.$message({
                                type: 'error',
                                message: error.response.statusText
                            });
                        }
                    });
                }
            });
        },
        search_advertpublisher: function search_advertpublisher(query) {
            var vm = this;
            if (query !== '') {
                vm.onSearchAdvertPublisher(query, vm);
            } else {
                vm.loading = false;
                vm.advertpublishers = [];
            }
        },

        onSearchAdvertPublisher: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/advertpublishers/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.advertpublishers = q.data.map(function (item) {
                    return { value: item.id, label: item.details };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350)
    }
});

/***/ }),

/***/ 256:
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
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "never" } },
                [
                  _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                    _c("span", [_vm._v("Add Advert")])
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-form",
                    {
                      ref: "form",
                      attrs: { model: _vm.form, "label-width": "120px" },
                      nativeOn: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.onSubmit($event)
                        }
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "advertpublisher_id",
                            rules: _vm.$root.validate.required,
                            label: "Advert Publisher"
                          }
                        },
                        [
                          _c(
                            "el-select",
                            {
                              staticStyle: { width: "100%" },
                              attrs: {
                                size: "small",
                                disabled: _vm.disabled,
                                filterable: "",
                                remote: "",
                                required: "",
                                placeholder: "Enter Advert Publisher Keyword",
                                "remote-method": _vm.search_advertpublisher,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.advertpublisher_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "advertpublisher_id", $$v)
                                },
                                expression: "form.advertpublisher_id"
                              }
                            },
                            _vm._l(_vm.advertpublishers, function(item, index) {
                              return _c("el-option", {
                                key: index,
                                attrs: { label: item.label, value: item.value }
                              })
                            }),
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "details",
                            rules: _vm.$root.validate.required,
                            label: "Details"
                          }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.details,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "details", $$v)
                              },
                              expression: "form.details"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                disabled: _vm.disabled,
                                type: "primary"
                              },
                              on: {
                                click: function($event) {
                                  _vm.onSubmit("form")
                                }
                              }
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$route.params.id ? "Edit" : "Create"
                                ) + "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("el-button", { on: { click: _vm.onCancel } }, [
                            _vm._v("Cancel")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
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
    require("vue-hot-reload-api")      .rerender("data-v-fa4a0e1e", module.exports)
  }
}

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(47)
/* script */
var __vue_script__ = __webpack_require__(255)
/* template */
var __vue_template__ = __webpack_require__(256)
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
Component.options.__file = "resources/js/components/useradvert/create.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fa4a0e1e", Component.options)
  } else {
    hotAPI.reload("data-v-fa4a0e1e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});