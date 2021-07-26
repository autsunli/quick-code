function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle (arr) {
  const ret = arr.slice()
  for (let i = 0; i < ret.length; i++) {
    const j = getRandomInt(0, i)
    const t = ret[i]
    ret[i] = ret[j]
    ret[j] = t
  }
  return ret
}

function createSrcRectMap (imgs) {
  return imgs.reduce((prev, img) => {
    const { left, top } = img.getBoundingClientRect()
    prev[img.src] = { left, top, img }
    return prev
  }, {})
}

function setAnimationFrame (render, time) {
  //当前执行时间
  var nowTime = 0;
  //记录每次动画执行结束的时间
  var lastTime = Date.now();
  //我们自己定义的动画时间差值
  var diffTime = time;
  //当前requestAnimationFrame的id
  //此处使用对象，对象存储在地址空间，函数内部更新了对象的值，函数外部也可以接收到
  var timer = {};
  function animloop () {
    //记录当前时间
    nowTime = Date.now();
    if (nowTime - lastTime > diffTime) {
      lastTime = nowTime
      render();
    }
    //timerid为数字
    timer.id = requestAnimationFrame(animloop);
  }
  animloop()
  return timer;
}

function clearAnimationFrame (obj) {
  if (typeof obj !== 'undefined') {
    cancelAnimationFrame(obj.id)
  }
}

function range (val, [min, max]) {
  return Math.max(Math.min(val, max), min)
}