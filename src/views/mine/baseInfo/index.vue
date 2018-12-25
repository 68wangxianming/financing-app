<template>
    <div class="baseInfo">
        <div class="details">
            <div class="content">
                <mt-field label="头像" class="item" disabled="">
                    <div @click="clickFile">拍照</div>
                    <div @click="selectFile">相册玄英</div>
                </mt-field>
                <mt-field label="姓名" v-model="name" class="item" placeholder="请输入您的姓名"></mt-field>
                <mt-field label="身份证号" v-model="name" class="item" placeholder="请输入您的身份证号"></mt-field>
                <mt-field label="邮箱" v-model="name" class="item" placeholder="请输入您的邮箱"></mt-field>
            </div>

        </div>
        <mt-button class="invest" size="small" @click="goPage('/dataMangement')">提交</mt-button>


        <div>

            <img :src="base64Image" alt="">

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                base64Image:null,
            }
        },
        created() {
            this.$jsBridge.addEventListener({
                handlerName: "cameraCB",
                callback:this.photo
            })
        },
        methods: {
            goPage(str) {
                this.$router.push(str)
            },
            photo(res){
                this.base64Image='data:image/jpg;base64,'+res.data.base64Image;
            },
            selectFile() {
                this.$jsBridge.dispatch({
                    handlerName:"photo",
                    callback:()=>{

                    }
                })
            },
            clickFile() {
                this.$jsBridge.dispatch({
                    handlerName:"camera",
                    callback:()=>{

                    }
                })
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
            margin: 40px 25px;
            background: #3D70FD;
            color: #FFFFFF;
            letter-spacing: 3px;
        }
    }
</style>
