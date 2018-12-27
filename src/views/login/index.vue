<template>
    <div class="login">
        <div class="fill">
            <div>
                <mt-field label="+62" placeholder="请输入手机号" v-model="phone">
                </mt-field>
            </div>
            <mt-field placeholder="请输入图片验证码" v-model="captcha">
                <span v-html="captchaImg" @click="changeCaptcha"></span>
            </mt-field>
            <mt-field placeholder="请输入短信验证码" v-model="code">
                <mt-button class="send" size="small" @click="sendCode" :disabled="sendCodeStatus">{{codeText}}
                </mt-button>
            </mt-field>
        </div>
        <div class="operation">
            <mt-button class="signIn" size="normal" disabled v-if="!isLogin">登 录</mt-button>
            <mt-button class="signIn" size="normal" v-if="isLogin" @click="login">登 录</mt-button>
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
    let timeout

    export default {
        data() {
            return {
                phone: '',
                captcha: '',
                code: '',
                uuid: '',
                isLogin: true,
                codeText: '发送验证码',
                sendCodeStatus: false,
                globalCode: '62',
                captchaImg: ''
            }
        },
        created() {
            this.getCaptcha()
        },
        methods: {
            getCaptcha() {
                this.$api.sendRequest('captcha', {width: 105, height: 30, fontSize: 35}).then(res => {
                    this.uuid = res.data && res.data.uuid || null;
                    this.captchaImg = res.data && res.data.captcha || null;
                })
            },
            sendCode() {
                // let reg = /^(\+?62|0?)8\d+$/;
                // if (!reg.test(this.phone)) {
                //     this.$messagebox({
                //         title: '提示',
                //         message: '请输入正确手机号',
                //     });
                //     return
                // }
                // if (this.captcha == '') {
                //     this.$messagebox({
                //         title: '提示',
                //         message: '请输入图形验证码',
                //     });
                //     return
                // }
                this.$api.sendRequest('sendCaptchaSms', {
                    uuid: this.uuid,
                    globalCode: this.globalCode,
                    phone: this.phone,
                    captcha: this.captcha,
                }).then(res => {
                    if (res.code == 200) {
                        this.uuid = res.data.uuid
                        this.countDown(60)
                    }
                })
            },
            login() {
                // let re = /^\d{4}$/
                // let reg = /^(\+?62|0?)8\d+$/;
                // if (!reg.test(this.phone)) {
                //     this.$messagebox({
                //         title: '提示',
                //         message: '请输入正确手机号',
                //     });
                //     return
                // } else if (!re.test(this.code)) {
                //     this.$messagebox({
                //         title: '提示',
                //         message: '请输入正确短信验证码',
                //     });
                //     return
                // } else if (this.captcha == "") {
                //     this.$messagebox({
                //         title: '提示',
                //         message: '请输入正确图形验证码',
                //     });
                //     return
                // }
                this.$api.sendRequest('login', {
                    uuid: this.uuid,
                    phone: this.phone,
                    captcha: this.code,
                }).then(res => {
                    if (res && res.code == 200) {
                        localStorage.setItem('authToken', res.data.authToken)
                        this.$store.commit('UPDATE_ADMIN_TOKEN', res.data.authToken);
                        clearTimeout(timeout)
                        this.$router.push('/home')
                    }
                })
            },
            changeCaptcha() {
                this.getCaptcha();
            },
            countDown(time) {
                if (time == 0) {
                    this.sendCodeStatus = false
                    this.codeText = '发送验证码'
                } else {
                    this.sendCodeStatus = true
                    this.codeText = `倒计时 ${time} s`
                    time--
                    timeout = setTimeout(() => {
                        this.countDown(time)
                    }, 1000)
                }
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
            .Agreement {
                text-align: center;
                margin-top: 40px;
                span {
                    color: #4673F4;
                }

            }
        }
    }


</style>
