<template>
    <div class="dataMangement">
        <div class="navBar">
            <van-nav-bar
                    title="资料管理"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="manage">
            <div class="content">
                <mt-cell title="基本信息" is-link class="item" to="/baseInfo">
                    <img slot="icon" src="./img/1.png" class="logo">
                    <img src="./img/check.png" class="check" v-if="fillStatus">
                    <span class="warming" v-if="!fillStatus">未填写</span>
                </mt-cell>
                <mt-cell title="银行卡" is-link class="item" to="/bankCard">
                    <img slot="icon" src="./img/2.png" class="logo">
                </mt-cell>
            </div>
        </div>

        <mt-button class="invest" size="small" @click="goPage('/tenderLoan')">提交</mt-button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                profileInfo: {},
                fillStatus: false
            }
        },
        created() {
            this.getProfileInfo()
        },
        methods: {
            getProfileInfo() {
                this.$api.sendRequest('getProfileInfo').then(res => {
                    if (res.data.profileInfo) {
                        this.fillStatus = true
                        this.profileInfo = res.data.profileInfo
                    }
                })
            },
            goPage() {

            },
            onClickLeft() {
                this.$router.push('/mine')
            },
        }
    }
</script>

<style scoped lang="scss">
    .dataMangement {
        width: 100%;
        height: 100vh;
        background-color: #F5F5F5;
        .manage {
            margin-top: 88px;
            background-color: #FFFFFF;
            padding: 20px 0;
            .content {
                width: 700px;
                margin: 0 auto;
                .item {
                    display: flex;
                    height: 70px;
                    line-height: 70px;
                    font-size: 28px;
                    .logo {
                        position: absolute;
                        width: 45px;
                        height: 40px;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                    .check {
                        width: 38px;
                        height: 38px;
                    }
                    .warming {
                        font-size: 28px;
                    }
                }
                .item:last-child {
                    border-bottom: 0px;
                }
            }
        }

        .invest {
            width: 700px;
            margin: 40px 25px;
            background: #3D70FD;
            color: #FFFFFF;
            letter-spacing: 3px;
        }
    }
</style>
