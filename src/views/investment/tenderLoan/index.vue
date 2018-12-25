<template>
    <div class="tenderLoan">
        <div class="rate">
            <div class="content">
                <div class="left">
                    <p class="info">
                        <span class="span1">{{rate/100}}%</span>
                        <span class="span2">+</span>
                        <span class="span3">{{newUserRate/100}}%</span>
                    </p>
                    <p class="tip">期望年化回报率</p>
                </div>
                <div class="right">
                    <p class="info">{{parseInt(days/30)}}个月</p>
                    <p class="tip">投资期限</p>
                </div>
            </div>
        </div>

        <div class="count">
            <div class="content">
                <div class="calculation">
                    <mt-button class="reduce" :disabled="btnStatusReduce" @click="btnCount('reduce')">-</mt-button>
                    <div class="total">
                        <input class="fillMoney" type="number" v-model="money">
                    </div>
                    <mt-button class="add" :disabled="btnStatusAdd" @click="btnCount('add')">+</mt-button>
                </div>
                <p class="count-details">预计回报(Rp)<span>{{$globalFunction.formatMoney(backMoney)}}</span></p>
                <p class="count-details">起投金额(Rp)<span>≥{{$globalFunction.formatMoney(minMoney)}}</span></p>
                <p class="count-details">最大金额(Rp)<span>≤{{$globalFunction.formatMoney(maxMoney)}}</span></p>
                <p class="count-details" style="color: red;" v-show="warming">已超出最大投资金额</p>
            </div>
        </div>

        <div class="balance">
            <div class="content">
                <span class="left">账户余额(Rp)</span>
                <span class="right">{{$globalFunction.formatMoney(availableBalance)}}</span>
            </div>
        </div>

        <div class="agreeContract">
            <div class="content">
                <label class="ci-check-lable">
                    <input type="checkbox" v-model="reason">
                    <i></i>
                    <span class="info">我已阅读并同意<span class="agreement">《Rupiah One投资协议》</span>
                    </span>
                </label>

            </div>
        </div>

        <mt-button class="foot" @click="pay" :disabled="btnStatusPay" v-if="showPayBtn">确认支付Rp
            {{$globalFunction.formatMoney(money)}}
        </mt-button>
        <mt-button class="foot" @click="recharge" v-if="!showPayBtn">账户余额不足，立即充值</mt-button>

        <van-popup v-model="showPayment" position="bottom">
            <div class="payment">
                <div class="total">
                    <span class="space"></span>
                    <span class="money">支付 <span>Rp </span><span>{{$globalFunction.formatMoney(money)}}</span></span>
                    <i class="icon iconfont icon-cha" @click="closePopup"></i>
                </div>
                <div class="phone">已发送至手机号 <span> {{phone}}</span></div>
                <div class="code">
                    <input type="text" placeholder="请输入短信验证码" readonly v-model="code">
                    <mt-button class="send" size="small" @click="sendCode" :disabled="sendCodeStatus">{{codeText}}
                    </mt-button>
                </div>

                <mt-button class="makeTurePay" size="small" @click="makeTurePay">确认支付</mt-button>
                <van-number-keyboard
                        :show="show"
                        extra-key="."
                        delete-button-text="delete"
                        @input="onInput"
                        @delete="onDelete"
                />
            </div>
        </van-popup>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                reason: true,
                showPayment: false,
                show: true,
                code: '',
                money: '',
                rate: '',
                days: '',
                maxMoney: '',
                minMoney: '',
                newUserRate: '',
                backMoney: '',
                warming: false,
                btnStatusAdd: false,
                btnStatusReduce: false,
                btnStatusPay: false,
                sendCodeStatus: false,
                codeText: '发送验证码',
                phone: '',
                availableBalance: '',
                showPayBtn: true,
            }
        },
        created() {
            this.rate = this.$route.query.rate
            this.days = this.$route.query.days
            this.maxMoney = this.$route.query.maxMoney
            this.minMoney = this.$route.query.minMoney
            this.newUserRate = this.$route.query.newUserRate
            this.money = this.minMoney
            this.phone = JSON.parse(localStorage.getItem('userInfo')).phone
            this.availableBalance = JSON.parse(localStorage.getItem('accountInfo')).availableBalance
        },
        watch: {
            money: function (val, oldVal) {
                if (Number(val) > Number(this.maxMoney)) {
                    this.warming = true
                    this.btnStatusPay = true
                    this.btnStatusAdd = true
                    this.btnStatusReduce = false
                    this.availableBalanceCompare(val)
                } else if (Number(val) <= Number(this.minMoney)) {
                    this.btnStatusReduce = true
                    this.backMoney = parseInt(val * (Number(this.rate) + Number(this.newUserRate)) / 10000 * this.days / 365)
                    this.availableBalanceCompare(val)
                } else {
                    this.btnStatusAdd = false
                    this.btnStatusReduce = false
                    this.backMoney = parseInt(val * (Number(this.rate) + Number(this.newUserRate)) / 10000 * this.days / 365)
                    this.warming = false
                    this.btnStatusPay = false
                    this.availableBalanceCompare(val)
                }
            }
        },
        methods: {
            availableBalanceCompare(val) {
                if (val > this.availableBalance) {
                    this.showPayBtn = false
                } else {
                    this.showPayBtn = true
                }
            },
            sendCode() {
                this.$api.sendRequest('sendCaptchaSms', {
                    uuid: this.uuid,
                    globalCode: this.globalCode,
                    phone: this.phone,
                    captcha: this.captcha,
                }).then(res => {
                    if (res.code == 200) {
                        this.uuid = res.data.uuid
                        this.countDown(60)
                    }
                })
            },
            countDown(time) {
                if (time == 0) {
                    this.sendCodeStatus = false
                    this.codeText = '发送验证码'
                } else {
                    this.sendCodeStatus = true
                    this.codeText = `倒计时 ${time} s`
                    time--
                    timeout = setTimeout(() => {
                        this.countDown(time)
                    }, 1000)
                }
            },
            makeTurePay() {

            },
            onInput(value) {
                this.code += value
            },
            onDelete() {
                this.code = this.code.substring(0, this.code.length - 1)
            },
            btnCount(action) {
                if (action == 'add') {
                    this.money = Number(this.money) + Number((this.maxMoney - this.minMoney) / 10)
                } else {
                    this.money = Number(this.money) - Number((this.maxMoney - this.minMoney) / 10)
                }
            },
            pay() {
                this.showPayment = true
            },
            recharge() {
                alert('去充值')
            },
            closePopup() {
                this.showPayment = false
            }
        },
    }
