new Vue({
  el: '#app',
  data: {
    isDragging: false
  },
  mounted () {
    this.scrollSpeed = 0
    this.boxWidth = this.getBoxWidth()
  },
  methods: {
    getBoxWidth () {
      const width = this.$refs.dragBox.style.width
      return Number(width.replace(/px/, ''))
    },
    handleMouseUp (e) {
      if (this.isDragging) {
        this.isDragging = false
        const { style: { left } } = document.getElementById('draggingDiv')
        const divLeft = Number(left.replace(/px/, ''))
        this.$refs.dragBox.style.left = this.$refs.scrollEl.scrollLeft + divLeft + 'px'
        const dragContainer = document.getElementById('dragContainer')
        while (dragContainer.hasChildNodes()) {
          dragContainer.removeChild(dragContainer.firstChild)
        }
      }
    },
    handleMouseMove (e) {
      if (this.isDragging) {
        const draggingDiv = document.getElementById('draggingDiv')
        draggingDiv.style.left = e.clientX - (this.startXToMouse - this.startXOfScroll) + 'px'
        draggingDiv.style.top = e.clientY - this.startYToMouse + 'px'
        const left = draggingDiv.offsetLeft
        if (left < 0) {
          draggingDiv.style.left = '0px'
        }
        if (left >= this.$refs.realEl.offsetWidth - this.boxWidth - this.$refs.scrollEl.scrollLeft) {
          draggingDiv.style.left = this.$refs.realEl.offsetWidth - this.boxWidth - this.$refs.scrollEl.scrollLeft + 'px'
        }
        this.setSpeed(e)
      }
    },
    handleMouseDown (e) {
      this.isDragging = true
      const div = this.$refs.dragBox
      // console.log(div.getBoundingClientRect())
      let { top, left } = div.getBoundingClientRect()
      const newDiv = div.cloneNode(true)
      newDiv.id = 'draggingDiv'
      newDiv.style.left = left + 'px'
      newDiv.style.top = top + 'px'
      const dragContainer = document.getElementById('dragContainer')
      dragContainer.appendChild(newDiv)
      this.startXToMouse = e.clientX - left
      this.startYToMouse = e.clientY - top
      this.startXOfScroll = this.$refs.scrollEl.offsetLeft
      this.autoScroll()
      document.body.addEventListener('mousemove', this.handleMouseMove)
      document.body.addEventListener('mouseup', () => {
        document.body.removeEventListener('mousemove', this.handleMouseMove)
      }, {
        once: true
      })
    },
    autoScroll () {
      const auto = () => {
        if (this.isDragging) {
          const { offsetWidth, scrollLeft } = this.$refs.scrollEl
          // 滚动的距离不超过右侧边界，或者已经不需要滚动了
          if (scrollLeft <= this.$refs.realEl.offsetWidth - (offsetWidth - this.boxWidth) || this.scrollSpeed < 0) {
            this.$refs.scrollEl.scrollBy(this.scrollSpeed, 0)
          }
          window.requestAnimationFrame(auto)
        }
      }
      window.requestAnimationFrame(auto)
    },
    setSpeed (e) {
      const { offsetWidth } = this.$refs.scrollEl
      const { x } = e
      if (offsetWidth - x < this.boxWidth) {
        // 距离右侧小于50px，距离越小，速度越慢
        this.scrollSpeed = this.boxWidth - (offsetWidth - x)
      } else if (x < this.boxWidth) {
        // 距离左侧小于100，距离越小，速度越慢
        this.scrollSpeed = x - this.boxWidth
      } else {
        this.scrollSpeed = 0
      }
    }
  }
})
