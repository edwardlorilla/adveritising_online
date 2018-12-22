<template>
    <div>
        <grid-view :columns="columns"
                   :data="data"
                   create-name="Add Advert"
                   on-delete="/api/adverts"
                   on-edit-name="edit-advert"
                   on-create-name="create-advert"
                   @delete="data.splice($event, 1)"
        ></grid-view>
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
                        label: 'Detail',
                        prop: 'details'
                    },
                    {
                        label: 'Advert Publisher',
                        prop: 'advertpublisher.details'
                    },
                ],
                data: []
            }
        },
        components: {
            GridView,
        },
        beforeRouteEnter (to, from, next) {
            axios.get(`/api/adverts`, {params: to.query}).then(function (response) {
                next(vm => vm.setData(response.data))
            })
        },
        beforeRouteUpdate (to, from, next) {
            var vm = this
            axios.get('/api/adverts', {params: to.query}).then(function (response) {
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