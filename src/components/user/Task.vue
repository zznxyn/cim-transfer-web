<template>
    <ApplicationTaskList :stateNames="stateNames" :operColumns="operColumns"></ApplicationTaskList>
</template>

<script>
import ApplicationTaskList from '../application/list/ApplicationTaskList'
export default {
    components: {
        ApplicationTaskList
    },
    data() {
        return {
            stateNames:['DISMISSED'],
            operColumns:[{
                type:'link',
                linkTo:item => '/task/' + item.id,
                linkName:'修改资料'
            }]
        }
    }
}
</script>
