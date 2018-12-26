<template>
    <div class="bankChoice">
        <div class="list">
            <div class="item" v-for="(item, index) in bankList" :key="index" :title="item.name"
                 @click.native="choiceBank(item, index)">
                <img :src="item.imgUrl">
                <span>{{item.name}}</span>
            </div>

            <div class="otherBank" @click="goPage">
                <span class="tip">其他银行</span>
                <span class="choose"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hasClick: false,
                choiceIndex: '',
                bankList: [{
                    name: 'BCA',
                    code: 'BCA',
                    imgUrl: require('./imgs/bca@3x.png'),
                }, {
                    name: 'BCA SYARIAH',
                    code: 'BCA_SYR',
                    imgUrl: require('./imgs/BCA_SYR.png'),
                }, {
                    name: 'BRI',
                    code: 'BRI',
                    imgUrl: require('./imgs/bri@3x.png'),
                }, {
                    name: 'Bank Syariah BRI',
                    code: 'BRI_SYR',
                    imgUrl: require('./imgs/BRI_SYR.png'),
                }, {
                    name: 'Mandiri',
                    code: 'MANDIRI',
                    imgUrl: require('./imgs/mandiri@3x.png'),
                }, {
                    name: 'Bank Syariah Mandiri',
                    code: 'MANDIRI_SYR',
                    imgUrl: require('./imgs/MANDIRI_SYR.png'),
                }, {
                    name: 'BNI',
                    code: 'BNI',
                    imgUrl: require('./imgs/bni@3x.png'),
                }, {
                    name: 'Bank BNI Syariah',
                    code: 'BNI_SYR',
                    imgUrl: require('./imgs/BNI_SYR.png'),
                }, {
                    name: 'Bank Danamon',
                    code: 'DANAMON',
                    imgUrl: require('./imgs/danamon@3x.png'),
                }, {
                    name: 'Bank Danamon UUS',
                    code: 'DANAMON_UUS',
                    imgUrl: require('./imgs/DANAMON_UUS.png'),
                }, {
                    name: 'Bank BTN',
                    code: 'BTN',
                    imgUrl: require('./imgs/btn@3x.png'),
                }, {
                    name: 'Bank Tabungan Negara (BTN) UUS',
                    code: 'BTN_UUS',
                    imgUrl: require('./imgs/BTN_UUS.png'),
                }, {
                    name: 'CIMB NIAGA',
                    code: 'CIMB',
                    imgUrl: require('./imgs/cimbniaga@3x.png'),
                }, {
                    name: 'Bank CIMB Niaga UUS',
                    code: 'CIMB_UUS',
                    imgUrl: require('./imgs/CIMB_UUS.png'),
                }, {
                    name: 'OCBC BANK',
                    code: 'OCBC',
                    imgUrl: require('./imgs/ocbc@3x.png'),
                }, {
                    name: 'Bank OCBC NISP UUS',
                    code: 'OCBC_UUS',
                    imgUrl: require('./imgs/OCBC_UUS.png'),
                }, {
                    name: 'Bank Panin',
                    code: 'PANIN',
                    imgUrl: require('./imgs/panin@3x.png'),
                }, {
                    name: 'Bank Panin Syariah',
                    code: 'PANIN_SYR',
                    imgUrl: require('./imgs/PANIN_SYR.png'),
                }, {
                    name: 'Maybank',
                    code: 'BII',
                    imgUrl: require('./imgs/may@3x.png'),
                }, {
                    name: 'Bank Maybank Syariah Indonesia',
                    code: 'MAYBANK_SYR',
                    imgUrl: require('./imgs/MAYBANK_SYR.png'),
                },]
            }
        },
        methods: {
            goPage() {
                this.$router.push('/bankList')
            }
        }
    }
</script>

<style scoped lang="scss">
    .bankChoice {
        width: 100%;
        height: auto;
        background-color: #FFFFFF;
        .list {
            width: 650px;
            margin: 0 auto;
            padding-bottom: 100px;
            font-size: 28px;

            .item {
                border-bottom: 2px solid #ebedf0;
                width: 100%;
                height: 130px;
                line-height: 130px;
                display: flex;
                justify-content: space-between;
                img {
                    width: 160px;
                    height: 90px;
                    margin-left: 10px;
                    margin-top: 20px;
                }
            }
            .otherBank {
                position: relative;
                width: 100%;
                height: 100px;
                display: flex;
                justify-content: space-between;
                line-height: 100px;
                font-size: 28px;
                border-bottom: 2px solid #ebedf0;
                .tip {
                    text-indent: 20px;
                }
                .choose {
                    border: solid 4px #c8c8cd;
                    border-bottom-width: 0;
                    border-left-width: 0;
                    content: " ";
                    top: 50%;
                    right: 15px;
                    position: absolute;
                    width: 13px;
                    height: 13px;
                    -webkit-transform: translateY(-50%) rotate(45deg);
                    transform: translateY(-50%) rotate(45deg);
                }
            }
        }
    }
</style>
