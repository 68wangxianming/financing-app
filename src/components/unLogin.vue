<template>
    <div class="unLogin" v-show="showPopUp" @click="cancel">
        <div class="content">
            <mt-button class="login" @click="login">登 录</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            showPopUp: {
                default: true
            },
        },
        data() {
            return {
                show: true
            }
        },
        methods: {
            login(e) {
                e.stopPropagation()
                this.$router.push('/login')
            },
            cancel() {
                this.$emit('closePopup')
            }
        }
    }
</script>

<style scoped lang="scss">
    .unLogin {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 99999;
        .content {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 400px;
            background-color: #F5F5F5;
            .login {
                width: 450px;
                height: 70px;
                line-height: 70px;
                border-radius: 50px;
                background-color: #3D70FD;
                color: #FFFFFF;
                text-align: center;
                margin-left: 150px;
                margin-top: 100px;
                font-size: 32px;
            }
        }
    }
</style>
