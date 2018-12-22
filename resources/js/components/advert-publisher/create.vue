<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Advert Publisher</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item  prop="details" :rules="$root.validate.required" label="Details">
                            <el-input  v-model="form.details"></el-input>

                        </el-form-item>
                        <el-form-item prop="tags"  label="tags">
                            <el-select
                                    v-model="form.tags"
                                    multiple
                                    filterable
                                    remote
                                    reserve-keyword
                                    placeholder="Please enter a keyword"
                                    :remote-method="search_tag"
                                    :loading="loading">
                                <el-option
                                        v-for="item in tags"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
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
                    details: '',
                },
                tags:[],
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/advertpublishers/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/advertpublishers/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            search_tag(query){
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
                this.$router.push({name: 'view-advert-publisher'})
            },
            onSubmit() {
                var vm = this

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/advertpublishers${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.$message({
                                type: 'success',
                                message: 'Advert Advertising has been created'
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