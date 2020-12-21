<template>
    <CommonApplicationList :stateNames="stateNames" :operColumns="operColumns">
    </CommonApplicationList>

</template>
<script>
    import CommonApplicationList from './CommonApplicationList'
    export default {
        // name: 'CommonApplicationList',
        components: {
            CommonApplicationList
        },
        data() {
            return {
                stateNames: ['UNCOMMITTED'],
                operColumns: [{
                    type: 'link',
                    linkTo: item => '/submit/' + item.id,
                    linkName: '详情'
                }]
            }
        }
    }

</script>
