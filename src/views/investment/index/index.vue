<template>
    <div class="investment">
        <div class="showRate">
            <div class="content">
                <p class="rate">
                    <span class="span1">12%</span>
                    <span class="span2">+</span>
                    <span class="span3">1.5</span>
                    <span class="span4">%</span>
                </p>
                <p class="info">期望年化回报率</p>
                <div class="chooseDate">
                    <div class="item" v-for="(item,index) in daysList">
                        <mt-button size="small" class="date" :class="typeDate==index?'account__selected':''"
                                   @click="choose(index,item)">
                            {{item.name}}
                        </mt-button>
                    </div>
                </div>
                <mt-button class="invest" size="small">立即投资</mt-button>
            </div>
        </div>
        <div class="billboard">
            <div class="content" @click="goPage('/darenList')">
                <span class="title">投资达人榜 <span>精选全平台投资牛人</span></span>
                <i class="icon iconfont icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
            </div>
        </div>
        <div class="lunbo">
            <div class="content">
                <swiper :options="swiperOption">
                    <swiper-slide>
                        <div class="item">
                            <img src="./img/head.png" alt="">
                            <p class="name">Luc****ong</p>
                            <p>累计投资超</p>
                            <p>Rp8,000,000</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="item">
                            <img src="./img/head.png" alt="">
                            <p class="name">Luc****ong</p>
                            <p>累计投资超</p>
                            <p>Rp8,000,000</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="item">
                            <img src="./img/head.png" alt="">
                            <p class="name">Luc****ong</p>
                            <p>累计投资超</p>
                            <p>Rp8,000,000</p>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="item">
                            <img src="./img/head.png" alt="">
                            <p class="name">Luc****ong</p>
                            <p>累计投资超</p>
                            <p>Rp8,000,000</p>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="foot">
            <div class="content">
                <p>预期年化利率不等于实际投资回报，以实际投资回报为准</p>
                <div class="search-details">资金存管安全，请放心投资</div>
            </div>
        </div>
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
                daysList: [
                    {name: '1个月'},
                    {name: '3个月'},
                    {name: '6个月'},
                    {name: '12个月'}
                ],
                typeDate: 3,
                swiperOption: {//swiper3
                    autoplay: 1000,
                    speed: 1000,
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        },
        methods: {
            choose(index, item) {
                this.typeDate = index
            },
            goPage(str) {
                this.$router.push(str)
            }
        }
    }
</script>

<style scoped lang="scss">
    .investment {
        overflow: auto;
        background-color: #F9F9F9;
        .showRate {
            width: 100%;
            height: auto;
            background-color: #FFFFFF;
            padding-bottom: 50px;
            .content {
                width: 720px;
                margin: 0 auto;
                .rate {
                    width: 100%;
                    height: 150px;
                    line-height: 150px;
                    padding-top: 100px;
                    .span1 {
                        margin-left: 250px;
                        color: #3D70FD;
                        font-size: 90px;
                        font-weight: bolder;
                    }
                    .span2 {
                        color: #101010;
                        font-size: 60px;
                        margin-left: 30px;
                    }
                    .span3 {
                        color: #FF9800;
                        font-size: 70px;
                    }
                    .span4 {
                        color: #FF9800;
                        font-size: 40px;
                    }
                }
                .info {
                    text-align: center;
                    color: #979696;
                    font-size: 28px;
                }
                .chooseDate {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: space-between;
                    padding: 70px 0 100px 0;
                    .item {
                        .date {
                            letter-spacing: 2px;
                            height: 54px;
                            border: 2px solid #3D70FD;
                            color: #3D70FD;
                            background-color: #ffffff;
                        }
                        .account__selected {
                            background-color: #3D70FD;
                            color: #ffffff;
                        }
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
        .billboard {
            width: 100%;
            height: auto;
            background-color: #FFFFFF;
            margin-top: 20px;
            .content {
                width: 720px;
                margin: 0 auto;
                height: 90px;
                line-height: 90px;
                display: flex;
                justify-content: space-between;
                .title {
                    color: #101010;
                    font-size: 30px;
                    span {
                        color: #979696;
                        font-size: 28px;
                        margin-left: 30px;
                    }
                }
                i {
                    font-size: 38px;
                    font-weight: bolder;
                    color: #979696;
                }
            }
        }
        .lunbo {
            width: 100%;
            height: auto;
            margin-top: 20px;
            .content {
                width: 720px;
                margin: 0 auto;
                .item {
                    width: 230px;
                    height: 300px;
                    border: 1px solid rgba(232, 229, 229, 1);
                    text-align: center;
                    background-color: #FFFFFF;
                    img {
                        display: block;
                        margin: 50px auto 10px;
                        width: 80px;
                        height: 80px;
                    }
                    p {
                        color: #979696;
                        font-size: 28px;
                        letter-spacing: 1px;
                        line-height: 40px;
                    }
                    .name {
                        color: #101010;
                    }
                }
            }

        }
        .foot{
            width: 100%;
            height: auto;
            margin-top: 20px;
            background-color: #FFFFFF;
            padding-bottom: 40px;
            .content{
                width: 720px;
                margin: 0 auto;
                p{
                    color: #979696;
                    line-height: 100px;
                    font-size: 22px;
                    text-align: center;
                }
                .search-details{
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
