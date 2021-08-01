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
      // 数据变了，但是还没有更新dom节点
      this.list = shuffle(this.list)
      this.$nextTick(() => {
        // 数据改变，dom节点更新后，才会触发
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