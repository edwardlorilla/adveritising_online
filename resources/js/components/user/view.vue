<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Add User"
                   on-delete="/api/users"
                   on-edit-name="edit-user"
                   on-create-name="create-user"
                   :userAdvert="true"
                   @delete="data.splice($event, 1)"
        >


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
                columns: [
                    {
                        label: 'Name',
                        prop: 'name'
                    },{
                        label: 'Email',
                        prop: 'email'
                    },
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/users`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get('/api/users', {params: to.query}).then(function (response) {
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