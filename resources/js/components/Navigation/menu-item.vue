<template>
    <el-menu-item :index="index" :route="{name: data.route}">
        <i class="el-icon-menu"></i>
        <span>{{data.text}}</span>
    </el-menu-item>
</template>
<script>
    export default{
        props:{
            data: Object,
            index: String
        }
    }
</script>