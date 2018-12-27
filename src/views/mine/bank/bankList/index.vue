<template>
    <div class="bankList">
        <div class="navBar">
            <van-nav-bar title="银行列表" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="wapper" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <ul class="page-loadmore-list">
                    <li class="page-loadmore-listitem" v-for="(item,index) in list" :key="index"
                        @click="goPage(item.name,item.code)">
                        <div class="top">
                            <span class="type">{{item.name}}</span>
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
                type: null
            };
        },
        created() {
            this.getBankList()
        },
        methods: {
            getBankList() {
                this.$api.sendRequest('getBankList', {
                    perPage: this.perPage,
                    currentPage: this.currentPage,
                }).then(res => {
                    console.log(res);
                    if (res.data.items.length > 0) {
                        this.list = this.list.concat(res.data.items)
                    } else {
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
                    this.getBankList()
                    this.$refs.loadmore.onBottomLoaded();
                }, 1500);
            },
            loadTop() {
                setTimeout(() => {
                    this.currentPage = 1
                    this.list = []
                    this.allLoaded = false
                    this.getBankList()
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            },
            onClickLeft() {

            },
            goPage(name, code) {
                this.$router.push('/addBankCard')
                this.$router.push({path: '/addBankCard', query: {bankName: name, code: code}})
            }
        },

    };
</script>

<style scoped lang="scss">
    .bankList {
        width: 750px;
        height: auto;
        background-color: #F5F5F5;
        .wapper {
            width: 100%;
            background-color: white;
            height: calc(100vh - 100px);
            overflow: auto;
            margin-top: 108px;
            .page-loadmore-listitem {
                width: 700px;
                margin: 0 auto;
                font-size: 32px;
                color: #807E7E;
                border-bottom: 2px solid gainsboro;
                padding-top: 20px;
                .top {
                    display: flex;
                    justify-content: space-between;
                    width: 650px;
                    height: 88px;
                    line-height: 88px;
                    margin: 0 auto;
                }
                .time {
                    display: flex;
                    justify-content: space-between;
                    width: 650px;
                    margin: 0 auto;
                    height: 88px;
                    line-height: 88px;
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
