<template>
    <div class="investmentRecord">
        <div class="navBar">
            <van-nav-bar title="投资记录" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="wapper" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <ul class="page-loadmore-list">
                    <li class="page-loadmore-listitem" v-for="item in list">
                        <div class="item">
                            <div class="top"><span>{{$globalFunction.timeConversion(item.createTime)}}</span><span>{{item.invNo}}</span>
                            </div>
                            <p><span>投资金额</span><span>Rp {{$globalFunction.formatMoney(item.amount)}}</span></p>
                            <p><span>期限</span><span>{{item.days}} 天</span></p>
                            <p><span>预期收益</span><span>Rp {{$globalFunction.formatMoney(item.income)}}</span></p>
                            <div class="bottom"
                                 :class="{'commit':item.status =='0','audited':item.status =='1','rejectExamine':item.status =='2','commit':item.investmenting =='3','commit':item.investmented =='4'}">
                                <span>状态</span><span>{{$globalFunction.investorRecordStatus(item.status)}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                    <span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="triple-bounce"></mt-spinner>
                    </span>
                </div>

                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
                    <span v-show="topStatus === 'loading'">
                        <mt-spinner type="triple-bounce"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                allLoaded: false,
                wrapperHeight: 0,
                bottomStatus: '',
                topStatus: '',
                foot: true,
                isAutoFill: false,
                perPage: 10,
                currentPage: 1,
            };
        },
        created() {
            this.getInvestorList()
        },
        methods: {
            getInvestorList() {
                this.$api.sendRequest('getInvestorList', {
                    perPage: this.perPage,
                    currentPage: this.currentPage,
                }).then(res => {
                    console.log(res.data.items);
                    if (res.data.items.length > 0) {
                        this.list = this.list.concat(res.data.items)
                    } else {
                        this.allLoaded = true;
                    }
                })
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
                if (status == 'pull') {
                    this.foot = true
                } else {
                    this.foot = false
                }
            },
            handleTopChange(status) {
                if (status == 'pull') {
                    this.foot = true
                } else {
                    this.foot = false
                }
                this.topStatus = status;
            },
            loadBottom() {
                console.log('loadBottom');
                setTimeout(() => {
                    this.currentPage++
                    this.getInvestorList()
                    this.$refs.loadmore.onBottomLoaded();
                }, 1500);
            },
            loadTop() {
                setTimeout(() => {
                    this.currentPage = 1
                    this.list = []
                    this.allLoaded = false
                    this.getInvestorList()
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
            onClickLeft() {
                this.$router.push('/home')
            },
            goPage(name, code) {
                this.$router.push('/addBankCard')
                this.$router.push({path: '/addBankCard', query: {bankName: name, code: code}})
            },
        }
    };
</script>

<style scoped lang="scss">
    .investmentRecord {
        background-color: #FFFFFF;
        overflow: auto;
        .wapper {
            width: 100%;
            height: calc(100vh - 100px);
            overflow: auto;
            margin-top: 88px;
            .page-loadmore-listitem {
                width: 750px;
                height: auto;
                .item {
                    width: 700px;
                    height: auto;
                    overflow: hidden;
                    border: 2px solid #D6D6D9;
                    border-radius: 15px;
                    margin: 30px auto;
                    font-size: 28px;
                    color: #868383;
                    .top {
                        width: 650px;
                        height: 80px;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-between;
                        line-height: 100px;
                        border-bottom: 2px solid #D6D6D9;
                    }
                    .bottom {
                        width: 650px;
                        height: 80px;
                        line-height: 80px;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-between;
                        padding: 0 26px;
                    }
                    /*提交*/
                    .commit {
                        background-color: gray;
                        color: white;
                    }
                    /*待审核*/
                    .audited {
                        background-color: orange;
                        color: white;
                    }
                    /*审核失败*/
                    .rejectExamine {
                        background-color: #dddddd;
                        color: white;
                    }
                    /*投资进行中*/
                    .investmenting {
                        background-color: #FFC46D;
                        color: white;
                    }
                    /*投资完毕，收益入账*/
                    .investmented {
                        background-color: green;
                        color: white;
                    }
                    p {
                        width: 650px;
                        height: 60px;
                        line-height: 60px;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
    }
</style>
