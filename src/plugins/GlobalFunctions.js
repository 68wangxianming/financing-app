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
    }
}

export default {
    install: (Vue) => {
        Vue.prototype.$globalFunction = globalFunctions;
    }
}
