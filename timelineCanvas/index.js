new Vue({
  el: '#app',
  data: {
  },
  mounted () {
    this.hasMouseDown = false
    this.duration = 32
    const { width, height, left } = document.querySelector('.thumbnails').getBoundingClientRect()
    this.containerWidth = width
    this.containerHeight = height
    this.containerLeft = left
    this.cHeight = height
    this.cWidth = height * 16 / 9
    this.imgs = this.buildImages()
    this.buildThumbnails()
  },
  methods: {
    handlePointerMouseup () {
      this.hasMouseDown = false
    },
    handlePointerMousemove ($event) {
      if (this.hasMouseDown) {
        const { clientX } = $event
        this.$refs.pointer.style.left = clientX - this.containerLeft + 'px'
      }
    },
    handlePointerMousedown ($event) {
      this.hasMouseDown = true
      const { clientX } = $event
      this.$refs.pointer.style.left = clientX - this.containerLeft + 'px'
    },
    buildImages () {
      const totalImgCount = this.duration + 1
      const id = 'a0d582d5-8d17-440a-9891-9a6cf5237664'
      const baseUrl = `https://alieasset.meishesdk.com/editor/2021/08/29/video-thumbnail/${id}/${id}-`
      const suffix = '.jpg'
      const imgCount = Math.floor(this.containerWidth / this.cWidth)
      const arr = []
      for (let index = 0; index < totalImgCount;) {
        const imgIndex = String(Array(4 - String(index).length).fill(0).join('')) + index + '000'
        arr.push(baseUrl + imgIndex + suffix)
        index += Math.ceil(totalImgCount / imgCount)
      }
      if (arr.length * this.cWidth < this.containerWidth) {
        const index = totalImgCount - 1
        const imgIndex = String(Array(4 - String(index).length).fill(0).join('')) + index + '000'
        arr.push(baseUrl + imgIndex + suffix)
      }
      return arr
    },
    buildThumbnails () {
      const canvas = document.getElementById('thumbnails-canvas')
      canvas.style.width = this.containerWidth + 'px'
      canvas.style.height = this.containerHeight + 'px'
      canvas.setAttribute('width', this.containerWidth * 2)
      canvas.setAttribute('height', this.containerHeight * 2)
      const ctx = canvas.getContext('2d')
      ctx.scale(2, 2)
      // canvas.addEventListener("mousemove", function (event) {
      //   const { clientX, clientY } = event
      //   console.log(clientX, clientY);
      // })
      const buildCanvas = n => {
        if (n < this.imgs.length) {
          const img = new Image()
          img.crossOrigin = 'Anonymous'
          img.onload = () => {
            ctx.drawImage(img, this.cWidth * n, 0, this.cWidth, this.cHeight)
          }
          img.src = this.imgs[n]
          buildCanvas(n + 1)
        }
      }
      buildCanvas(0)
    }
  }
})