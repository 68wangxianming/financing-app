<template>
    <div class="home">
        <div class="lunbo">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="img in lunboList">
                    <img :src="img.url" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="recommend">
            <div class="content">
                <h4>
                    <span>投资推荐服务</span>
                    <span class="note">首次投资加息</span>
                </h4>
                <div class="rate">
                    <p class="rate1">
                        <span class="span1">{{focusProduct._rate}}</span>
                        <span class="span2">%</span>
                        <span class="span3">+</span>
                        <span class="span4">{{getNewUserRate}}</span>
                        <span class="span5">%</span>
                        <span class="span6">期限 {{focusProduct.days}} 天</span>
                    </p>
                    <p class="rate2"><span>期望年化回报率</span><span>1 million投资预期回报Rp{{$globalFunction.formatMoney(income)}}</span></p>
                </div>
                <mt-button class="invest" size="small" @click="goPage">立即投资</mt-button>
            </div>
        </div>
        <div class="introduce">
            <div class="content">
                <h4>
                    <span>安全可信赖的互联网金融平台</span>
                </h4>
                <div class="details">
                    <div class="item" v-for="item in itemList">
                        <div class="imgBuild"
                             :style="{ 'background': 'url(' +item.url+ ') no-repeat center center', 'background-size': 'contain'}">
                        </div>
                        <p>{{item.info}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="foot">
            <div class="content">
                <h4>
                    <span>平台真实透明</span>
                </h4>
                <div class="details">
                    <div class="item" v-for="item in footList">
                        <div class="imgBuild"
                             :style="{ 'background': 'url(' +item.url+ ') no-repeat center center', 'background-size': 'contain'}">
                        </div>
                        <p>{{item.info}}</p>
                    </div>
                </div>
                <div class="search-details">迄今为止，如期履约</div>
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
                focusProduct: {},
                getNewUserRate: '',
                income:'',
                lunboList: [
                    {url: require('./img/1.jpg')},
                    {url: require('./img/2.jpg')},
                    {url: require('./img/3.jpg')}
                ],
                itemList: [
                    {url: require('./img/item1.png'), info: 'Registered and supervised by OJK'},
                    {url: require('./img/item2.png'), info: '大数据风控，全程护航，保障您的投资安全'},
                    {url: require('./img/item3.png'), info: 'AI智能算法，让您的投资收益更有保障'},
                    {url: require('./img/item4.png'), info: '严格的资金管理流程，完善的安全技术'},
                ],
                footList: [
                    {url: require('./img/foot1.png'), info: '真实借款人'},
                    {url: require('./img/foot2.png'), info: '信息透明'},
                    {url: require('./img/foot3.png'), info: '遵守监管'},
                ]
            }
        },
        created() {
            this.getFocusProduct()//推荐产品
        },
        methods: {
            async getFocusProduct() {
                let res=await this.$api.sendRequest('getFocusProduct');
                if (res && res.code == 200) {
                    this.focusProduct = res.data && res.data.focusProduct || ''
                    this.focusProduct._rate = this.focusProduct && (this.focusProduct.rate / 100) + '.0' || ''
                }
                //获取新用户奖励利率
                res=await this.$api.sendRequest('getNewUserRate');
                if (res && res.code == 200) {
                    this.getNewUserRate = res.data && (res.data.rate / 100) || ''
                }
                this.income = (res.data.rate+this.focusProduct.rate)/10000 * 1000000
            },
            goPage() {
                this.$router.push('/investment')
            }
        }
    }
</script>

<style scoped lang="scss">
    .home {
        overflow: auto;
        background-color: #F9F9F9;
        .lunbo {
            width: 100%;
            height: 350px;
            img {
                width: 100%;
                height: 350px;
            }
        }
        .recommend {
            width: 100%;
            height: auto;
            background-color: #FFFFFF;
            margin-top: 20px;
            padding-bottom: 50px;
            .content {
                width: 720px;
                margin: 0 auto;
                h4 {
                    position: relative;
                    font-size: 28px;
                    border-bottom: 1px solid #F7F5F5;
                    line-height: 80px;
                    text-indent: 30px;
                    letter-spacing: 1px;
                    .note {
                        color: #979696;
                        font-size: 24px;
                        margin-left: 30px;
                    }
                }
                h4:before {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 50px;
                    background: #3D70FD;
                    position: absolute;
                    left: 0;
                    top: 15px;
                }
                .rate {
                    .rate1 {
                        padding-top: 20px;
                        width: 100%;
                        height: 100px;
                        line-height: 100px;
                        .span1 {
                            color: #3D70FD;
                            font-size: 64px;
                            font-weight: bolder;
                        }
                        .span2 {
                            color: #3D70FD;
                            font-size: 30px;
                        }
                        .span3 {
                            color: #101010;
                            font-size: 50px;
                            margin-left: 20px;
                        }
                        .span4 {
                            color: #FF9800;
                            font-size: 64px;
                            font-weight: bolder;
                        }
                        .span5 {
                            color: #FF9800;
                            font-size: 30px;
                        }
                        .span6 {
                            float: right;
                            margin-right: 30px;
                            color: #979696;
                            font-size: 28px;
                        }
                    }
                    .rate2 {
                        display: flex;
                        justify-content: space-between;
                        height: 100px;
                        line-height: 100px;
                        color: #979696;
                        font-size: 28px;
                        padding-bottom: 20px;
                    }
                }
                .invest {
                    width: 700px;
                    margin-left: 10px;
                    background: #3D70FD;
                    color: #FFFFFF;
                    letter-spacing: 3px;
                }
            }
        }
        .introduce {
            width: 100%;
            height: auto;
            background-color: #FFFFFF;
            margin-top: 20px;
            .content {
                width: 720px;
                margin: 0 auto;
                h4 {
                    position: relative;
                    font-size: 28px;
                    border-bottom: 1px solid #F7F5F5;
                    line-height: 80px;
                    text-indent: 30px;
                    letter-spacing: 1px;
                }
                h4:before {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 50px;
                    background: #3D70FD;
                    position: absolute;
                    left: 0;
                    top: 15px;
                }
                .details {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    .item {
                        width: 350px;
                        height: 260px;
                        margin-top: 20px;
                        .imgBuild {
                            margin: 0 auto;
                            width: 300px;
                            height: 160px;
                        }
                        p {
                            width: 300px;
                            margin: 0 auto;
                            color: #101010;
                            font-size: 26px;
                        }

                    }
                }
            }
        }
        .foot {
            width: 100%;
            height: auto;
            background-color: #FFFFFF;
            margin-top: 20px;
            padding-bottom: 40px;
            .content {
                width: 720px;
                margin: 0 auto;
                h4 {
                    position: relative;
                    font-size: 28px;
                    border-bottom: 1px solid #F7F5F5;
                    line-height: 80px;
                    text-indent: 30px;
                    letter-spacing: 1px;
                }
                h4:before {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 50px;
                    background: #3D70FD;
                    position: absolute;
                    left: 0;
                    top: 15px;
                }
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
                        p {
                            text-align: center;
                            line-height: 80px;
                            color: #101010;
                            font-size: 26px;
                            letter-spacing: 2px;

                        }
                    }
                }
                .search-details {
                    width: 500px;
                    height: 50px;
                    line-height: 50px;
                    margin: 0 auto;
                    border: 3px solid #3D70FD;
                    border-radius: 25px;
                    text-align: center;
                }
            }
        }
    }
</style>
