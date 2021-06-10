function genderPoints(x1, y1, x2, y2) {
  var x = x2 - x1;//宽
  console.log(x);
  var y = y2 - y1;//高
  var _points = [];
  var _point = function (x, y) { return { x: x, y: y }; }
  if (Math.abs(y) > Math.abs(x)) {
    if (y > 0) {
      for (var i = 0; i < y; i++) {
        var width = x / y * i;
        {
          _points.push(_point(width + x1, i + y1));
        }
      }
    }
    if (y < 0) {
      for (var i = 0; i > y; i--) {
        var width = x / y * i;
        {
          _points.push(_point(width + x1, i + y1));
        }
      }
    }
  } else {
    if (x > 0) {
      for (var i = 0; i < x; i++) {
        var height = y / x * i
        {
          _points.push(_point(i + x1, height + y1));
        }
      }
    }
    if (x < 0) {
      for (var i = 0; i > x; i--) {
        var height = y / x * i
        {
          _points.push(_point(i + x1, height + y1));
        }
      }
    }
  }
  return _points;
}


//当前位置
window.nowIndex = 0;
//是否继续
window.timeOutFlag = false;
//创建滚动元素
function createShuiyin(_id, _content, phone, _x, _y,p) {
  var x = _x || 0;
  var y = _y || 0;
  var oDiv = document.createElement('div');
  var op = document.createElement('h3');
  oDiv.appendChild(op)
  oDiv.style.position = 'absolute';
  oDiv.style.zIndex = 999;
  oDiv.style.color = 'red';
  oDiv.style.fontSize = '55px';
  oDiv.style.fontFamily = 'KaiTi';
  oDiv.style.left = x + 'px';
  oDiv.style.top = y + 'px';
  oDiv.style.width =  '600px';
  oDiv.setAttribute('id', _id);
  oDiv.innerHTML = p + '</br>' + "当前用户：" + phone;
  return oDiv;
}

//开始动画
window._start = function (name, phone) {
  if (window.nowIndex >= _points.length) {
    window.nowIndex = 0;
  }
  //当前应该出现的位置
  var nowPoint = window._points[window.nowIndex++];

  //获取水印节点
  var shuiyinDom = document.getElementById("_shuiyin");
  //没有就创建一个
  if (!shuiyinDom) {
    shuiyinDom = createShuiyin("_shuiyin", name, phone, nowPoint.x, nowPoint.y,'安知职业培训平台');
    var v = document.getElementById('J_prismPlayer');
    if (v) {
      v.appendChild(shuiyinDom);
    }
  }

  //设置位置
  shuiyinDom.style.left = nowPoint.x + "px";
  shuiyinDom.style.top = nowPoint.y + "px";
  shuiyinDom.style.display = "block";

  //执行下一次循环
  if (window.timeOutFlag == true) {
    setTimeout("_start()", 10);
  }
}

export function createSwigger(name,phone) {
  //屏幕高度
  // var availHeight = document.body.clientHeight;
  var availHeight = document.getElementById('disv').clientHeight;
  //屏幕宽度
  // var availWidth = document.body.clientWidth;
  var availWidth = document.getElementById('disv').clientWidth;

  //开始坐标
  var startPointX = availWidth-500, startPointY = 0;

  //结束坐标
  var endPointX = 0, endPointY = availHeight -200;

  //生成虚拟路径点集合
  window._points = genderPoints(startPointX, startPointY, endPointX, endPointY);
  // console.info(window._points);
  window.nowIndex = 0;
  window.timeOutFlag = true;
  window._start(name,phone);
}
export function distorySwigger() {
  window.timeOutFlag = false;
  setTimeout(function () {
    var shuiyinDom = document.getElementById("_shuiyin");
    if (shuiyinDom) {
      // document.getElementById('video_box').removeChild(shuiyinDom);
      shuiyinDom.remove();
    }
  }, 50)
};