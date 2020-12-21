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
            url: 'message/notices',
            tableHeight: '100%',
            columns: [
                {
                    label: '通知',
                    prop: 'title'
                },
                {
                    label: '发布时间',
                    prop: 'publishedAt',
                    type: 'date',
                    align:'center'
                }
            ]
        }
    }
}
</script>
