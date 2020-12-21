<template>
    <CimTable :url="url" :columns="columns" :showIndex="true"></CimTable>
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
            columns: [
                {
                    label: '留言内容',
                    prop: 'content',
                    length: 130,
                    align:'left'
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
