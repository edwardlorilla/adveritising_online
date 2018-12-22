<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Tag</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item prop="description" :rules="$root.validate.required" label="Details">
                            <el-input v-model="form.description"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button :disabled="disabled" type="primary" @click="onSubmit('form')">{{$route.params.id
                                ? 'Edit' : 'Create'}}
                            </el-button>
                            <el-button @click="onCancel">Cancel</el-button>
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

                form: {
                    description: '',
                    users:[]
                },
                users:[],
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/tags/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/tags/${to.params.id}`).then(function (response) {
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

                    vm.onSearchUser(query, vm)
                } else {
                    vm.loading = false
                    vm.tags = []
                }
            },
            onSearchUser: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/users/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.users = q.data.map(item => {
                        return {value: item.id, label: item.name};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
            setData(response){
                this.form = response
            },
            onCancel(){
                this.$router.push({name: 'view-tag'})
            },
            onSubmit() {
                var vm = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/tags${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.$message({
                                type: 'success',
                                message: 'Tag has been created'
                            })
                        }).catch(function (error) {
                            vm.disabled = false
                            if (error.response.statusText) {
                                vm.$message({
                                    type: 'error',
                                    message: error.response.statusText
                                })
                            }
                        })
                    }
                })

            }
        }
    }
</script>