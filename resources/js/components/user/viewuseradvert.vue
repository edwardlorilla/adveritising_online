<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   on-delete="/api/useradverts"
                   on-edit-name="edit-useradvert"
                   @delete="data.splice($event, 1)"
                   :toolbar="false"
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
                columns: [{
                    label: 'Advert Publisher',
                    prop: 'advertpublisher.details'
                }, {
                    label: 'Tag description',
                    prop: 'tag.description'
                }
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/users/adverts/${to.params.id}`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data)
                )
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get(`/api/users/adverts/${to.params.id}`, {params: to.query}).then(function (response) {
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