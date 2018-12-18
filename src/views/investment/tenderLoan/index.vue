<template>
    <div class="tenderLoan">
        <div class="rate">
            <div class="content">
                <div class="left">
                    <p class="info">
                        <span class="span1">12.0%</span>
                        <span class="span2">+</span>
                        <span class="span3">1.5%</span>
                    </p>
                    <p class="tip">期望年化回报率</p>
                </div>
                <div class="right">
                    <p class="info">12个月</p>
                    <p class="tip">投资期限</p>
                </div>
            </div>
        </div>

        <div class="count">
            <div class="content">
                <div class="calculation">
                    <mt-button class="reduce">-</mt-button>
                    <div class="total">
                        <div class="money">Rp 1,000,000</div>
                    </div>
                    <mt-button class="add">+</mt-button>
                </div>
                <p class="count-details">预计回报(Rp)<span>120,000</span></p>
                <p class="count-details">起投金额(Rp)<span>≥1,000,000</span></p>
            </div>
        </div>

        <div class="balance">
            <div class="content">
                <span class="left">账户余额(Rp)</span>
                <span class="right">100,000,000</span>
            </div>
        </div>

        <div class="agreeContract">
            <div class="content">
                <input type="checkbox">
                <a href="">《Rupiah One投资协议》</a>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam architecto blanditiis, consequatur
        deleniti dolorum eius harum id neque nisi numquam obcaecati, porro quia quibusdam quidem quos reiciendis tempore
        ut.
    </div>
</template>

<script>
    export default {
        data() {
            return{
            }
        }
    }
</script>

<style scoped lang="scss">
    .tenderLoan {
        overflow: auto;
        background-color: #F7F5F5;
        .rate {
            width: 750px;
            height: auto;
            background-color: #FFFFFF;
            padding: 60px 0 40px 0;
            .content {
                width: 720px;
                height: 130px;
                margin: 0 auto;
                display: flex;
                .left {
                    width: 50%;
                    text-align: center;
                    border-right: 2px solid #BBBBBB;
                    .info {
                        height: 70px;
                        line-height: 70px;
                        .span1 {
                            color: #3D70FD;
                            font-size: 55px;
                            font-weight: bolder;
                        }
                        .span2 {
                            color: #101010;
                            font-size: 28px;
                            margin-left: 10px;
                        }
                        .span3 {
                            color: #FF9800;
                            font-size: 40px;
                            font-weight: bolder;
                        }
                    }
                    .tip {
                        color: #979696;
                        font-size: 28px;
                        line-height: 80px;
                    }
                }
                .right {
                    width: 50%;
                    text-align: center;
                    .info {
                        font-weight: bolder;
                        color: #3D70FD;
                        font-size: 55px;
                        line-height: 70px;
                        height: 70px;
                    }
                    .tip {
                        color: #979696;
                        font-size: 28px;
                        line-height: 80px;
                    }
                }
            }
        }
        .count {
            width: 750px;
            height: auto;
            background-color: #FFFFFF;
            padding: 60px 0 40px 0;
            margin-top: 20px;
            .content {
                width: 650px;
                margin: 0 auto;
                .calculation {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 30px;
                    .add {
                        width: 60px;
                        height: 60px;
                        font-size: 40px;
                        text-align: center;
                        padding: 0;
                    }
                    .reduce {
                        width: 60px;
                        height: 60px;
                        font-size: 40px;
                        text-align: center;
                    }
                    .total {
                        height: 70px;
                        line-height: 70px;
                        font-size: 45px;
                        color: #3D70FD;
                        padding: 0;
                        .money {
                            border-bottom: 2px solid #BBBBBB;
                        }
                    }
                }
                .count-details{
                    height: 60px;
                    line-height: 60px;
                    color: #979696;
                    font-size: 28px;
                    letter-spacing: 2px;
                    span{
                        margin-left: 30px;
                        color: #FF9800;
                    }
                }
            }
        }
        .balance{
            width: 750px;
            height: auto;
            background-color: #FFFFFF;
            margin-top: 20px;
            .content{
                width: 650px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                height: 80px;
                line-height: 80px;
                font-size: 28px;
                color: #979696;
                letter-spacing: 2px;
                .right{
                    color: #3D70FD;
                }
            }
        }
        .agreeContract{
            width: 750px;
            height: auto;
            background-color: #FFFFFF;
            margin-top: 20px;
            .content{
                width: 650px;
                margin: 0 auto;
                display: flex;
            }

        }
    }
</style>
