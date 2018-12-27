<template>
    <div class="bankCard">
        <div class="navBar">
            <van-nav-bar title="银行卡" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="bankList">
            <div class="item" v-for="(item,index) in bankList" :key="index" @click="chooseBank(item)">
                <div class="top">
                    <div class="bg">{{item.bankName}}</div>
                    <span class="operation" @click="unbindBankCard(item.id)">解绑</span>
                </div>
                <div class="middle">
                    <span class="span1">****</span>
                    <span class="span2">**</span>
                    <span class="span3">{{item._number}}</span>
                </div>
                <div class="bottom"></div>
            </div>
        </div>
        <div class="addCard" @click="addCard">
            <mt-cell title="添加银行卡" is-link class="item">
            </mt-cell>
        </div>

        <inputPass :showPopUp="showPopUp" :Tip1="Tip1" :Tip2="Tip2" @closePopup="closePopup"
                   :showType="showType"></inputPass>
    </div>
</template>

<script>
    import inputPass from 'components/inputPass.vue'

    export default {
        data() {
            return {
                id: null,
                showPopUp: false,
                Tip1: '添加银行卡',
                Tip2: '请输入支付密码，已验证身份\n',
                bankList: [],
                password: '',
                payPassword: '',
                currentPage: 1,
                perPage: 10,
                showType: '',//判断调用inputPass 是那种情况
            }
        },
        created() {
            this.$listener.$on('password', data => {
                this.password = data.password
                this.checkPass(this.password, data.showType)
            })
            this.getBankCardList()
        },
        methods: {
            getBankCardList() {
                this.$api.sendRequest('getBankCardList', {
                    currentPage: this.currentPage,
                    perPage: this.perPage
                }).then(res => {
                    if (res.data.items) {
                        res.data.items.forEach(v => {
                            v._number = v.number.slice(v.number.length - 4, v.number.length)
                            v.bankName = v.bankInfo && v.bankInfo.name || ''
                        })
                        this.bankList = res.data.items
                    }
                })
            },
            checkPass(num, type) {
                let typeChoose = type
                this.$api.sendRequest('verifyPayPassword', {
                    payPassword: num
                }).then(res => {
                    if (res.data.result) {
                        if (typeChoose == 'addCard') {
                            this.$router.push('/addBankCard')
                        } else {
                            this.unbindBankCardResult()
                        }
                    } else {
                        this.$listener.$emit('checkError', 'error')
                    }
                })
            },
            addCard() {
                this.$api.sendRequest('getUserInfo').then(res => {
                    if (res.data.userInfo.payPassword) {
                        this.payPassword = res.data.payPassword
                        this.showPopUp = true
                        this.showType = 'addCard'
                    } else {
                        this.$messagebox({
                            title: '提示',
                            message: '请去设置下设置支付密码',
                            showCancelButton: true
                        }).then(action => {
                            if (action == 'confirm') {
                                this.$router.push('/setPass')
                            }
                        })
                    }
                })
            },
            unbindBankCard(id) {
                this.id = id
                this.showPopUp = true
                this.Tip1 = '解绑银行卡'
                this.showType = 'unbindBankCard'
            },
            unbindBankCardResult() {
                this.$api.sendRequest('unbindBankCard', {
                    id: this.id
                }).then(res => {
                    if (res.data.result) {
                        this.$messagebox({
                            title: '提示',
                            message: '解绑成功',
                        }).then(action => {
                            if (action == 'confirm') {
                                this.$router.push('/dataMangement')
                            }
                        })
                    }
                })
            },
            closePopup() {
                this.showPopUp = false
            },
            onClickLeft() {
                this.$router.push('/dataMangement')
            },
            chooseBank(item) {
                this.$router.push({
                    path: 'drawCash',
                    query: {
                        name: item.bankInfo.name,
                        code: item.bankInfo.code,
                        id: item.id,
                        number: item.number
                    }
                })
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
                        width: 450px;
                        height: 70px;
                        margin-left: 20px;
                        overflow: hidden;
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
