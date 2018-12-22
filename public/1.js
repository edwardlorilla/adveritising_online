webpackJsonp([1],{

/***/ 244:
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
            errors: {},
            form: {
                name: '',
                email: '',
                password: '',
                confirmed: '',
                tags: []
            },
            tags: [],
            loading: false,
            disabled: false
        };
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            axios.get('/api/users/' + to.params.id).then(function (response) {
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
            axios.get('/api/users/' + to.params.id).then(function (response) {
                vm.setData(response.data);
                next();
            });
        } else {
            next();
        }
    },

    methods: {
        search_user: function search_user(query) {
            var vm = this;
            if (query !== '') {

                vm.onSearchTag(query, vm);
            } else {
                vm.loading = false;
                vm.tags = [];
            }
        },

        onSearchTag: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/tags/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.tags = q.data.map(function (item) {
                    return { value: item.id, label: item.description };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
        setData: function setData(response) {
            var vm = this;
            vm.tags = response.tags.map(function (item) {
                return { value: item.id, label: item.description };
            });
            vm.form = response;
            vm.form.tags = _.map(response.tags, 'id');
        },
        onCancel: function onCancel() {
            this.$router.push({ name: 'view-user' });
        },
        onSubmit: function onSubmit() {
            var vm = this;
            this.$refs.form.validate(function (valid) {
                if (valid) {
                    vm.disabled = true;
                    var id = vm.$route.params.id;
                    axios[id ? 'put' : 'post']('/api/users' + (id ? '/' + id : ''), vm.form).then(function () {
                        vm.disabled = false;
                        vm.$message({
                            type: 'success',
                            message: 'User has been created'
                        });
                        vm.errors = {};
                    }).catch(function (error) {
                        console.log(error.response);
                        vm.disabled = false;
                        if (error.response.statusText) {
                            vm.$message({
                                type: 'error',
                                message: error.response.statusText
                            });
                        }
                        if (error.response.data.errors && error.response.data.message) {
                            vm.errors = error.response.data.errors;
                        }
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 245:
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
                    _c("span", [_vm._v("Add User")])
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
                            prop: "name",
                            rules: _vm.$root.validate.required,
                            label: "Name"
                          }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.name,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "name", $$v)
                              },
                              expression: "form.name"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          staticClass: "is-required",
                          class: _vm.errors.email ? "is-error" : "",
                          attrs: { prop: "email", label: "Email" }
                        },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.email,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "email", $$v)
                              },
                              expression: "form.email"
                            }
                          }),
                          _vm._v(" "),
                          _vm._l(_vm.errors.email, function(error) {
                            return _vm.errors.email
                              ? _c(
                                  "div",
                                  { staticClass: "el-form-item__error" },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(error) +
                                        "\n                        "
                                    )
                                  ]
                                )
                              : _vm._e()
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "password",
                            rules: _vm.$route.params.id
                              ? {}
                              : _vm.$root.validate.required,
                            label: "Password"
                          }
                        },
                        [
                          _c("el-input", {
                            attrs: { type: "password" },
                            model: {
                              value: _vm.form.password,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "password", $$v)
                              },
                              expression: "form.password"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        {
                          attrs: {
                            prop: "confirmed",
                            rules: _vm.$route.params.id
                              ? {}
                              : _vm.$root.validate.required,
                            label: "Confirm Password"
                          }
                        },
                        [
                          _c("el-input", {
                            attrs: { type: "password" },
                            model: {
                              value: _vm.form.confirmed,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "confirmed", $$v)
                              },
                              expression: "form.confirmed"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { prop: "tags", label: "Tags" } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: {
                                multiple: "",
                                filterable: "",
                                remote: "",
                                "reserve-keyword": "",
                                placeholder: "Please enter a keyword",
                                "remote-method": _vm.search_user,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.tags,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "tags", $$v)
                                },
                                expression: "form.tags"
                              }
                            },
                            _vm._l(_vm.tags, function(item) {
                              return _c("el-option", {
                                key: item.value,
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
                        "el-button",
                        {
                          attrs: { disabled: _vm.disabled, type: "primary" },
                          on: {
                            click: function($event) {
                              _vm.onSubmit("form")
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                                " +
                              _vm._s(_vm.$route.params.id ? "Edit" : "Create") +
                              "\n                            "
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
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-474fa276", module.exports)
  }
}

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(47)
/* script */
var __vue_script__ = __webpack_require__(244)
/* template */
var __vue_template__ = __webpack_require__(245)
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
Component.options.__file = "resources/js/components/user/create.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-474fa276", Component.options)
  } else {
    hotAPI.reload("data-v-474fa276", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});