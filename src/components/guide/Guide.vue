<template>
    <div class="cont">
        <div class="box">
            <div class="left">
                <div class="first">
                    <div class="title"><b>01</b>注册账号</div>
                    <p>注册一个CIM平台账号，可以使用数字化移交系统，进行数字化工程认证申请资料提交</p>
<!--                    <span>立即注册</span>-->
                </div>
                <div class="first common">
                    <div class="title"><b>03</b>工程资料和模型关联</div>
                    <p>工程三维模型资料上传完以后，可以进行工程图档资料和模型关联操作</p>
<!--                    <span>去看看</span>-->
                </div>
                <div class="first common">
                    <div class="title"><b>05</b>查询认证报告</div>
                    <p>在一定工作日后，可以查询认证报告，如若没有，可能资料不齐全，可在主页-需补充材料里修改</p>
                    <span><router-link :to="{path: '/search'}">去看看</router-link></span>
                </div>
            </div>
            <div class="center">
                <div class="img1">
                    <img src="../../assets/images/jtou.png" alt="">
                </div>
                <div class="img2">
                    <img src="../../assets/images/jtou.png" alt="">
                </div>
            </div>
            <div class="right">
                <div class="first">
                    <div class="title"><b>02</b>提交工程资料</div>
                    <p>用户登录后，提交工程全部资料，包括三维模型、地理信息、图档资料、影像资料等</p>
                    <span><router-link :to="{path:'/projectApply'}">去看看</router-link></span>
                </div>
                <div class="first common">
                    <div class="title"><b>04</b>提交申请</div>
                    <p>完成工程资料上传、模型关联后，提交认证申请</p>
<!--                    <span>去看看</span>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {

    }

</script>
<style lang="less" scoped>
    .cont {
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .box {
        width: 1200px;
        height: 700px;
        position: relative;
        left: 236px;
        top: 90px;
        display: flex;

        &>div {
            flex: 1;
        }

        .common {
            margin-top: 102px;
        }

        .left,
        .right .first .title {
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 33px;

            b {
                font-size: 24px;
                font-family: Impact;
                color: rgba(75, 194, 255, 1);
                line-height: 29px;
                margin-right: 10px;
                margin-left: -35px;
            }
        }

        .left .first p {
            width: 300px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 20px;
            margin-top: 8px;
            margin-bottom: 16px;
        }

        .left .first span {
            display: block;
            width: 160px;
            height: 40px;
            background: rgba(5, 40, 94, 1);
            font-size: 16px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            cursor: pointer;
        }

        .img1 {
            position: absolute;
            top: 55px;
        }

        .img2 {
            position: absolute;
            top: 279px;
        }

        .right .first p {
            width: 300px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 20px;
            margin-top: 8px;
            margin-bottom: 16px;
        }

        .right .first span {
            display: block;
            width: 160px;
            height: 40px;
            background: rgba(5, 40, 94, 1);
            font-size: 16px;
            text-align: center;
            line-height: 40px;
            color: #fff;
            cursor: pointer;
        }
    }

    a{
        color: #fff;
    }
</style>
