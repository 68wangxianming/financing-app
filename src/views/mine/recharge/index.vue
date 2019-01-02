<template>
    <div class="recharge">
        <div class="navBar">
            <van-nav-bar title="充值" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="noRecharge" v-if="showRecharge">
            <div class="content">
                <input type="text" placeholder="请输入充值金额" v-model="amount">
                <p class="minChargeAmount">最小充值金额 {{$globalFunction.formatMoney(MinChargeAmount)}}</p>
            </div>
        </div>
        <div class="recharged" v-if="!showRecharge">
            <div class="content">
                <p class="p1">当前待充值 Rp {{$globalFunction.formatMoney(invoiceInfo.amount)}} </p>
                <p class="p2">虚拟账号过期倒计时：{{hours}}h {{minutes}}m {{seconds}}s</p>
                <p class="p3" @click="cancel">取消</p>
            </div>
        </div>

        <mt-button class="immediateRecharge" size="small" @click="immediateRecharge" :disabled="rechargeStatus"
                   v-if="showRecharge">立即充值
        </mt-button>
        <mt-button class="immediateRecharge" size="small" @click="continueRecharge" v-if="!showRecharge">继续充值
        </mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                amount: '',
                showRecharge: true,
                invoiceInfo: {},
                rechargeStatus: true,
                MinChargeAmount: '',
                countTime: '',
                hours: '',
                minutes: '',
                seconds: '',
                intervalId: null,
                chargeNo: ''
            }
        },
        created() {
            this.getUnPaidInvoice()
            this.getMinChargeAmount()
        },
        watch: {
            amount(val, oldVal) {
                if (val > this.MinChargeAmount) {
                    this.rechargeStatus = false
                } else {
                    this.rechargeStatus = true
                }
            }
        },
        methods: {
            getUnPaidInvoice() {//获取订单
                this.$api.sendRequest('getUnPaidInvoice').then(res => {
                    this.invoiceInfo = res.data && res.data.invoiceInfo || {}
                    if (res.data && res.data.invoiceInfo.chargeNo) {
                        this.chargeNo = res.data.invoiceInfo.chargeNo
                        this.showRecharge = false
                        this.daojishi();
                        this.intervalId = setInterval(() => this.daojishi(), 1000)
                    } else {
                        this.showRecharge = true
                    }
                })
            },
            getMinChargeAmount() {//获取最低投资金额
                this.$api.sendRequest('getMinChargeAmount').then(res => {
                    this.MinChargeAmount = res.data && res.data.minAmount || ''
                })
            },
            immediateRecharge() {
                this.$router.push({
                    query: {amount: this.amount},
                    path: '/rechargePrompt'
                })
            },
            continueRecharge() {//传给原生
                alert(this.invoiceInfo.redirectUrl)
            },
            cancel() {
                this.$messagebox({
                    title: 'Notice',
                    message: 'Are you sure?',
                    showCancelButton: true
                }).then(action => {
                    if (action == 'confirm') {
                        this.$indicator.open({
                            spinnerType: 'fading-circle'
                        });
                        this.$api.sendRequest('cancelChargeInvoice', {
                            chargeNo: this.chargeNo,
                            note: 'cancel'
                        }).then(res => {
                            if (res.code == 200) {
                                this.$indicator.close();
                                this.showRecharge = true
                            }
                        })
                    }
                });
            },
            daojishi() {
                let diff = this.invoiceInfo.expireTime - Date.now();
                if (diff > 0) {
                    this.hours = parseInt(diff / 3600000); //计算剩余的小时
                    this.minutes = parseInt(diff / 1000 / 60 % 60);//计算剩余的分钟
                    this.seconds = parseInt(diff / 1000 % 60);//计算剩余的秒数
                    this.hours = this.hours.toString().padStart(2, "0");
                    this.minutes = this.minutes.toString().padStart(2, "0");
                    this.seconds = this.seconds.toString().padStart(2, "0");
                } else {
                    this.intervalId && (clearInterval(this.intervalId));
                    this.showRecharge = true
                }
            },
            onClickLeft() {
                this.$router.push('/home')
            }
        }
    }
</script>

<style scoped lang="scss">
    .recharge {
        width: 750px;
        background-color: #F5F5F5;
        overflow: auto;
        height: 100vh;
        .noRecharge {
            width: 750px;
            height: 300px;
            background-color: #FFFFFF;
            margin-top: 88px;
            input {
                width: 500px;
                height: 100px;
                margin-left: 150px;
                margin-top: 100px;
                font-size: 60px;
                border: none;
                border-bottom: 1px solid #BBBBBB;
                text-align: center;
            }
            .minChargeAmount {
                text-align: center;
                line-height: 100px;
                font-size: 28px;
                color: red;
            }
            input::-webkit-input-placeholder {
                color: #3D70FD;
            }
        }
        .recharged {
            width: 750px;
            background-color: #FFFFFF;
            border: 1px solid #FFFFFF;
            .content {
                width: 700px;
                margin: 70px 25px 25px 30px;
                .p1 {
                    width: 700px;
                    line-height: 60px;
                    font-size: 36px;
                    color: #3D70FD;
                    text-align: center;
                }
                .p2 {
                    width: 700px;
                    line-height: 50px;
                    color: #101010;
                    text-align: center;
                    font-size: 32px;
                    margin-top: 20px;
                }
                .p3 {
                    width: 700px;
                    line-height: 60px;
                    font-size: 32px;
                    color: #3D70FD;
                    text-align: right;
                    margin-top: 20px;
                }
            }

        }

        .immediateRecharge {
            width: 700px;
            margin: 50px 25px;
            background: #3D70FD;
            color: #FFFFFF;
            letter-spacing: 3px;
        }
    }
</style>
