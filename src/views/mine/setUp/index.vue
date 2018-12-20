<template>
    <div class="setUp">
        <div class="content">
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
</template>

<script>
    export default {
        data() {
            return{

            }
        },
        methods: {
            signOut() {
                this.$messagebox({
                    title: '提示',
                    message: '是否确认退出登录？',
                    showCancelButton: true,
                    confirmButtonText:"确认",
                    cancelButtonText:"取消"
                }).then(action => {
                    if(action == 'confirm'){
                        console.log('退出成功')
                    }else{
                        console.log('取消登录')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .setUp {
        width: 750px;
        height: 300px;
        font-size: 28px;
        color: #807E7E;
        .content {
            width: 700px;
            margin: 20px auto;
        }
    }
</style>
