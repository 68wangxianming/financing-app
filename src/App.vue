<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                transitionName: 'slide-left'
            }
        },
        watch: {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
    }
</script>

<style lang="scss">
    .child-view {
        position: absolute;
        transition: all .4s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    .mint-cell-text {
        font-size: 28px !important;
        letter-spacing: 1px;
        color: #060606 !important;
    }

    .moneyFlow .van-tab {
        color: #3D70FD !important;
    }

    .van-tab--active .van-ellipsis {
        font-weight: bolder !important;
    }

    .dataMangement .mint-cell-text {
        margin-left: 75px;
    }

    .manage .mint-cell-text {
        margin-left: 75px;
    }

    .mint-field .mint-cell-title {
        width: 70px !important;
    }

    .navBar {
        width: 750px;
        position: fixed;
        top: 0;
        z-index: 99999;
        .van-nav-bar .van-icon {
            color: #FFFFFF;
        }
        .van-nav-bar__text {
            color: #FFFFFF;
        }
    }

    .van-hairline--bottom::after {
        border: none !important;
    }

    .van-nav-bar {
        background-color: #3D70FD !important;
        color: #FFFFFF;
        letter-spacing: 1px;
        height: 88px!important;
        line-height: 88px!important;
    }

    .addBankCard .van-field .van-cell__title {
        max-width: 450px !important;
    }

    /*step*/
    .resultDetails .van-step .van-step__circle {
        top: 18px;
        left: -48px;
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: gainsboro;
    }

    .van-step--vertical.van-step--process .van-icon-checked {
        top: 12px;
        left: -48px !important;
        line-height: 1;
        font-size: 35px !important;
    }
</style>
