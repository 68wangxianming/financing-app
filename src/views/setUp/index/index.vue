<template>
    <div class="setUp">
        <div class="navBar">
            <van-nav-bar
                    title="设置"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div class="setUpDetails">
            <div class="content">
                <div @click="setSafe">
                    <mt-cell title="账户安全" is-link class="item">
                    </mt-cell>
                </div>
                <div>
                    <mt-cell title="查看投资协议" is-link class="item">
                    </mt-cell>
                </div>
                <div @click="signOut">
                    <mt-cell title="退出登录" is-link class="item">
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
            signOut() {
                this.$messagebox({
                    title: '提示',
                    message: '是否确认退出登录？',
                    showCancelButton: true,
                    confirmButtonText: "确认",
                    cancelButtonText: "取消"
                }).then(action => {
                    if (action == 'confirm') {
                        localStorage.clear()
                        this.$router.push('/login')
                    } else {
                    }
                })
            },
            setSafe() {
                this.$router.push('/setSafe')
            },
            onClickLeft() {
                this.$router.push('/mine')
            },
        }
    }
</script>

<style scoped lang="scss">
    .setUp {
        width: 100%;
        height: 100vh;
        background-color: #F5F5F5;
        .setUpDetails{
            background-color: #FFFFFF;
            margin-top: 88px;
            padding: 20px 0;
            .content {
                width: 700px;
                margin: 0 auto ;
            }
        }

    }
</style>
