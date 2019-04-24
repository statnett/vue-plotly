import Plotly from '@/Plotly'
import {
  shallowMount
} from '@vue/test-utils'

describe('vue-plotly', () => {
  var wrapper
  var vm
  var data
  beforeEach(function() {
    data = [{
      x: [1, 2],
      y: [5, 7]
    }]
    wrapper = shallowMount(Plotly, {
      attachToDocument: true,
      propsData: {
        data: data
      }
    })
    vm = wrapper.vm
  })

  it('draws a simple graph', function() {
    var svg = wrapper.find('svg')
    expect(svg.exists()).to.eql(true)
  })

  it('plots one trace', function() {
    var plots = wrapper.findAll('.trace')
    expect(plots.length).to.eql(1)
  })

  describe('events', function() {
    it.skip('is skipped because it is really hard to test', function() {
      var trace = wrapper.find('.point')
      wrapper.trigger('plotly_click')
      wrapper.trigger('click')
      trace.trigger('plotly_click')
      trace.trigger('click')

      var event = new Event('plotly_click')
      wrapper.element.dispatchEvent(event)

      wrapper.element.emit('plotly_click', {})
      wrapper.element.emit('click', {})

      var event2 = document.createEvent('HTMLEvents')
      event2.initEvent('plotly_click', true, true)
      wrapper.element.dispatchEvent(event2)

      expect(wrapper.emitted()).to.eql({
        click: null
      })
    })
  })

  describe('removing traces through props', function() {
    it('redraws to 1 trace', function() {
      data.push({
        y: [9, 8],
        x: [1, 2]
      })
      wrapper.setProps({
        data: data
      })
      var plots = wrapper.findAll('.trace')
      expect(plots.length).to.eql(2)

      data.splice(0, 1)
      wrapper.setProps({
        data: data
      })
      plots = wrapper.findAll('.trace')
      expect(plots.length).to.eql(1)
    })
  })

  describe('adding traces through props', function() {
    it('draws the new single trace', function() {
      data.push({
        y: [9, 8],
        x: [1, 2]
      })
      wrapper.setProps({
        data: data
      })
      var plots = wrapper.findAll('.trace')
      expect(plots.length).to.eql(2)
    })

    it('draws the new traces', function() {
      data.push({
        y: [9, 8],
        x: [1, 2]
      })
      data.push({
        y: [3, 7],
        x: [1, 2]
      })
      wrapper.setProps({
        data: data
      })
      var plots = wrapper.findAll('.trace')
      expect(plots.length).to.eql(3)
    })
  })

  describe('adding traces through function', function() {
    it('draws the new trace', function() {
      return vm.addTraces({
        y: [9, 8],
        x: [1, 2]
      }).then(function() {
        var plots = wrapper.findAll('.trace')
        expect(plots.length).to.eql(2)
      })
    })
  })

  describe('watch shallow vs deep', function() {
    it('watches deep by default', function(done) {
      var points = wrapper.findAll('.point')
      expect(points.length).to.eql(2)
      data[0].y.splice(1, 1)

      wrapper.vm.$nextTick(() => {
        points = wrapper.findAll('.point')
        expect(points.length).to.eql(1)
        done()
      })
    })

    it('does not watch deep if watchShallow: true', function(done) {
      wrapper = shallowMount(Plotly, {
        attachToDocument: true,
        propsData: {
          data: data,
          watchShallow: true
        }
      })
      var points = wrapper.findAll('.point')
      expect(points.length).to.eql(2)
      data[0].y.splice(1, 1)
      setTimeout(function() {
        points = wrapper.findAll('.point')
        expect(points.length).to.eql(2)
        done()
      }, 100)
    })
  })
})
