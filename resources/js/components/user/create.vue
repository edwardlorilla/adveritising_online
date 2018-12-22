<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add User</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item prop="name" :rules="$root.validate.required" label="Name">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item :class="errors.email ? 'is-error' : ''" class="is-required" prop="email"  label="Email">
                            <el-input v-model="form.email"></el-input>
                            <div v-if="errors.email" v-for="error in errors.email" class="el-form-item__error">
                                {{error}}
                            </div>
                        </el-form-item>
                        <el-form-item  prop="password" :rules="$route.params.id ? {} : $root.validate.required"  label="Password">
                            <el-input type="password" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item prop="confirmed" :rules="$route.params.id ? {} : $root.validate.required" label="Confirm Password">
                            <el-input type="password" v-model="form.confirmed"></el-input>
                        </el-form-item>
                            <el-form-item prop="tags"  label="Tags">
                                <el-select
                                        v-model="form.tags"
                                        multiple
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder="Please enter a keyword"
                                        :remote-method="search_user"
                                        :loading="loading">
                                    <el-option
                                            v-for="item in tags"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                                <el-button :disabled="disabled" type="primary" @click="onSubmit('form')">
                                    {{$route.params.id
                                    ? 'Edit' : 'Create'}}
                                </el-button>
                                <el-button @click="onCancel">Cancel</el-button>
                            </el-form-item>
                        </el-form-item>
                    </el-form>
                </el-card>

            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                errors:{},
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
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/users/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/users/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            search_user(query){
                var vm = this
                if (query !== '') {

                    vm.onSearchTag(query, vm)
                } else {
                    vm.loading = false
                    vm.tags = []
                }
            },
            onSearchTag: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/tags/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.tags = q.data.map(item => {
                        return {value: item.id, label: item.description};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            setData(response){
                var vm = this
                vm.tags = response.tags.map(item => {
                        return {value: item.id, label: item.description};
            })
                vm.form = response
                vm.form.tags = _.map(response.tags, 'id')
            },
            onCancel(){
                this.$router.push({name: 'view-user'})
            },
            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/users${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.$message({
                                type: 'success',
                                message: 'User has been created'
                            })
                            vm.errors = {}
                        }).catch(function (error) {
                            console.log(error.response)
                            vm.disabled = false
                            if (error.response.statusText) {
                                vm.$message({
                                    type: 'error',
                                    message: error.response.statusText
                                })
                            }
                            if (error.response.data.errors && error.response.data.message){
                                vm.errors = error.response.data.errors
                            }
                        })
                    }
                }
            )

            }
        }
    }
</script>