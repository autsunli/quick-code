new Vue({
  el: '#app',
  data: {
    rectStyle: {
      left: '0px',
      top: '0px',
      width: '300px',
      height: '200px'
    }
  },
  mounted () {
    this.resizeType = null
    this.startDiff = {}
    this.parentPos = {}
  },
  methods: {
    dragStart (e) {
      const rectLayer = document.querySelector('.rect-layer')
      const { left: rectLeft, top: rectTop } = rectLayer.getBoundingClientRect()
      const parent = document.querySelector('.parent')
      this.parentPos = parent.getBoundingClientRect()
      const { clientX, clientY } = e
      this.startDiff = { x: clientX - parseInt(rectLeft), y: clientY - parseInt(rectTop) }
      document.addEventListener('mousemove', this.dragMove)
      document.addEventListener('mouseup', e => {
        document.removeEventListener('mousemove', this.dragMove)
      }, {once: true})
    },
    dragMove (e) {
      const { clientX, clientY } = e
      const parent = document.querySelector('.parent')
      const { left, top, width, height } = parent.getBoundingClientRect()
      const { width: rectWidth, height: rectHeight } = this.rectStyle
      this.rectStyle.left = range(clientX - left - this.startDiff.x, [0, width - parseInt(rectWidth) - 1]) + 'px'
      this.rectStyle.top = range(clientY - top - this.startDiff.y, [0, height - parseInt(rectHeight) - 1]) + 'px'
    },
    resize (e, type) {
      this.resizeType = type
      const parent = document.querySelector('.parent')
      this.parentPos = parent.getBoundingClientRect()
      const rect = document.querySelector('.rect-layer')
      this.startRect = rect.getBoundingClientRect()
      document.addEventListener('mousemove', this.resizing)
      document.addEventListener('mouseup', e => {
        document.removeEventListener('mousemove', this.resizing)
      }, {once: true})
    },
    resizing (e) {
      const { clientX, clientY } = e
      if (this.resizeType.includes('left')) {
        this.rectStyle.left = range(clientX - this.parentPos.left, [0, this.startRect.right - this.parentPos.left]) + 'px'
        this.rectStyle.width = range(this.startRect.left - clientX + this.startRect.width, [0, this.startRect.right - this.parentPos.left]) + 'px'
      } else if (this.resizeType.includes('right')) {
        this.rectStyle.width = range(clientX - this.startRect.left, [0, this.parentPos.right - this.startRect.left]) + 'px'
      }
      if (this.resizeType.includes('top')) {
        this.rectStyle.top = range(clientY - this.parentPos.top, [0, this.startRect.bottom - this.parentPos.top]) + 'px'
        this.rectStyle.height = range(this.startRect.top - clientY + this.startRect.height, [0, this.startRect.bottom - this.parentPos.top]) + 'px'
      } else if (this.resizeType.includes('bottom')) {
        this.rectStyle.height = range(clientY - this.startRect.top, [0, this.parentPos.bottom - this.startRect.top]) + 'px'
      }
    }
  }
})