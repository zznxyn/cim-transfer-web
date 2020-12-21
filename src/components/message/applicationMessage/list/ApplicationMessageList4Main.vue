<template>
    <CimTable :url="url" :columns="columns" :pagination=false :tableHeight="tableHeight"></CimTable>
</template>
<script>
import CimTable from '../../../common/table'
export default {
    components: {
        CimTable
    },
    data() {
        return {
            url: '/transfer/applicationMessages',
            tableHeight: '100%',
            columns: [
                {
                    label: '留言内容',
                    prop: 'content'
                },
                {
                    label: '时间',
                    prop: 'createdAt',
                    type: 'date',
                    align:'center'
                }
            ]
        }
    }
}
</script>
