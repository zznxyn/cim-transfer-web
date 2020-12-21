<template>
    <el-row type="flex" justify="center" align="middle">
        <el-col :span="12">
            <img src="@/assets/images/tc.png" alt @click="logout" style="cursor:pointer" />
        </el-col>
    </el-row>
</template>
<script>
    export default {
        methods: {
            logout() {
                this.$http.get('/ajaxLogout', {}).then(data => {
                    window.sessionStorage.clear();
                    //sessionStorage.removeItem('token');
                    this.$router.push("/login");
                    //window.location.reload();
                });
                 
            }
        },
    }

</script>
