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

    .manage .mint-cell-text {
        font-size: 28px !important;
    }

    .setUp .mint-cell-text {
        font-size: 28px !important;
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

    .baseInfo .mint-cell-text {
        font-size: 28px !important;
        color: #060606 !important;
    }

    .baseInfo .mint-field-core {
        font-size: 28px;
    }

    .bankCard .mint-cell-text {
        font-size: 28px;
        letter-spacing: 1px;
    }


    .mint-field .mint-cell-title{
        width: 70px!important;
    }
</style>
