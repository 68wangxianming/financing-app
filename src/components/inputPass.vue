<template>
    <div class="inputPass" v-show="showPopUp">
        <div class="setPassDetails">
            <div class="content">
                <div class="operation">
                    <span class="cancal" @click="closePopup">取消</span>
                </div>
                <p class="tip1">{{Tip1}}</p>
                <p class="tip2">{{Tip2}}</p>
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
        props: {
            showPopUp: {
                default: false
            },
            Tip1: '',
            Tip2: '',
        },
        data() {
            return {
                value: '',
                showKeyboard: true,
                warmStatus: false,
                password: '',
                makeTurePassword: ''
            }
        },
        created() {
            this.$listener.$on('checkError', data => {
                if (data) {
                    this.warmStatus = true
                }
            })
        },
        watch: {
            value(val, oldVal) {
                if (val.length != 6) {
                    this.warmStatus = false
                }
            }
        },
        methods: {
            onInput(key) {
                this.value = (this.value + key).slice(0, 6);
                if (this.value.length == 6) {
                    this.$listener.$emit('password', this.value)
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            },
            closePopup() {
                this.$emit('closePopup')
            }
        }
    }
</script>

<style scoped lang="scss">
    .inputPass {
        position: fixed;
        top: 0;
        width: 750px;
        height: 100vh;
        font-size: 28px;
        color: #807E7E;
        background-color: #FAFAFA;
        .setPassDetails {
            .content {
                width: 700px;
                margin: 0 auto;
                .operation {
                    margin-top: 100px;
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
