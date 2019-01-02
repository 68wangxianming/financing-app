<template>
    <div class="mine">
        <div class="navBar">
            <van-nav-bar title="我的"/>
        </div>
        <div class="income">
            <div class="content">
                <div class="head">
                    <img src="./img/head.png" alt="">
                    <span>{{userInfo.phone}}</span>
                </div>
                <div class="middle">
                    <p class="info1">昨日收益(Rp)</p>
                    <p class="info2">{{income}}</p>
                </div>
                <div class="bottom">
                    <div class="left">
                        <p>总资产(Rp)</p>
                        <p>{{totalAssets}}</p>
                    </div>
                    <div class="right">
                        <p>累计收益(Rp)</p>
                        <p>{{accountInfo.incomeBalance}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="operation">
            <div class="content">
                <div class="item info">
                    <span class="tip">可用余额(Rp)</span>
                    <span class="money">{{accountInfo.availableBalance}}</span>
                </div>
                <div class="item handle">
                    <mt-button class="btn" @click="drawCash">提现</mt-button>
                    <mt-button class="btn" @click="recharge">充值</mt-button>
                </div>
            </div>
        </div>

        <div class="record">
            <div class="content">
                <div class="details">
                    <div class="item" v-for="item in recordList" @click="goRecord(item.path)">
                        <div class="imgBuild"
                             :style="{ 'background': 'url(' +item.url+ ') no-repeat center center', 'background-size': 'contain'}">
                        </div>
                        <p>{{item.info}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="manage">
            <div class="content">
                <mt-cell title="早起打卡" is-link class="item">
                    <img slot="icon" src="./img/1.png" class="logo">
                </mt-cell>
                <mt-cell title="邀请送现金" is-link class="item">
                    <img slot="icon" src="./img/2.png" class="logo">
                </mt-cell>
                <mt-cell title="投资排行榜" is-link class="item">
                    <img slot="icon" src="./img/3.png" class="logo">
                </mt-cell>
                <mt-cell title="在线客服" is-link class="item" to="/onlineService">
                    <img slot="icon" src="./img/4.png" class="logo">
                </mt-cell>
                <mt-cell title="设置" is-link class="item" to="/setUp">
                    <img slot="icon" src="./img/5.png" class="logo">
                </mt-cell>
            </div>
        </div>

        <unlogin :showPopUp="showPopUp" v-if="showPopUp" @closePopup="closeUnlogin"></unlogin>


        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script>
    import unlogin from 'components/unLogin.vue'

    export default {
        data() {
            return {
                showPopUp: false,
                userInfo: {},
                accountInfo: {},
                income: '',
                totalAssets: '',
                recordList: [
                    {url: require('./img/record1.png'), info: '资金流水', path: '/moneyFlow'},
                    {url: require('./img/record2.png'), info: '投资记录', path: '/investmentRecord'},
                    {url: require('./img/record3.png'), info: '资料管理', path: '/dataMangement'},
                ]
            }
        },
        created() {
            this.$store.dispatch('FLASH_ADMIN_TOKEN');
            if (this.$store.state.adminToken == 'null') {
            } else {
                this.getUserInfo()
                this.getAccountInfo()
                this.getYesterdayEarning()//昨日收益
            }
        },
        methods: {
            getUserInfo() {
                this.$api.sendRequest('getUserInfo').then(res => {
                    if (res && res.code == 200) {
                        this.userInfo = res.data && res.data.userInfo || ''
                        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
                    }
                })
            },
            getAccountInfo() {
                this.$api.sendRequest('getAccountInfo').then(res => {
                    if (res && res.code == 200) {
                        console.log(res.data.accountInfo.availableBalance);
                        this.accountInfo = res.data && res.data.accountInfo || {}
                        this.totalAssets = res.data && res.data.accountInfo && (res.data.accountInfo.availableBalance + res.data.accountInfo.freezeBalance) || ''
                        localStorage.setItem('accountInfo', JSON.stringify(this.accountInfo))
                    }
                })
            },
            getYesterdayEarning() {
                this.$api.sendRequest('getYesterdayEarning').then(res => {
                    if (res && res.code == 200) {
                        this.income = res.data && res.data.income || '0'
                    }
                })
            },
            goRecord(str) {
                this.$store.dispatch('FLASH_ADMIN_TOKEN');
                if (this.$store.state.adminToken == 'null') {
                    this.showPopUp = true
                } else {
                    this.$router.push(str)
                }
            },
            recharge() {
                this.$store.dispatch('FLASH_ADMIN_TOKEN');
                if (this.$store.state.adminToken == 'null') {
                    this.showPopUp = true
                } else {
                    this.$router.push('/recharge')
                }
            },
            drawCash() {
                this.$store.dispatch('FLASH_ADMIN_TOKEN');
                if (this.$store.state.adminToken == 'null') {
                    this.showPopUp = true
                } else {
                    this.$router.push('/drawCash')
                }
            },
            closeUnlogin() {
                this.showPopUp = false
            }
        },
        components: {
            unlogin
        }
    }
</script>

<style scoped lang="scss">
    .mine {
        overflow: auto;
        background-color: #F9F9F9;
        .income {
            width: 100%;
            background-color: #3D70FD;
            padding: 50px 0;
            margin-top: 88px;
            .content {
                width: 720px;
                margin: 0 auto;
                color: #FFFFFF;
                .head {
                    display: flex;
                    height: 70px;
                    line-height: 70px;
                    text-indent: 30px;
                    font-size: 30px;
                    img {
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                        margin-left: 40px;
                    }
                }
                .middle {
                    text-align: center;
                    margin-top: 50px;
                    line-height: 80px;
                    font-size: 30px;
                    .info2 {
                        font-size: 95px;
                    }
                }
                .bottom {
                    display: flex;
                    margin-top: 50px;
                    div {
                        width: 50%;
                        text-align: center;
                        font-size: 30px;
                        line-height: 50px;
                    }
                }
            }
        }
        .operation {
            background-color: #FFFFFF;
            margin-top: 20px;
            .content {
                width: 720px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                height: 90px;
                line-height: 90px;
                .info {
                    text-indent: 10px;
                    font-size: 26px;
                    .money {
                        color: #3D70FD;
                        margin-left: 20px;
                    }
                }
                .handle {
                    display: flex;
                    .btn {
                        padding: 0 30px;
                        height: 50px;
                        line-height: 50px;
                        font-size: 24px;
                        margin-right: 30px;
                        border: 2px solid #3D70FD;
                        color: #3D70FD;
                        background-color: #FFFFFF;
                        margin-top: 20px;
                        letter-spacing: 2px;
                    }
                }
            }
        }
        .record {
            background-color: #FFFFFF;
            margin-top: 20px;
            .content {
                width: 720px;
                margin: 0 auto;
                .details {
                    display: flex;
                    justify-content: space-between;
                    .item {
                        width: 240px;
                        padding: 40px 40px 0;
                        .imgBuild {
                            width: 60px;
                            height: 60px;
                            margin: 0 auto;
                        }
                        p {
                            text-align: center;
                            line-height: 80px;
                            color: #101010;
                            font-size: 26px;
                            letter-spacing: 2px;

                        }
                    }
                }
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
