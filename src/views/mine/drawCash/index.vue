<template>
    <div class="drawCash">
        <div class="navBar">
            <van-nav-bar title="提现" left-arrow @click-left="onClickLeft"/>
        </div>

        <div class="head">
            <span>可提现总金额:</span> <span class="money">Rp: {{$globalFunction.formatMoney(freezeBalance)}}</span>
        </div>
        <div class="infoList">
            <div class="content">
                <van-field v-model="withdrawAmount" clearable label="提现金额" placeholder="请输入提现金额"
                           :error-message="withdrawAmountWarming"/>
                <van-field v-model="bankName" clearable label="提现银行" placeholder="请输入银行" readonly>
                    <span slot="button" class="change" @click="chooseBank">修改</span>
                </van-field>
                <van-field v-model="bankCard" clearable label="提现银行卡" placeholder="请输入银行卡" readonly>
                    <span slot="button" class="change" @click="chooseBank">修改</span>
                </van-field>
            </div>
        </div>

        <mt-button class="invest" size="small" @click="makeSure" :disabled="makeSureBtnStatus">确认提现</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                withdrawAmount: '',
                bankId: '',
                bankName: '',
                bankCard: '',
                freezeBalance: '',
                withdrawAmountWarming: '',
                makeSureBtnStatus: true,
                minAmount: ''
            }
        },
        watch: {
            withdrawAmount(val, oldVal) {
                if (this.withdrawAmount > this.freezeBalance) {
                    this.withdrawAmountWarming = '输入金额要小于可提现总额'
                    this.makeSureBtnStatus = true
                } else {
                    if (this.withdrawAmount < this.minAmount) {
                        this.withdrawAmountWarming = `最低提现金额${this.minAmount}`
                        this.makeSureBtnStatus = true
                    } else {
                        this.withdrawAmountWarming = ``
                        this.makeSureBtnStatus = false
                    }
                }
            }
        },
        created() {
            this.freezeBalance = JSON.parse(localStorage.getItem('accountInfo')).freezeBalance
            this.bankName = this.$route.query.name
            this.bankCard = this.$route.query.number
            this.bankId = this.$route.query.id
            this.getMinWithdrawAmount()
        },
        methods: {
            getMinWithdrawAmount() {
                this.$api.sendRequest('getMinWithdrawAmount').then(res => {
                    console.log(res);
                    this.minAmount = res.data.minAmount
                })
            },
            makeSure() {
                this.$api.sendRequest('submitWithdraw', {
                    bankId: Number(this.bankId),
                    withdrawAmount: Number(this.withdrawAmount)
                }).then(res => {
                    if (res.data.result) {
                        this.$messagebox({
                            title: '提示',
                            message: '操作成功',
                        }).then(action => {
                            if (action == 'confirm') {
                                this.$router.push('/home')
                            }
                        })
                    }
                })
            },
            onClickLeft() {
                this.$router.push('/home')
            },
            chooseBank() {
                this.$router.push('/bankCard')
            }
        }
    }
</script>

<style scoped lang="scss">
    .drawCash {
        width: 100%;
        background-color: #F5F5F5;
        height: 100vh;
        font-size: 28px;
        .head {
            background-color: #FFFFFF;
            width: 750px;
            margin-top: 88px;
            margin-bottom: 30px;
            height: 100px;
            line-height: 100px;
            text-indent: 48px;
            .money {
                margin-left: 25px;
                color: #3D70FD;
            }
        }
        .infoList {
            background-color: #FFFFFF;
            width: 750px;
            .content {
                width: 720px;
                margin: 0 auto;
                .change {
                    color: #3D70FD;
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
