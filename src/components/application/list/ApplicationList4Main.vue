<!-- 主页使用 -->
<template>
    <CimTable :url="url" :columns="columns" :params="params" :pagination=false :tableHeight="tableHeight">
    </CimTable>
</template>
<script>
    import CimTable from '../../common/table'
    export default {
        components: {
            CimTable
        },
        props: {
            stateNames: {
                type: Array,
                default () {
                    return []
                }
            },
            columns: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data() {
            return {
                url: '/transfer/applications',
                tableHeight: '100%',
                params: {
                    stateNames: [],
                },
            }
        },
        created() {
            this.params.stateNames = this.stateNames
        }
    }

</script>
