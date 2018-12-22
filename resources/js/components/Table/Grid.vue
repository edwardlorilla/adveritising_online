<template>
    <div>
        <el-row >
            <el-col v-if="onCreateName" :span="6">
                <el-button  type="primary" @click="$router.push({ name: onCreateName})">{{createName}}</el-button>
            </el-col>
        </el-row>
        <el-table :data="data"
                  v-loading="loading"
                  style="width: 100%">
            <slot></slot>
            <el-table-column
                    v-for="(column, index) in columns"
                    :key="index"
                    :label="column.label"
                    :prop="column.prop">
            </el-table-column>

            <el-table-column
                    v-if="toolbar"
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="search"
                              @input="search_"
                              size="mini"
                              placeholder="Type to search"/>
                </template>
                <template slot-scope="scope">
                        <el-button v-if="userAdvert"  @click="$router.push({name: 'advert-user', params:{id: scope.row.id}})" type="primary" size="mini" slot="button">User Advert</el-button>
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">Edit
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>
    export default{
        props: {
            userAdvert:{
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
        data(){
            return {
                search: null,
                loading: false
            }
        },
        methods: {
            search_(){
                var vm = this
                vm.onSearch(vm.search, vm)
            },
            onSearch: _.debounce(function (query, vm) {
                var vm = this;
                vm.loading = true
                vm.$router.push({
                    path: `${vm.$route.path}`,
                    query: {search: query}
                }, function () {
                    vm.loading = false
                }, function () {
                    vm.loading = false
                });
            }, 500),
            handleEdit(index, row) {
                var vm = this
                vm.$router.push({name: vm.onEditName, params: {id: row.id}})
            },
            handleDelete(index, row) {
                var vm = this
                vm.loading = true
                vm.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`${vm.onDelete ? vm.onDelete : '/api/agencies'}/${row.id}`)
                    vm.$emit('delete', index)
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                    vm.loading = false
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                    vm.loading = false
                });
            }
        }
    }
</script>