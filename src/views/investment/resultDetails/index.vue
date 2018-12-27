<template>
    <div class="resultDetails">
        <div class="detailsList">
            <div class="content">
                <van-steps direction="vertical" :active="0" active-color="#f44">
                    <van-step>
                        <p><span>{{this.timeConversion(Date.parse(new Date()))}}</span>成功支付Rp{{$globalFunction.formatMoney(money)}}</p>
                    </van-step>
                    <van-step>
                        <p><span>{{this.timeConversion(Date.parse(new Date())+86400000)}}</span>开始计算收益</p>
                    </van-step>
                    <van-step>
                        <p><span>{{this.timeConversion(Date.parse(new Date())+172800000)}}</span>收益到账</p>
                    </van-step>
                </van-steps>

                <mt-button class="makeTurePay" size="small" @click="goRecord">确认支付
                </mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                day2: ''
            }
        },
        created() {
            this.money = this.$route.query.money
        },
        methods: {
            goRecord() {
                this.$router.push('/investmentRecord')
            },
            timeConversion(str) {
                let now = new Date(str);
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                return year + "-" + month + "-" + date;
            }
        }
    }
</script>

<style scoped lang="scss">
    .resultDetails {
        width: 100%;
        height: 100vh;
        background-color: #F7F5F5;
        .detailsList {
            width: 100%;
            height: auto;
            background-color: #FFFFFF;
            .content {
                width: 700px;
                margin: 0 auto;
                padding: 30px 0;
                p {
                    margin-left: 30px;
                    span{
                        margin-right: 20px;
                    }
                }
                .makeTurePay {
                    width: 650px;
                    height: 80px;
                    margin: 30px 20px;
                    background-color: #3D70FD;
                    color: #FFFFFF;
                }
            }
        }
    }
</style>