</script>

<style scoped lang="scss">
    .tenderLoan {
        overflow: auto;
        height: 100vh;
        background-color: #F7F5F5;
        .rate {
            width: 750px;
            height: auto;
            background-color: #FFFFFF;
            padding: 60px 0 40px 0;
            .content {
                width: 720px;
                height: 130px;
                margin: 0 auto;
                display: flex;
                .left {
                    width: 50%;
                    text-align: center;
                    border-right: 2px solid #BBBBBB;
                    .info {
                        height: 70px;
                        line-height: 70px;
                        .span1 {
                            color: #3D70FD;
                            font-size: 55px;
                            font-weight: bolder;
                        }
                        .span2 {
                            color: #101010;
                            font-size: 28px;
                            margin-left: 10px;
                        }
                        .span3 {
                            color: #FF9800;
                            font-size: 40px;
                            font-weight: bolder;
                        }
                    }
                    .tip {
                        color: #979696;
                        font-size: 28px;
                        line-height: 80px;
                    }
                }
                .right {
                    width: 50%;
                    text-align: center;
                    .info {
                        font-weight: bolder;
                        color: #3D70FD;
                        font-size: 55px;
                        line-height: 70px;
                        height: 70px;
                    }
                    .tip {
                        color: #979696;
                        font-size: 28px;
                        line-height: 80px;
                    }
                }
            }
        }
        .count {
            width: 750px;
            height: auto;
            background-color: #FFFFFF;
            padding: 60px 0 40px 0;
            margin-top: 20px;
            .content {
                width: 650px;
                margin: 0 auto;
                .calculation {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                    .add {
                        width: 60px;
                        height: 60px;
                        font-size: 40px;
                        text-align: center;
                        padding: 0;
                    }
                    .reduce {
                        width: 60px;
                        height: 60px;
                        font-size: 40px;
                        text-align: center;
                    }
                    .total {
                        width: 400px;
                        height: 70px;
                        line-height: 70px;
                        font-size: 45px;
                        color: #3D70FD;
                        padding: 0;
                        overflow: hidden;
                        .fillMoney {
                            width: 400px;
                            height: 60px;
                            border: none;
                            border-bottom: 2px solid #BBBBBB;
                            text-align: center;
                        }

                    }
                }
                .count-details {
                    height: 60px;
                    line-height: 60px;
                    color: #979696;
                    font-size: 28px;
                    letter-spacing: 2px;
                    span {
                        margin-left: 30px;
                        color: #FF9800;
                    }
                }
            }
        }
        .balance {
            width: 750px;
            height: auto;
            background-color: #FFFFFF;
            margin-top: 20px;
            .content {
                width: 650px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                height: 80px;
                line-height: 80px;
                font-size: 28px;
                color: #979696;
                letter-spacing: 2px;
                .right {
                    color: #3D70FD;
                }
            }
        }
        .agreeContract {
            width: 750px;
            height: auto;
            /*background-color: #FFFFFF;*/
            margin-top: 20px;
            .content {
                width: 650px;
                margin: 0 auto;
                text-align: center;
                font-size: 28px;
                line-height: 50px;
                padding: 10px 0;
                letter-spacing: 1px;
                .info {
                    width: 93%;
                    .agreement {
                        color: #3D70FD;
                    }
                }
            }

        }
        .foot {
            width: 750px;
            height: 80px;
            line-height: 80px;
            letter-spacing: 2px;
            font-size: 28px;
            position: fixed;
            bottom: 0;
            text-align: center;
            background-color: #3D70FD;
            color: #FFFFFF;
        }
        .payment {
            width: 100%;
            height: 880px;
            font-size: 28px;
            .total {
                width: 100%;
                height: 80px;
                line-height: 80px;
                display: flex;
                justify-content: space-between;
                font-size: 32px;
                border-bottom: 2px solid rgba(187, 187, 187, 0.2);
                .space {
                    width: 10%;
                }
                .money {
                    width: 80%;
                    text-align: center;
                    span {
                        color: #3D70FD;
                    }
                }
                i {
                    margin-right: 15px;
                    font-weight: bold;
                }
            }
            .phone {
                width: 650px;
                height: 80px;
                line-height: 80px;
                margin: 20px auto;
                color: #101010;
                font-size: 32px;
            }
            .code {
                display: flex;
                justify-content: space-between;
                width: 650px;
                height: 80px;
                margin: 0 auto;
                color: #101010;
                input {
                    display: inline-block;
                    width: 450px;
                    border: 1px solid #BBBBBB;
                    text-indent: 20px;
                }
                .send {
                    width: 200px;
                    height: 80px;
                }
            }
            .makeTurePay {
                width: 650px;
                height: 80px;
                margin: 50px 50px;
            }

        }
        .ci-check-lable {
            margin: 0 auto;
            position: relative;
            display: flex;
            flex-wrap: wrap;
        }
        .ci-check-lable input {
            position: absolute;
            left: -9999px;
        }
        .ci-check-lable i {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 40px;
            outline: 0;
            border: 2px solid #ccc;
            border-radius: 50%;
            background: transparent;
        }
        .ci-check-lable input[type=checkbox]:checked + i {
            border: 1px solid #3D70FD;
            background-color: #3D70FD;
        }
        .ci-check-lable input[type=checkbox]:checked + i:after {
            position: absolute;
            content: '';
            top: 50%;
            left: 50%;
            margin-top: -8px;
            margin-left: -12px;
            -webkit-transform: rotate(-53deg);
            transform: rotate(-53deg);
            width: 23px;
            height: 7px;
            border: 5px solid #fff;
            border-top: 0;
            border-right: 0;
        }
        .mint-button {
            background-color: #4673F4;
            color: #ffffff;
            border-radius: 0;
        }
    }
</style>
