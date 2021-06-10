import Vue from "vue";
import store from '../store';

/**
 * @常用的方法
 */

/** 
 * @重置data数据
 */
// Object.assign(this.$data, this.$options.data())

/** 
 * @将data中的某个数据重置到初始状态
 */
// this.Notica = this.$options.data().Notica

/** 
 * @简单的清空对象的值
 */
// Object.keys(form).forEach(key => (form[key] = ''))

export default {

    // 个人喜欢的 console.log() 颜色
    log(info, color) {
        if (color == 1) {// 红色
            console.log("%c author: (ApJieLop) time: (" + new Date(new Date().getTime()).Format('yy-MM-dd hh:mm:ss') + ") =>", "color:#ff3838", info);
        } else if (color == 2) {// 蓝色    
            console.log("%c author: (ApJieLop) time: (" + new Date(new Date().getTime()).Format('yy-MM-dd hh:mm:ss') + ") =>", "color:#1890ff", info);
        } else if (color == 3) {// 黄色
            console.log("%c author: (ApJieLop) time: (" + new Date(new Date().getTime()).Format('yy-MM-dd hh:mm:ss') + ") =>", "color:#ff18ed", info);
        } else {
            console.log(info)
        }
    },

    // 16进制转2进制
    hex_to_bin(str) {
        let hex_array = [{ key: 0, val: "0000" }, { key: 1, val: "0001" }, { key: 2, val: "0010" }, { key: 3, val: "0011" }, { key: 4, val: "0100" }, { key: 5, val: "0101" }, { key: 6, val: "0110" }, { key: 7, val: "0111" },
        { key: 8, val: "1000" }, { key: 9, val: "1001" }, { key: 'a', val: "1010" }, { key: 'b', val: "1011" }, { key: 'c', val: "1100" }, { key: 'd', val: "1101" }, { key: 'e', val: "1110" }, { key: 'f', val: "1111" }]
        let value = ""
        for (let i = 0; i < str.length; i++) {
            for (let j = 0; j < hex_array.length; j++) {
                if (str.charAt(i).toLowerCase() == hex_array[j].key) {
                    value = value.concat(hex_array[j].val)
                    break
                }
            }
        }
        return value
    },

    // 截取字符串后几位
    getString1(str, num) {
        return str.substr(str.length - num);
    },

    // 截取字符串前几位
    getString2(str, lengthNum) {
        return str.substr(0, lengthNum);
    },

    // 截取数组第几位到第几位
    getString3(str, num1, num2) {
        return str.slice(num1, num2);
    },

    // 数字数组变成字符串数字
    arrToString(arr) {
        return arr.join(',')
    },

    // 去掉字符串中所有特殊符号
    specialSymbols(str) {
        let text = str.replace(/[&\|\\\*^%,:$#@\-]/g, "").replace(/\s*/g, "");
        return text;
    },

    // 查看字符串的某一位的字符
    someoneString(val, num) {
        return val.charAt(num)
    },

    // 去掉字符中左侧的空格
    stringRemoveLeftSpace(str) {
        let text = str.replace(/^\s*/, "");
        return text;
    },

    // 去掉字符串中指定的字符
    specialAppoint(val, characters) {
        let reg = new RegExp(characters);
        val = val.replace(reg, "");
        return val
        // 用法 ： specialAppoint('该字符串','指定的字符*去除多个可用逗号分隔*')
    },
    // check(num) {
    //     let reg = /^\d{1,6}(\.\d{1,2})?$/
    //     if (!reg.test(num)) {
    //         console.log(num);
    //     } else {
    //         return num
    //     }
    // },
    // 判定input的值限制只能是数(包括小数),小数点后几位
    oninput(num, limit) {
        if (num) {
            var str = num
            var value = ''
            var len1 = str.substr(0, 1)
            var len2 = str.substr(1, 1)
            // 如果第一位是0，第二位不是点，就用数字把点替换掉
            if (str.length > 1 && len1 == 0 && len2 != ".") {
                str = str.substr(1, 1)
            }
            // 第一位不能是.
            if (len1 == ".") {
                str = "";
            }
            // 限制只能输入一个小数点
            if (str.indexOf(".") != -1) {
                var str_ = str.substr(str.indexOf(".") + 1)
                if (str_.indexOf(".") != -1) {
                    str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
                }
            }
            // 限制只能输入一个小负数
            if (str.indexOf("-") != -1) {
                var strz = str.substr(str.indexOf("-") + 1)
                if (strz.indexOf("-") != -1) {
                    str = str.substr(0, str.indexOf("-") + strz.indexOf("-") + 1)
                }
            }

            // 正则替换
            str = str.replace(/[^\-?\d.]/g, '') // 保留数字,小数,负数         
            // str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
            if (limit == 1) {
                // str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, '$1') // 小数点后只能输 1 位
                // str = str.replace(/^[+-]?\d*\.?\d{0,1}$/) // 小数点后只能输 1 位
                // str = str.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$2', '$1') // 小数点后只能输 1 位
            } else if (limit == 2) {
                // str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1') // 小数点后只能输 2 位
                // str = str.replace(/^[+-]?\d*\.?\d{0,2}$/) // 小数点后只能输 1 位
                str = str.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3', '$1') // 小数点后只能输 2 位
            }
            if (str.indexOf('.') != -1) {
                str = value.substr(0, value.indexOf('.') + 1) + num
            } else {
                if (str.length > 6) {
                    str = str.substr(0, 6)
                }
            }

            return str
        }
        // 用法：在input中 @keyup.native="data绑定的值 = oninput(data绑定的值,小数后几位)"
    },

    // 判定input的值限制只能是数(包括小数),小数点后几位
    oninput2(num, limit) {
        if (num) {
            var str = num
            var len1 = str.substr(0, 1)
            var len2 = str.substr(1, 1)
            // 如果第一位是0，第二位不是点，就用数字把点替换掉
            if (str.length > 1 && len1 == 0 && len2 != ".") {
                str = str.substr(1, 1)
            }
            // 第一位不能是.
            if (len1 == ".") {
                str = "";
            }
            // 限制只能输入一个小数点
            if (str.indexOf(".") != -1) {
                var str_ = str.substr(str.indexOf(".") + 1)
                if (str_.indexOf(".") != -1) {
                    str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
                }
            }
            // 限制只能输入一个小负数
            if (str.indexOf("-") != -1) {
                var strz = str.substr(str.indexOf("-") + 1)
                if (strz.indexOf("-") != -1) {
                    str = str.substr(0, str.indexOf("-") + strz.indexOf("-") + 1)
                }
            }
            // 正则替换
            str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
            if (limit == 1) {
                str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, '$1') // 小数点后只能输 1 位
            } else if (limit == 2) {
                str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1') // 小数点后只能输 2 位
            }
            return str
        }
        // 用法：在input中 @keyup.native="data绑定的值 = oninput2(data绑定的值,小数后几位)"
    },

    // 两个数的算法 - 去除浮点
    delFNum(data1, data2, operationMode) {
        let datas
        if (operationMode == '+') {
            datas = parseFloat((data1 + data2).toFixed(6))
        }
        if (operationMode == '-') {
            datas = parseFloat((data1 - data2).toFixed(6))
        }
        if (operationMode == '*') {
            datas = parseFloat((data1 * data2).toFixed(6))
        }
        if (operationMode == '/') {
            datas = parseFloat((data1 / data2).toFixed(6))
        }
        return datas
    },

    // 判定input的值限制为正整数
    positiveInteger(num) {
        if (!(/(^[1-9]\d*$)/.test(num))) {
            num = '';
        } else {
            return num;
        }
        // 用法：在input中 @keyup.native="data绑定的值 = positiveInteger(data绑定的值)"
    },
    // 四舍五入 - （要被处理的数,保留几位小数）
    format45(val1, val2) {
        if (!val1) { return null }
        return Math.round(val1 * val2) / val2;
    },
    negativeTurnjust1(value) {
        return value = value.replace(/^0(0+)|[^\d]+/g, '')
    },
    // 负数变正数
    negativeTurnjust(num) {
        return Math.abs(num)
    },

    // 删除对象属性值
    delObject(num) {
        for (var key in num) {
            delete num[key];
        }
        return num;
    },
    // 判断数据是否有重复的
    isRepeat(arr) {
        var hash = {};
        for (var i in arr) {
            if (hash[arr[i]]) {
                return true;
            }
            // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
            hash[arr[i]] = true;
        }
        return false;
    },
    // webSocket
    socket() {
        let socket = new WebSocket("ws://182.43.128.186:3255");
        // 打开Socket
        socket.onopen = function (event) {
            // 发送一个初始化消息
            socket.send("a_" + localStorage.getItem('uid'));
            setInterval(() => {
                socket.send("a_" + localStorage.getItem('uid'));
            }, 25000);
            // 监听消息
            socket.onmessage = function (event) {
                let data = JSON.parse(event.data);
                store.commit("setsocketData", data);
            };
            // 监听Socket的关闭
            socket.onclose = function (event) {
                console.log("close:", event);
            };
            // 关闭Socket....
            // socket.close()
        };
    },

    // 判断浏览器的类型
    myBrowser() {
        let message;
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1
            && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion < 9) {
                alert("小于IE9版本")
                message = "小于IE9版本";
            }
        }
        if (isOpera) {
            // alert("Opera")
            return "Opera";
        }
        if (isEdge) {
            // alert("Edge")
            return "Edge";
        }
        if (isFF) {
            // alert("FF")
            return "FF";
        }
        if (isSafari) {
            // alert("Safari")
            return "Safari";
        }
        if (isChrome) {
            // alert("Chrome")
            return "Chrome";
        }
    },

    // 2017-09-19 转 Tue Sep 19 2017 08:00:00 GMT+0800 (中国标准时间)
    formatterDate(date) {
        let result = new Date(date);
        return result;
    },

    // 和获取Cookie
    getCookie(name) { //获取指定名称的cookie值
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    },

    // 判断电脑系统
    detectOS() {
        var sUserAgent = navigator.userAgent;
        console.log(); // true
        if (RegExp(/Windows/).test(sUserAgent) || RegExp(/windows/).test(sUserAgent)) {
            return "windows"
        } else {
            return null
        }
    }
}