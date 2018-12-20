<template>
    <div class="investmentRecord">
        <div class="wapper" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                         :top-method="loadTop" @top-status-change="handleTopChange"
                         :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <ul class="page-loadmore-list">
                    <li class="page-loadmore-listitem" v-for="item in list">
                        <div class="item">
                            <div class="top"><span>2018-06-08  15:34:01</span><span>I2018051801</span></div>
                            <p><span>投资金额</span><span>Rp 1,000,000</span></p>
                            <p><span>期限</span><span>30 天</span></p>
                            <p><span>预期收益</span><span>Rp XXXX</span></p>
                            <div class="bottom"><span>状态</span><span>投资进行中</span></div>
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
    .investmentRecord {
        background-color: #FFFFFF;
        overflow: auto;
        .wapper {
            width: 100%;
            height: calc(100vh - 100px);
            overflow: auto;
            .page-loadmore-listitem {
                width: 750px;
                height: auto;
                .item{
                    width: 700px;
                    height: auto;
                    overflow: hidden;
                    border: 2px solid #D6D6D9;
                    border-radius: 15px;
                    margin:30px auto;
                    font-size: 28px;
                    color: #868383;
                    .top{
                        width: 650px;
                        height: 80px;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-between;
                        line-height: 100px;
                        border-bottom: 2px solid #D6D6D9;
                    }
                    .bottom{
                        width: 650px;
                        height: 80px;
                        line-height: 80px;
                        margin: 0 auto;
                        display: flex;
                        justify-content: space-between;
                        background-color: #FFC46D;
                        color: #FFFFFF;
                        padding: 0 26px;
                    }
                    p{
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
