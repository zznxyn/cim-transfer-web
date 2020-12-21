<template>
    <div></div>
</template>
<script>
    export default {

        methods: {
            async redirectMain() {
                let mensus = this.$store.state.rightList;
                let indexPath = this.$store.state.dispatchPath;
                if (mensus === undefined || indexPath == undefined) {
                    let data = await this.getMens();
                    mensus = data.menus;
                    indexPath = data.index;
                }
                this.$router.push(indexPath);
            },
            async getMens() {
                const data = await this.$http.get('/base/system/getUserPermission', {
                    systemCode: 2
                });
                this.$store.commit('login/setRightList', data.menus);
                this.$store.commit('login/setDispatchPath', data.index);
                return data;
            },
            async getUser() {
                const data = await this.$http.post('/base/system/user/current');
                sessionStorage.setItem('realName', data.realName);
            },
        },
        created() {
            this.redirectMain();
            this.getUser();
        }
    }

</script>
