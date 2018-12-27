<template>
    <div class="onlineService">
        <div class="navBar">
            <van-nav-bar title="在线客服" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="top">
            <div class="logo"></div>
            <div class="tipInfo">
                <span>Hi，亲爱的用户</span> <br>
                <span>有任何问题，都可以通过Facebook、Whatsapp或Line与我交流，我将及时为您解答~</span>
            </div>
        </div>

        <div class="manage">
            <div class="content">
                <div @click="goApp('facebook',faceServiceAccount)">
                    <mt-cell title="点击启动Facebook" is-link class="item">
                        <img slot="icon" src="./imgs/FaceBook.png" class="logo">
                    </mt-cell>
                </div>
                <div @click="goApp('whatsapp',whatServiceAccount)">
                    <mt-cell title="点击启动Whatsapp" is-link class="item">
                        <img slot="icon" src="./imgs/whatsapp.png" class="logo">
                    </mt-cell>
                </div>
                <div @click="goApp('line',lineServiceAccount)">
                    <mt-cell title="点击启动Line" is-link class="item">
                        <img slot="icon" src="./imgs/line.png" class="logo">
                    </mt-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                faceServiceAccount: '',
                lineServiceAccount: '',
                whatServiceAccount: '',
            }
        },
        created() {
            this.getServiceFacebook()
            this.getServiceLine()
            this.getServiceWhatsapp()
        },
        methods: {
            getServiceFacebook() {
                this.$api.sendRequest('getServiceFacebook').then(res => {
                    if (res.data.serviceAccount) {
                        this.faceServiceAccount = res.data.serviceAccount
                    }
                })
            },
            getServiceLine() {
                this.$api.sendRequest('getServiceLine').then(res => {
                    if (res.data.serviceAccount) {
                        this.lineServiceAccount = res.data.serviceAccount
                    }
                })
            },
            getServiceWhatsapp() {
                this.$api.sendRequest('getServiceWhatsapp').then(res => {
                    if (res.data.serviceAccount) {
                        this.whatServiceAccount = res.data.serviceAccount
                    }
                })
            },
            onClickLeft() {
                this.$router.push('/home')
            },
            goApp(str, code) {
                console.log(code);
                this.$indicator.open()
                let that = this;
                this.$jsBridge.dispatch({
                    handlerName: 'jumpToService',
                    params: [str, code],
                    callback: ({data, msg, code}) => {
                        that.$indicator.close()
                        if (!data.result.res) {
                            that.$messagebox({
                                title: '提示',
                                message: '没装'
                            })
                        }
                    }
                });

            }
        }
    }
</script>

<style scoped lang="scss">
    .onlineService {
        width: 100%;
        height: 100vh;
        background-color: #F5F5F5;
        .top {
            display: flex;
            width: 100%;
            height: 500px;
            line-height: 40px;
            background-color: rgba(229, 229, 229, 1);
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0);
            justify-content: space-between;
            margin-top: 88px;
            .logo {
                width: 200px;
                height: 200px;
                background: url(./imgs/logo.png) 0 0 no-repeat;
                background-size: 100%;
                margin-left: 40px;
                margin-top: 130px;
            }
            .tipInfo {
                width: 400px;
                text-align: left;
                margin-right: 40px;
                margin-top: 140px;
                color: white;
                font-size: 28px;
            }
        }

        .manage {
            background-color: #FFFFFF;
            margin-top: 20px;
            .content {
                .item {
                    display: flex;
                    height: 70px;
                    line-height: 70px;
                    font-size: 28px;
                    .logo {
                        position: absolute;
                        width: 42px;
                        height: 42px;
                        top: 50%;
                        transform: translate(0, -50%);
                    }

                }
                .item:last-child {
                    border-bottom: 0px;
                }
            }
        }
    }
</style>
