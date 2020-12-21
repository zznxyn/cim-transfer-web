<template>
    <CimTable :url="url" :columns="columns" :searchParams="searchParams"></CimTable>
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
                searchParams: [{
                        label: '公告标题',
                        placeholder: '请输入公告标题',
                        prop: 'title'
                    },
                    {
                        label: '发布日期',
                        placeholder: '请选择',
                        prop: 'publishedAt',
                        type: 'date'
                    },
                ],
                columns: [{
                        label: '标题',
                        prop: 'title'
                    },
                    {
                        label: '发布人',
                        prop: 'creatorName'
                    },
                    {
                        label: '发布时间',
                        prop: 'publishedAt'
                    }
                ]
            }
        }
    }

</script>
