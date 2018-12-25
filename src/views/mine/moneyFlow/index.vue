<template>
    <div class="moneyFlow">
        <van-tabs v-model="active" swipeable color="#3D70FD" ellipsis @click="onClick">
            <van-tab title="全部"></van-tab>
            <van-tab title="充值"></van-tab>
            <van-tab title="提现"></van-tab>
            <van-tab title="投资"></van-tab>
        </van-tabs>

        <div class="wapper" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <ul class="page-loadmore-list">
                    <li class="page-loadmore-listitem" v-for="item in list">
                        <div class="top">
                            <span class="type">{{$globalFunction.flowType(item.type)}}{{$globalFunction.flowStatus(item.status)}}</span>
                            <span class="money">{{item.availableBalance>0? '+ Rp':'- Rp'}} {{item.availableBalance}}</span>
                        </div>
                        <p class="time">
                            <span>{{$globalFunction.timeConversion(item.createTime)}}</span>
                            <span>{{item.taskStatus == 1? '': '处理中'}}</span>
                        </p>
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
                active: 0,
                list: [],
                allLoaded: false,
                wrapperHeight: 0,
                bottomStatus: '',
                topStatus: '',
                foot: true,
                isAutoFill: false,
                perPage: 10,
                currentPage: 1,
                type: null
            };
        },
        created() {
            this.getAccountRecord()
        },
        methods: {
            onClick(index, title) {
                if(index) {
                    this.type = index
                    this.currentPage = 1
                    this.list = []
                    this.allLoaded = false
                    this.getAccountRecord()
                }else {
                    this.type = null
                    this.currentPage = 1
                    this.list = []
                    this.allLoaded = false
                    this.getAccountRecord()
                }
            },
            getAccountRecord() {
                this.$api.sendRequest('getAccountRecord', {
                    perPage: this.perPage,
                    currentPage: this.currentPage,
                    type: this.type
                }).then(res => {
                    if(res.data.items.length>0) {
                        this.list = this.list.concat(res.data.items)
                    }else {
                        this.allLoaded = true;
                    }
                    console.log(this.list);
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
                    this.getAccountRecord()
                    this.$refs.loadmore.onBottomLoaded();
                }, 1500);
            },

            loadTop() {
                setTimeout(() => {
                    this.currentPage = 1
                    this.list = []
                    this.allLoaded = false
                    this.getAccountRecord()
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            }
        },

    };
</script>

<style scoped lang="scss">
    .moneyFlow {
        width: 750px;
        height: auto;
        background-color: #F5F5F5;
        .wapper {
            width: 100%;
            background-color: white;
            height: calc(100vh - 100px);
            overflow: auto;
            margin-top: 20px;
            .page-loadmore-listitem {
                width: 700px;
                margin: 0 auto;
                font-size: 28px;
                color: #807E7E;
                border-bottom: 2px solid gainsboro;
                padding-top: 20px;
                .top {
                    display: flex;
                    justify-content: space-between;
                    width: 650px;
                    height: 55px;
                    line-height: 55px;
                    margin: 0 auto;
                }
                .time {
                    display: flex;
                    justify-content: space-between;
                    width: 650px;
                    height: 55px;
                    margin: 0 auto;
                    line-height: 55px;
                }
            }
        }

        .mint-loadmore-bottom, .mint-loadmore-top {
            span {
                display: inline-block;
                transition: .2s linear;
                vertical-align: middle;

            }
            .mint-spinner {
                display: inline-block;
                vertical-align: middle;
            }
        }
        .mint-button {
            border-radius: 0;
        }

    }
</style>
