<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   on-delete="/api/useradverts"
                   on-edit-name="edit-useradvert"
                   @delete="data.splice($event, 1)"
                   :toolbar="false"
        >
            <el-table-column
                    label="Advert"
                    prop="tag">
                <template slot-scope="scope">
                    <span style="margin-right: 3px;" v-for="advertpublisher in scope.row.tag.advertpublishers"><el-tag :key="advertpublisher.id" >{{advertpublisher.details}}</el-tag></span>
                </template>
            </el-table-column>

        </grid-view>
    </div>
</template>
<style>
</style>
<script>
    import GridView from './../Table/Grid.vue'
    export default{
        data(){
            return {
                columns: [{
                    label: 'Tag',
                    prop: 'tag.description'
                }, {
                    label: 'User name',
                    prop: 'user.name'
                }
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/useradverts`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data)
                )
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get('/api/useradverts', {params: to.query}).then(function (response) {
                vm.setData(response.data)
                next()
            })
        },
        methods: {
            setData(response){
                this.data = response
            },
        }
    }
</script>