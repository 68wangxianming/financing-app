const globalFunctions = {
    goBack() {
        window.history.go(-1);
    },
    formatMoney(money) {
        if (!money)
            return null;
        money = [...money.toString()].reverse().join('');
        let num = Math.ceil(money.length / 3);
        let arr = [];
        for (let i = 0; i < num; i++)
            arr.push([...money.substr(i * 3, 3)].reverse().join(''));
        return arr.reverse().join('.');
    },
    //流水
    flowType(num) {
        let arr = ['充值', '提现', '投资', '收益']
        return arr[num - 1]
    },
    flowStatus(num) {
        let arr = ['创建', '成功', '失败']
        return arr[num - 1]
    },
    //投资记录状态
    investorRecordStatus(num) {
        let arr = ['提交','待审核','审核失败','投资进行中','投资完毕，收益入账']
        return arr[num]
    },
    timeConversion(time) {
        let now = new Date(time);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (hour < 10) {
            hour = '0' + hour
        }
        var minute = now.getMinutes();
        if (minute < 10) {
            minute = '0' + minute
        }
        var second = now.getSeconds();
        if (second < 10) {
            second = '0' + second
        }
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
}

export default {
    install: (Vue) => {
        Vue.prototype.$globalFunction = globalFunctions;
    }
}
