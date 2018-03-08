<template>
<div ref="container" />
</template>
<script>
import Plotly from 'plotly.js'
import _ from 'lodash'

const events = [
  'click',
  'hover',
  'unhover',
  'selecting',
  'selected',
  'restyle',
  'relayout',
  'autosize',
  'deselect',
  'doubleclick',
  'redraw',
  'animated'
]

const functions = [
  'restyle',
  'relayout',
  'update',
  'addTraces',
  'deleteTraces',
  'moveTraces',
  'extendTraces',
  'prependTraces',
  'purge'
]

const methods = functions.reduce((all, funcName) => {
  all[funcName] = function(...args) {
    return Plotly[funcName].apply(Plotly, [this.$refs.container].concat(args))
  }
  return all
}, {})

export default {
  props: {
    autoResize: Boolean,
    watchShallow: false,
    options: {
      type: Object
    },
    data: {
      type: Array
    },
    layout: {
      type: Object
    },
    buttons: {
      type: Array
    }
  },
  data() {
    return {
      internalLayout: _.cloneDeep(this.layout)
    }
  },
  mounted() {
    this.newPlot()
    this.initEvents()

    this.$watch('data', this.newPlot, { deep: !this.watchShallow })
    this.$watch('layout', this.relayout, { deep: !this.watchShallow })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeListener)
    this.__generalListeners.forEach(obj => this.$refs.container.removeAllListeners(obj.eventName))
    Plotly.purge(this.$refs.container)
  },
  methods: {
    initEvents() {
      if (this.autoResize) {
        this.__resizeListener = _.debounce(this.plot, 200)
        window.addEventListener('resize', this.__resizeListener)
      }

      this.__generalListeners = events.map((eventName) => {
        return {
          eventName: eventName,
          fullName: 'plotly_' + eventName,
          listener: (...args) => {
            this.$emit.apply(this, [eventName].concat(args))
          }
        }
      })

      this.__generalListeners.forEach((obj) => {
        this.$refs.container.on(obj.fullName, obj.listener)
      })
    },
    ...methods,
    toImage(options) {
      var el = this.$refs.container
      var opts = _.defaults(options, {
        format: 'png',
        width: el.clientWidth,
        height: el.clientHeight
      })

      return Plotly.toImage(this.$refs.container, opts)
    },
    downloadImage(options) {
      var el = this.$refs.container
      var opts = _.defaults(options, {
        format: 'png',
        width: el.clientWidth,
        height: el.clientHeight,
        filename: (el.layout.title || 'plot') + ' - ' + new Date().toISOString()
      })

      return Plotly.downloadImage(this.$refs.container, opts)
    },
    plot(data) {
      return Plotly.plot(this.$refs.container, this.data, this.internalLayout, this.options)
    },
    newPlot(data) {
      return Plotly.newPlot(this.$refs.container, this.data, this.internalLayout, this.options)
    }
  }
}
</script>
<style>
</style>
