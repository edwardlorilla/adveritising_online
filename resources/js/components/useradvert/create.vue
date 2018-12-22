<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="never">
                    <div slot="header">
                        <span>Add Advert</span>
                    </div>
                    <el-form ref="form" @submit.native.prevent="onSubmit" :model="form" label-width="120px">
                        <el-form-item prop="advertpublisher_id" :rules="$root.validate.required" label="Advert Publisher">
                            <el-select
                                    style="width: 100%;"
                                    size="small"
                                    v-model="form.advertpublisher_id"
                                    :disabled="disabled"
                                    filterable
                                    remote
                                    required
                                    placeholder="Enter Advert Publisher Keyword"
                                    :remote-method="search_advertpublisher"
                                    :loading="loading">
                                <el-option
                                        v-for="(item, index) in advertpublishers"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="details" :rules="$root.validate.required" label="Details">
                            <el-input v-model="form.details"></el-input>
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
                    advertpublisher_id: ''
                },
                advertpublishers:[],
                loading: false,
                disabled: false
            }
        },
        beforeRouteEnter (to, from, next) {
            if (to.params.id) {
                axios.get(`/api/adverts/${to.params.id}`).then(function (response) {
                    next(vm => vm.setData(response.data))
                })
            } else {
                next()
            }
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            if (to.params.id) {
                axios.get(`/api/adverts/${to.params.id}`).then(function (response) {
                    vm.setData(response.data)
                    next()
                })
            } else {
                next()
            }
        },
        methods: {
            setData(response){
                this.form = response
            },
            onCancel(){
                this.$router.push({name: 'view-advert'})
            },
            onSubmit() {
                var vm = this

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        vm.disabled = true
                        let id = vm.$route.params.id;
                        axios[id ? 'put' : 'post'](`/api/adverts${id ? `/${id}` : ''}`, vm.form).then(function () {
                            vm.disabled = false
                            vm.$message({
                                type: 'success',
                                message: 'Advert has been created'
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

            },
            search_advertpublisher(query){
                var vm = this
                if (query !== '') {
                    vm.onSearchAdvertPublisher(query, vm)
                } else {
                    vm.loading = false
                    vm.advertpublishers = []
                }
            },
            onSearchAdvertPublisher: _.debounce(function (query, vm) {
                vm.loading = true
                axios.get('/api/advertpublishers/search?search=' + query).then(function (q) {
                    vm.loading = false
                    vm.advertpublishers = q.data.map(item => {
                        return {value: item.id, label: item.details};
                    })
                }).catch(function () {
                    vm.loading = false
                })
            }, 350),
        }
    }
</script>