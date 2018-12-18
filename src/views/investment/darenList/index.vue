<template>
    <div class="darenList">
        <div class="wapper" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <ul class="page-loadmore-list">
                    <li class="page-loadmore-listitem" v-for="item in list">
                        <img class="rank" src="../index/img/head.png" alt="">
                        <div class="info">
                            <div class="content">
                                <div class="left">
                                    <img src="../index/img/head.png" alt="">
                                    <div>
                                        <p class="name">Lu*****ong</p>
                                        <p>累计投资18笔</p>
                                    </div>
                                </div>
                                <div class="right">
                                    <p>累计投资超</p>
                                    <p>Rp 80,000,000</p>
                                </div>
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
        <mt-button class="foot" v-if="foot">立即投资，加入榜单
        </mt-button>
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
            };
        },
        methods: {
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
                    let lastValue = this.list[this.list.length - 1];
                    if (lastValue < 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.list.push(lastValue + i);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onBottomLoaded();
                }, 1500);
            },

            loadTop() {
                setTimeout(() => {
                    let lastValue = this.list[this.list.length - 1];
                    if (lastValue < 40) {
                        for (let i = 1; i <= 10; i++) {
                            this.list.push(lastValue + i);
                        }
                    } else {
                        this.allLoaded = true;
                    }
                    this.$refs.loadmore.onTopLoaded();
                }, 1500);
            }
        },
        created() {
            for (let i = 1; i <= 10; i++) {
                this.list.push(i);
            }
        },
    };
</script>

<style scoped lang="scss">
    .darenList {
        background-color: #FFFFFF;
        overflow: auto;
        .wapper {
            width: 100%;
            height: calc(100vh - 100px);
            overflow: auto;
            .page-loadmore-listitem {
                width: 750px;
                height: 112px;
                display: flex;
                justify-content: space-between;
                .rank {
                    width: 50px;
                    height: 50px;
                    margin: 30px;
                }
                .info {
                    width: 650px;
                    height: 110px;
                    border-bottom: 3px solid #F7F5F5;
                    .content {
                        display: flex;
                        width: 650px;
                        height: 70px;
                        margin-top: 20px;
                        justify-content: space-between;
                        color: #979696;
                        font-size: 28px;
                        .left {
                            display: flex;
                            img {
                                width: 70px;
                                height: 70px;
                                margin-right: 20px;
                                border: 2px solid #BBBBBB;
                                border-radius: 5px;
                            }
                            .name {
                                color: #101010;
                            }
                        }
                        .right {
                            margin-right: 30px;
                            text-align: right;
                        }
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
        .mint-loadmore-bottom, .mint-loadmore-top{
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
