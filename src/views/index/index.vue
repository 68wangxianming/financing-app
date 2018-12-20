<template>
    <div class="index">
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>

        <div class="bottom-bar">
            <mt-tabbar v-model="selected">
                <mt-tab-item id="/home">
                    <i class="icon iconfont icon-yemian-copy-copy"></i>
                    <div class="name">首页</div>
                </mt-tab-item>
                <mt-tab-item id="/investment">
                    <i class="icon iconfont icon-touzi"></i>
                    <div class="name">投资</div>
                </mt-tab-item>
                <mt-tab-item id="/mine">
                    <i class="icon iconfont icon-wode"></i>
                    <div class="name">我的</div>
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: ''
            }
        },
        created() {
            this.$listener.$on('select', data => {
                this.selected = data
            })
            this.selected = localStorage.getItem('selected') || '/home'
        },
        methods: {},
        watch: {
            selected: function (val, oldVal) {
                this.$router.push(val)
                localStorage.setItem('selected', val)
            }
        }
    }
</script>

<style scoped lang="scss">
    .index {
        position: relative;
        width: 100%;
        height: auto;
        .bottom-bar {
            position: fixed;
            width: 100%;
            height: 100px;
            bottom: 0;
            z-index: 999999999;
            .mint-tabbar > .mint-tab-item.is-selected {
                color: #3D70FD;
            }
            a {
                color: #979696;
            }
            i {
                font-size: 50px;
            }
            .name {
                margin-top: 5px;
            }
        }
    }
</style>
