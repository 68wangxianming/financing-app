<template>
    <div class="rechargePrompt">
        <div class="top">
            <p class="note1"><span>应还总金额</span> (Rp) </p>
            <p class="totalMoney">{{$globalFunction.formatMoney(amount)}}</p>
            <p class="note2">选择还款方式</p>

        </div>

        <van-collapse v-model="activeNames">
            <van-collapse-item title="Bank Transfer" name="1">
                <p v-for="item in fastPayWayLists" class="item" @click="goPage(item.pg_code)">
                    <img :src=item.imgUrl class="logo">
                    <span class="bank">{{item.pg_name}}</span>
                </p>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                amount: '',
                activeNames: ['1'],
                fastPayWayLists: [],
                defaultUrl: {name: "default", imgUrl: require('./imgs/default.png'),},
                bankList: [
                    {
                        name: "bca",
                        imgUrl: require('./imgs/bca.png'),
                    },
                    {
                        name: "bni",
                        imgUrl: require('./imgs/bni.png'),
                    },
                    {
                        name: "bri",
                        imgUrl: require('./imgs/bri.png'),
                    },
                    {
                        name: "btn",
                        imgUrl: require('./imgs/btn.png'),
                    },
                    {
                        name: "cimbniaga",
                        imgUrl: require('./imgs/cimbniaga.png'),
                    },
                    {
                        name: "mandiri",
                        imgUrl: require('./imgs/mandiri.png'),
                    },
                    {
                        name: "may",
                        imgUrl: require('./imgs/may.png'),
                    },
                    {
                        name: "ocbc",
                        imgUrl: require('./imgs/ocbc.png'),
                    },
                    {
                        name: "panin",
                        imgUrl: require('./imgs/panin.png'),
                    },
                    {
                        name: "permata",
                        imgUrl: require('./imgs/permata.jpg'),
                    },
                ],
                bankMap: new Map()
            }
        },
        created() {
            this.amount = this.$route.query.amount
            this.bankList.forEach(v => {
                this.bankMap.set(v.name, v.imgUrl);
            })
            this.getPaymentChannel()
        },
        methods: {
            getPaymentChannel() {
                this.$indicator.open({
                    spinnerType: 'fading-circle'
                });
                this.$api.sendRequest('getPaymentChannel').then(res => {
                    this.fastPayWayLists = res && res.data && res.data.paymentChannel || ''
                    this.fastPayWayLists.forEach((v) => {
                        v.imgUrl = this.bankMap.get(v.pg_name.toLocaleLowerCase().split(" ")[0]) || this.defaultUrl.imgUrl;
                    })
                    this.$indicator.close();
                })
            },
            goPage(code) {
                this.$indicator.open({
                    spinnerType: 'fading-circle'
                });
                this.$api.sendRequest('createCharge', {
                    amount: this.amount,
                    paymentChannel: code
                }).then(res => {
                    let url = res.data && res.data.invoiceInfo && res.data.invoiceInfo.redirectUrl || ''
                    console.log(url);
                    this.$indicator.close();
                })

            },
        }
    }
</script>

<style scoped lang="scss">
    .rechargePrompt {
        width: 750px;
        height: 100vh;
        overflow: auto;
        background-color: #F5F5F5;
        .top {
            width: 100%;
            height: 400px;
            background-color: #FFFFFF;
            border-bottom: 1px solid #F5F5F5;
            .note1 {
                text-align: center;
                font-size: 28px;
                color: #979696;
                line-height: 100px;
                padding-top: 70px;
                letter-spacing: 1px;
            }
            .totalMoney {
                text-align: center;
                font-size: 72px;
                color: #3E70FD;
            }
            .note2 {
                line-height: 200px;
                font-size: 28px;
                color: #979696;
                text-indent: 30px;
            }
        }

        .item {
            display: flex;
            justify-content: space-between;
            color: #979696;
            font-size: 16px;
            .logo {
                width: 260px;
                height: 100px;
                margin: 10px 0;
            }
            .bank {
                width: 260px;
                height: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 100px;
                text-align: right;
                padding-right: 20px;
            }
        }
    }
</style>
