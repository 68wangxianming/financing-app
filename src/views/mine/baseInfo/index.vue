<template>
    <div class="baseInfo">
        <div class="details">
            <div class="content">
                <mt-field label="姓名" state="success" v-model="name" class="item" placeholder="请输入您的姓名"></mt-field>
                <mt-field label="身份证号" state="error" v-model="name" class="item" placeholder="请输入您的身份证号"></mt-field>
                <mt-field label="邮箱" state="warning" v-model="name" class="item" placeholder="请输入您的邮箱"></mt-field>
            </div>

        </div>

        <mt-button class="invest" size="small" @click="goPage('/dataMangement')">提交</mt-button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            goPage(str) {
                this.$router.push(str)
            }
        }
    }
</script>

<style scoped lang="scss">
    .baseInfo {
        background-color: #F5F5F5;
        width: 750px;
        height: 100vh;
        .details {
            background-color: #FFFFFF;
            width: 750px;
            .content {
                width: 720px;
                margin: 0 auto;
            }
        }

        .invest {
            width: 700px;
            margin:40px 25px;
            background: #3D70FD;
            color: #FFFFFF;
            letter-spacing: 3px;
        }
    }
</style>
