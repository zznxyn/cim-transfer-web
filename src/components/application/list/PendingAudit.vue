<template>
    <CommonApplicationList :stateNames="stateNames" :operColumns="operColumns"></CommonApplicationList>
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
                stateNames: ['PENDINGAUDIT'],
                operColumns: [{
                    type: 'link',
                    linkTo: item => '/reviewed/' + item.id,
                    linkName: '待审核'
                } ]
            }
        }
    }
</script>
