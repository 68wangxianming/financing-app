<template>
    <div class="setSafe">
        <div class="content">
            <div @click="setPass">
                <mt-cell title="支付密码" is-link class="item">
                    <span class="tip">未设置</span>
                </mt-cell>
            </div>
            <div>
                <mt-cell title="忘记支付密码" is-link class="item">
                    <span class="tip">上传身份资料重置密码</span>
                </mt-cell>
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
            setPass() {
                this.$router.push('/setPass')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .setSafe {
        width: 750px;
        height: 300px;
        font-size: 28px;
        color: #807E7E;
        .content {
            width: 700px;
            margin: 20px auto;
            .tip{
                font-size: 28px;
            }
        }
    }
</style>
