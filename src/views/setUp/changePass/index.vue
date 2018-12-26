<template>
    <div class="setPass">
        <div class="navBar">
            <van-nav-bar title="设置支付密码" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="setPassDetails">
            <div class="content">
                <div class="operation">
                    <span class="cancal" @click="onClickLeft">取消</span>
                </div>
                <p class="tip1" ref="tip1">设置支付密码</p>
                <p class="tip2" ref="tip2">请设置6位数字的支付密码</p>
                <van-password-input :value="value" @focus="showKeyboard = true"/>
                <p class="warming" v-if="warmStatus">和刚才设置的密码不一致，请重新输入</p>
                <div>
                    <van-number-keyboard
                            :show="showKeyboard"
                            extra-key="."
                            @input="onInput"
                            @delete="onDelete"
                    />
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: '',
                showKeyboard: true,
                warmStatus: false,
                password: '',
                makeTurePassword:''
            };
        },
        watch:{
            value(val,oldVal) {
                if(val.length != 6) {
                    this.warmStatus = false
                }
            }
        },
        methods: {
            onInput(key) {
                this.value = (this.value + key).slice(0, 6);
                if (this.value.length == 6) {
                    if(this.password) {
                        this.makeTurePassword = this.value
                        if(this.password == this.makeTurePassword) {
                            this.$messagebox({
                                title:'提示',
                                message:'success'
                            })
                        }else {
                            this.warmStatus = true
                        }

                    }else {
                        this.$indicator.open()
                        setTimeout(()=>{
                            this.password = this.value
                            this.value = ''
                            this.$refs.tip1.innerHTML = '确认密码'
                            this.$refs.tip2.innerHTML = '请再次输入刚才设置的密码'
                            this.$indicator.close()
                        },1000)
                    }
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
            onClickLeft() {
                this.$router.push('/setSafe')
            }
        }
    }
</script>

<style scoped lang="scss">
    .setPass {
        width: 750px;
        height: 100vh;
        font-size: 28px;
        color: #807E7E;
        background-color: #FAFAFA;
        .setPassDetails{
            margin-top: 88px;
            .content {
                width: 700px;
                margin: 0 auto;
                .operation {
                    .cancal {
                        height: 100px;
                        line-height: 100px;
                        color: #3E70FD;
                        margin: 20px;
                    }
                }
                .tip1 {
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    font-size: 60px;
                    text-align: center;
                    color: #3E70FD;
                    margin-top: 80px;
                }
                .tip2 {
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    font-size: 28px;
                    text-align: center;
                    color: #3E70FD;
                }
                .warming {
                    width: 100%;
                    height: 100px;
                    line-height: 100px;
                    color: red;
                    text-align: center;
                }
            }

        }
    }
</style>
