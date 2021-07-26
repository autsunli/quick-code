new Vue({
  el: '#app',
  data: {
    list: []
  },
  mounted () {
    this.list = listData
    this.list.map((ele, index) => {
      ele.id = index
    })
  },
  methods: {
    shake () {
      // 获取旧图片的位置
      const prevImgs = this.$refs.imgs.slice()
      const prevSrcRectMap = createSrcRectMap(prevImgs)
      // 更新数据
      this.list = shuffle(this.list)
      // 使用nextTick后，此时是更新后的DOM
      // 当页面中的数据发生改变了，就会把该任务放到一个异步队列中，
      // 只有在当前任务空闲时才会进行DOM渲染，
      // 当DOM渲染完成以后，该函数会自动执行
      this.$nextTick(() => {
        const currentSrcRectMap = createSrcRectMap(prevImgs)
        Object.keys(prevSrcRectMap).forEach((src) => {
          const currentRect = currentSrcRectMap[src]
          const prevRect = prevSrcRectMap[src]

          const invert = {
            left: prevRect.left - currentRect.left,
            top: prevRect.top - currentRect.top
          }
          currentRect.img.animate([
            {
              transform: `translate(${invert.left}px, ${invert.top}px)`
            },
            { transform: 'translate(0, 0)' }
          ], {
            duration: 300,
            easing: 'cubic-bezier(0,0,0.32,1)'
          })
        })
      })
    }
  }
})