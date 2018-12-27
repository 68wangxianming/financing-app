<template>
    <div class="addBankCard">
        <div class="details">
            <div class="content">
                <van-cell-group>
                    <van-field v-model="bankName" clearable label="银行" disabled input-align="right">
                        <div class="choose" slot="button" @click="chooseBank"></div>
                    </van-field>
                </van-cell-group>
                <van-field v-model="number" clearable label="银行卡号" placeholder="请输入银行卡号" input-align="right" type="number"/>
                <van-field v-model="name" clearable label="用户名" placeholder="请输入用户名" input-align="right"/>
                <van-cell-group>
                    <van-field v-model="mobile" clearable placeholder="请输入手机号" input-align="right" type="number">
                        <div slot="label" class="phone">
                            <span>手机号</span>
                            <select name="" id="phone-area" class="phone-area">
                                <option v-if="selectShow">{{globalCode}}</option>
                                <option v-if="!selectShow" value="item" v-for="item in inputSelect">+{{item}}</option>
                            </select>
                        </div>
                    </van-field>
                </van-cell-group>
            </div>
        </div>

        <mt-button class="invest" size="small" @click="saveSend">提交</mt-button>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                bankName: '',
                bankCode: '',
                number: '',
                mobile: '',
                globalCode: '',
                selectShow: false,
                inputSelect: [
                    62, 355, 376, 43, 61, 213, 244, 54, 1268, 93, 994, 1907, 374, 1264, 297, 247, 375, 359, 32, 387, 299, 267, 299, 257, 1246, 55, 591, 501,
                    973, 975, 20, 251, 240, 291, 593, 503, 33, 358, 679, 500, 298, 594, 689, 49, 30, 220, 224, 245, 233, 241, 1809, 592, 502, 995, 350, 299,
                    53, 67, 356, 32, 565, 453, 654, 678, 89, 21, 33, 44, 880, 673, 1441, 387, 420, 383, 682, 238, 1809, 57, 506, 53, 1, 56, 357, 86, 34, 1345, 45, 66, 90, 993, 690, 1809, 380, 44, 256, 380
                ],
            }
        },
        created() {
            this.bankName = this.$route.query.bankName || ''
            this.bankCode = this.$route.query.code || ''
        },
        methods: {
            saveSend(str) {
                let reg = /^8\d+$/;
                if (this.bankName.trim() == '') {
                    this.$messagebox({
                        title: '提示',
                        message: '请选择银行'
                    })
                    return false
                } else if (this.number.trim() == '') {
                    this.$messagebox({
                        title: '提示',
                        message: '请输入正确银行卡号'
                    })
                    return false
                } else if (this.name == '') {
                    this.$messagebox({
                        title: '提示',
                        message: '请输入正确姓名'
                    })
                    return false
                } else if (!reg.test(this.mobile)) {
                    this.$messagebox({
                        title: '提示',
                        message: '请输入正确手机号'
                    })
                    return false
                }
                this.save()
            },
            chooseBank() {
                this.$router.push('/bankChoice')
            },
            save() {
                let obj = document.getElementById('phone-area')
                let index = obj.selectedIndex
                let text = obj.options[index].text
                this.$api.sendRequest('addBankCard', {
                    name: this.name,
                    number: this.number,
                    mobile: this.mobile,
                    globalCode: text,
                    bankCode: this.bankCode,
                }).then((res) => {
                    this.$messagebox({
                        title: '提示',
                        message: '提交成功',
                    }).then(action => {
                        if (action == 'confirm') {
                            this.$router.push('/dataMangement')
                        }
                    })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .addBankCard {
        background-color: #F5F5F5;
        width: 750px;
        height: 100vh;
        .details {
            background-color: #FFFFFF;
            width: 750px;
            .content {
                width: 720px;
                margin: 0 auto;
                .choose {
                    border: solid 4px #c8c8cd;
                    border-bottom-width: 0;
                    border-left-width: 0;
                    content: " ";
                    top: 50%;
                    right: 5px;
                    position: absolute;
                    width: 13px;
                    height: 13px;
                    -webkit-transform: translateY(-50%) rotate(45deg);
                    transform: translateY(-50%) rotate(45deg);
                }
                .phone {
                    display: flex;
                    justify-content: space-between;
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
