<template>
    <div class="login">
        <div class="fill">
            <mt-field placeholder="请输入手机号" v-model="phone"></mt-field>
            <mt-field placeholder="请输入图片验证码">
                <span v-html="captcha" @click="changeCaptcha"></span>
            </mt-field>
            <mt-field placeholder="请输入短信验证码">
                <mt-button class="send" size="small"  @click="login">发送验证码</mt-button>
            </mt-field>
        </div>
        <div class="operation">
            <mt-button class="signIn" size="normal" disabled v-if="!isLogin">登 录</mt-button>
            <mt-button class="signIn" size="normal" v-if="isLogin">登 录</mt-button>
            <p class="Agreement">
                登录即代表同意我们的
                <span>用户协议、</span>
                <span>隐私协议、</span>
                <span>授权信</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                phone: '',
                imgCode: '',
                msgCode: '',
                captcha: '',
                uuid: '',
                isLogin: false
            }
        },
        created() {
            this.getCaptcha()
        },
        methods: {
            getCaptcha() {
                this.$api.sendRequest('captcha', {width: 105, height: 30, fontSize: 35}).then(res => {
                    this.uuid = res.data && res.data.uuid || null;
                    this.captcha = res.data && res.data.captcha || null;
                })
            },
            changeCaptcha() {
                this.getCaptcha();
            },
            login() {
                this.$router.push('index')
            }
        }
    }
</script>

<style scoped lang="scss">
    .login {
        width: 750px;
        height: auto;
        .fill {
            width: 690px;
            margin: 80px auto;
            .mint-button--default {
                background-color: #4673F4;
                color: #ffffff;
            }
        }
        .operation {
            width: 690px;
            margin: 100px auto;
            .signIn {
                width: 600px;
                margin-left: 45px;
                background-color: #4673F4;
                color: #ffffff;
            }
            .Agreement{
                text-align: center;
                margin-top: 40px;
                span{
                    color: #4673F4;
                }

            }
        }
    }


</style>
