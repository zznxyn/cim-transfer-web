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
                stateNames: ['AUDITED'],
                operColumns: [{
                    type: 'link',
                    linkTo: item => '/completed/' + item.id,
                    linkName: '查看'
                }, {
                    type: 'button',
                    clicked: item => {
                        this.$http.get('/transfer/authReport', {
                            authRequestNo: item.authRequestNo
                        }).then(data => {
                            this.$store.commit('report/reportSearch', data);
                            this.$router.push('/report');
                        })
                    },
                    name: '下载报告'
                }, ]
            }
        }
    }

</script>
