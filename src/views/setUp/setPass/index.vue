<template>
    <div class="setPass">
        <div class="content">
            <div class="operation">
                <span class="cancal">取消</span>
            </div>
            <p class="tip1" ref="tip1">设置支付密码</p>
            <p class="tip2" ref="tip2">请设置6位数字的支付密码</p>
            <van-password-input
                    :value="value"
                    @focus="showKeyboard = true"
            />
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
        methods: {
            onInput(key) {
                console.log(this.password);
                this.value = (this.value + key).slice(0, 6);
                if (this.value.length == 6) {
                    if(this.password) {
                        this.makeTurePassword = this.value
                        if(this.password == this.makeTurePassword) {
                            alert('samll')
                        }

                    }else {
                        this.$indicator.open()
                        setTimeout(()=>{
                            this.password = this.value
                            this.value = ''
                            this.$refs.tip1.innerHTML = '确认密码'
                            this.$refs.tip2.innerHTML = '请再次输入刚才设置的密码\n'
                            this.$indicator.close()
                        },500)
                    }
                }

            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
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
</style>
