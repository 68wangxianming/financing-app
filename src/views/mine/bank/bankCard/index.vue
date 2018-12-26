<template>
    <div class="bankCard">
        <div class="navBar">
            <van-nav-bar title="银行卡" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="bankList">
            <div class="item" v-for="item in bankList">
                <div class="top">
                    <div class="bg" :style="{backgroundImage:'url('+item.bankLog+')'}"></div>
                    <span class="operation">解绑</span>
                </div>
                <div class="middle">
                    <span class="span1">****</span>
                    <span class="span2">**</span>
                    <span class="span3">{{item.card}}</span>
                </div>
                <div class="bottom"></div>
            </div>
        </div>
        <div class="addCard" @click="addCard">
            <mt-cell title="添加银行卡" is-link class="item">
            </mt-cell>
        </div>

        <inputPass :showPopUp="showPopUp" :Tip1="Tip1" :Tip2="Tip2" @closePopup="closePopup"></inputPass>
    </div>
</template>

<script>
    import inputPass from 'components/inputPass.vue'

    export default {
        data() {
            return {
                showPopUp: false,
                Tip1: '添加银行卡',
                Tip2: '请输入支付密码，已验证身份\n',
                bankList: [
                    {bankLog: require('./imgs/bca@3x.jpg'), card: '1000'},
                    {bankLog: require('./imgs/bri@3x.png'), card: '1001'},
                    {bankLog: require('./imgs/mandiri@3x.png'), card: '1002'},
                    {bankLog: require('./imgs/mandiri@3x.png'), card: '1002'},
                    {bankLog: require('./imgs/mandiri@3x.png'), card: '1002'},
                    {bankLog: require('./imgs/mandiri@3x.png'), card: '1002'},
                ],
                password: ''
            }
        },
        created() {
            this.$listener.$on('password', data => {
                console.log(data, '拿到数据');
                this.password = data
                this.checkPass(this.password)
            })
        },
        methods: {
            checkPass(num) {
                console.log(num, 'success');
                this.$listener.$emit('checkError', 'error')
            },
            addCard() {
                this.showPopUp = true
            },
            closePopup() {
                this.showPopUp = false
            },
            onClickLeft() {
                this.$router.push('/dataMangement')
            }
        },
        components: {
            inputPass
        }

    }
</script>

<style scoped lang="scss">
    .bankCard {
        width: 750px;
        overflow: auto;
        height: 100vh;
        background-color: #F5F5F5;
        .bankList {
            width: 700px;
            margin: 0 auto;
            margin-top: 120px;
            .item {
                background-color: #FFFFFF;
                width: 700px;
                height: 270px;
                border: 2px solid #3E70FD;
                border-radius: 10px;
                margin-top: 30px;
                font-size: 28px;
                color: #3E70FD;
                .top {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    height: 70px;
                    line-height: 70px;
                    .bg {
                        width: 100px;
                        height: 70px;
                        background: url("imgs/bca@3x.jpg") no-repeat center;
                        background-size: contain;
                        margin-left: 20px;
                    }
                    .operation {
                        color: #3E70FD;
                        margin-right: 20px;
                    }
                }
                .middle {
                    display: flex;
                    height: 100px;
                    line-height: 100px;
                    font-size: 64px;
                    font-weight: 600;
                    letter-spacing: 2px;
                    .span1 {
                        margin-left: 100px;
                    }
                    .span2 {
                        margin-left: 80px;
                    }
                    .span3 {
                        margin-left: 80px;
                    }
                }

                .bottom {
                    width: 100%;
                    height: 60px;
                    background-color: #3E70FD;
                    margin-top: 20px;
                }
            }
        }
        .addCard {
            width: 100%;
            height: 80px;
            background-color: #F9F7F7;
            margin-top: 20px;
            img {
                width: 36px;
                height: 36px;
            }
        }
    }
</style>
