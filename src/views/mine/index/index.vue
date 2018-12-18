<template>
    <div class="mine">
        <div class="income">
            <div class="content">
                <div class="head">
                    <img src="./img/head.png" alt="">
                    <span>8999783635</span>
                </div>
                <div class="middle">
                    <p class="info1">昨日收益(Rp)</p>
                    <p class="info2">0.00</p>
                </div>
                <div class="bottom">
                    <div class="left">
                        <p>总资产(Rp)</p>
                        <p>0.00</p>
                    </div>
                    <div class="right">
                        <p>累计收益(Rp)</p>
                        <p>0.00</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="operation">
            <div class="content">
                <div class="item info">
                    <span class="tip">可用余额(Rp)</span>
                    <span class="money">1,000,000,000</span>
                </div>
                <div class="item handle">
                    <mt-button class="btn">提现</mt-button>
                    <mt-button class="btn">充值</mt-button>
                </div>
            </div>
        </div>

        <div class="record">
            <div class="content">
                <div class="details">
                    <div class="item" v-for="item in recordList">
                        <div class="imgBuild"
                             :style="{ 'background': 'url(' +item.url+ ') no-repeat center center', 'background-size': 'contain'}">
                        </div>
                        <p>{{item.info}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="manage">
            <div class="content">
                <div class="item">
                     <div class="info">
                         <i class="icon iconfont icon-zaoqidaqia"></i>
                         <span class="name">早起打卡</span>
                     </div>
                    <i class="right icon iconfont icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
                </div>
                <div class="item">
                    <div class="info">
                        <i class="icon iconfont icon-yaoqing"></i>
                        <span class="name">邀请送现金</span>
                    </div>
                    <i class="right icon iconfont icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
                </div>
                <div class="item">
                    <div class="info">
                        <i class="icon iconfont icon-paixingbang"></i>
                        <span class="name">投资排行榜</span>
                    </div>
                    <i class="right icon iconfont icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
                </div>
                <div class="item">
                    <div class="info">
                        <i class="icon iconfont icon-kefu"></i>
                        <span class="name">在线客服</span>
                    </div>
                    <i class="right icon iconfont icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
                </div>
                <div class="item">
                    <div class="info">
                        <i class="icon iconfont icon-shezhi1"></i>
                        <span class="name">设置</span>
                    </div>
                    <i class="right icon iconfont icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
                </div>
            </div>
        </div>


        <br>
        <br>
        <br>
        <br>
        <br>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                recordList:[
                    {url: require('./img/record1.png'), info: '资金流水'},
                    {url: require('./img/record2.png'), info: '投资记录'},
                    {url: require('./img/record3.png'), info: '资料管理'},
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .mine {
        overflow: auto;
        background-color: #F9F9F9;
        .income {
            width: 100%;
            background-color: #3D70FD;
            padding: 50px 0;
            .content{
                width: 720px;
                margin: 0 auto;
                color: #FFFFFF;
                .head{
                    display: flex;
                    line-height: 50px;
                    text-indent: 30px;
                    font-size: 30px;
                    img{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-left: 40px;
                    }
                }
                .middle{
                    text-align: center;
                    margin-top: 50px;
                    line-height: 80px;
                    font-size: 30px;
                    .info2{
                        font-size: 95px;
                    }
                }
                .bottom{
                    display: flex;
                    margin-top: 50px;
                    div{
                        width: 50%;
                        text-align: center;
                        font-size: 30px;
                        line-height: 50px;
                    }
                }
            }
        }
        .operation{
            background-color: #FFFFFF;
            margin-top: 20px;
            .content{
                width: 720px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                height: 90px;
                line-height: 90px;
                .info{
                    text-indent: 10px;
                    font-size: 26px;
                    .money{
                        color: #3D70FD;
                        margin-left: 20px;
                    }
                }
                .handle{
                    display: flex;
                    .btn{
                        padding: 0 30px;
                        height: 50px;
                        font-size: 24px;
                        margin-right: 30px;
                        border: 2px solid #3D70FD;
                        color: #3D70FD;
                        background-color: #FFFFFF;
                        margin-top: 20px;
                        letter-spacing: 2px;
                    }
                }
            }
        }
        .record{
            background-color: #FFFFFF;
            margin-top: 20px;
            .content{
                width: 720px;
                margin: 0 auto;
                .details {
                    display: flex;
                    justify-content: space-between;
                    .item {
                        width: 240px;
                        padding: 40px 40px 0;
                        .imgBuild {
                            width: 60px;
                            height: 60px;
                            margin: 0 auto;
                        }
                        p{
                            text-align: center;
                            line-height: 80px;
                            color: #101010;
                            font-size: 26px;
                            letter-spacing: 2px;

                        }
                    }
                }
            }
        }
        .manage{
            background-color: #FFFFFF;
            margin-top: 20px;
            .content{
                width: 700px;
                margin: 0 auto;
                .item{
                    display: flex;
                    justify-content: space-between;
                    height: 80px;
                    line-height: 80px;
                    border-bottom: 2px solid rgba(247, 245, 245, 1);

                    .info{
                        font-size: 28px;
                        i{
                            color: #3D70FD;
                            font-size: 36px;
                            margin-right: 20px;
                            font-weight: bolder;
                        }
                    }
                    .right{
                        font-size: 38px;
                        font-weight: bolder;
                        color: #979696;
                        line-height: 80px;

                    }
                }
                .item:last-child{
                    border-bottom: 0px;
                }
            }
        }
    }
</style>
