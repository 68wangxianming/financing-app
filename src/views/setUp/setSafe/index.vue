<template>
    <div class="setSafe">
        <div class="navBar">
            <van-nav-bar
                    title="账户安全"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="setSafeDetails">
            <div class="content">
                <div @click="setPass('/setPass')">
                    <mt-cell title="支付密码" is-link class="item">
                        <span class="tip">未设置</span>
                    </mt-cell>
                </div>
                <div @click="setPass('/changePass')">
                    <mt-cell title="修改密码" is-link class="item">
                        <span class="tip">未设置</span>
                    </mt-cell>
                </div>
                <div @click="setPass('/forgetPass')">
                    <mt-cell title="忘记支付密码" is-link class="item">
                        <span class="tip">上传身份资料重置密码</span>
                    </mt-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            setPass(str) {
                this.$router.push(str)
            },
            onClickLeft() {
                this.$router.push('/setUp')
            },
        }
    }
</script>

<style lang="scss" scoped>
    .setSafe {
        width: 100%;
        height: 100vh;
        background-color: #F5F5F5;
        .setSafeDetails{
            background-color: #FFFFFF;
            margin-top: 88px;
            padding: 5px 0;
            .content {
                width: 700px;
                margin: 20px auto;
                .tip{
                    font-size: 28px;
                }
            }
        }
    }
</style>
