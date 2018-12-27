<template>
    <div class="baseInfo">
        <div class="details">
            <div class="content">
                <van-cell title="头像">
                    <!-- 默认头像 -->
                    <img slot="right-icon" v-if="!base64Image" src="./imgs/head.png" class="head" @click="clickFile">
                    <img slot="right-icon" v-if="base64Image" :src="base64Image" class="head" @click="clickFile">
                </van-cell>
                <van-field v-model="name" clearable label="姓名" placeholder="请输入您的姓名" input-align="right"/>
                <van-field v-model="idNumber" clearable label="身份证号" placeholder="请输入您的身份证号" input-align="right"/>
                <van-field v-model="email" clearable label="邮箱" placeholder="请输入您的邮箱" input-align="right"/>
            </div>
        </div>
        <mt-button class="invest" size="small" @click="saveInfo">提交</mt-button>

        <mt-actionsheet
                :actions="data"
                v-model="sheetVisible">
        </mt-actionsheet>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                base64Image: null,
                profileInfo: {},
                idNumber: '',
                email: '',
                avatar: null,
                data: [{
                    name: '拍照',
                    method: this.getCamera	// 调用methods中的函数
                }, {
                    name: '从相册中选择',
                    method: this.getLibrary	// 调用methods中的函数
                }],
                sheetVisible: false
            }
        },
        created() {
            this.$jsBridge.addEventListener({
                handlerName: "cameraCB",
                callback: this.photo
            })
            this.getUserAvatar();
            this.getProfileInfo();
        },
        methods: {
            getUserAvatar() {
                this.$api.sendRequest('getUserAvatar').then(res => {
                    this.base64Image = res.data.avatar
                })
            },
            getProfileInfo() {
                this.$api.sendRequest('getProfileInfo').then(res => {
                    if (res.data.profileInfo) {
                        // this.fillStatus = true
                        this.profileInfo = res.data.profileInfo
                        this.name = this.profileInfo.name
                        this.idNumber = this.profileInfo.idNumber
                        this.email = this.profileInfo.email
                        console.log(this.profileInfo);
                    }
                })
            },
            saveInfo() {
                let idNumber = /^[0-9]+.?[0-9]*/;
                if (this.name.trim() == '') {
                    this.$messagebox({
                        tiile: '提示',
                        message: '请填写正确格式姓名'
                    })
                    return false
                } else if (!idNumber.test(this.idNumber)) {
                    this.$messagebox({
                        tiile: '提示',
                        message: '请填写正确格式身份证号'
                    })
                    return false
                } else if (!this.checkEmails(this.email)) {
                    this.$messagebox({
                        tiile: '提示',
                        message: '请填写正确格式邮箱'
                    })
                    return false
                }
                this.save()
            },
            save() {
                this.$indicator.open()
                this.$api.sendRequest('saveProfile', {
                    name: this.name,
                    idNumber: this.idNumber,
                    email: this.email,
                    avatar: this.avatar,
                }).then(res => {
                    this.$indicator.close()
                    if (res.data.result) {
                        this.$router.push('/dataMangement')
                    }
                })
            },
            photo(res) {
                this.base64Image = 'data:image/jpg;base64,' + res.data.base64Image;
                this.avatar = this.base64Image
            },

            getCamera() {
                console.log('打开相机')
                this.$jsBridge.dispatch({
                    handlerName: "camera",
                    callback: () => {
                    }
                })
            },
            getLibrary() {
                console.log('打开相册')
                this.$jsBridge.dispatch({
                    handlerName: "photo",
                    callback: () => {
                    }
                })
            },
            clickFile() {
                this.sheetVisible = true
            },
            checkEmails(str) {
                let res = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                return res.test(str)
            },
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
                .head {
                    width: 80px;
                    height: 80px;
                }
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
