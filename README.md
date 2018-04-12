# vue-plotly [![Build Status](https://travis-ci.org/statnett/vue-plotly.svg?branch=master)](https://travis-ci.org/statnett/vue-plotly) [![Coverage Status](https://coveralls.io/repos/github/statnett/vue-plotly/badge.svg?branch=master)](https://coveralls.io/github/statnett/vue-plotly?branch=master)

## Install

```bash
npm install @statnett/vue-plotly plotly.js --save
```

Then use it as a module:

```js
import VuePlotly from '@statnett/vue-plotly'

export default {
  components: {
    VuePlotly
  },
  data: function () {
    return {
      data: [{ x: [1, 3], y: [2, 4] }],
      layout: {},
      options: {}
    }
  }
}
```

```html
<vue-plotly :data="data" :layout="layout" :options="options"/>
```

### Webpack

To use vue-plotly with webpack you should see [this example repo](https://github.com/plotly/plotly-webpack) for how to make that work.

In short, install `ify-loader` and `transform-loader` and add the following to your webpack config:

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        'ify-loader',
        'transform-loader?plotly.js/tasks/util/compress_attributes.js',
      ]
    }
  ]
}
```

https://plot.ly/javascript/getting-started/#start-plotting might also be relevant.

### Browser

The browser [UMD](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) build is located in the `dist` folder.

## Props

The component supports the following props:

* `data`

  The traces to draw. Will trigger a call to newPlot when changed.

* `layout`

  The layout options. Will trigger a relayout when changed.

* `options`

  The general options https://github.com/plotly/plotly.js/blob/master/src/plot_api/plot_config.js

* `autoResize` (default: `false`, not reactive)

  If true, the graph resizes when the window is resized.

* `watchShallow` (default: `false`, not reactive)

  If true, does not trigger a redraw when child properties of data changes, but not the data object itself. Might be needed for large datasets.


## Events

All plotly events are captured and emitted as vue events. The names are without the `plotly_` prefix. The following events are supported:

`click`, `hover`, `unhover`, `selecting`, `selected`, `restyle`, `relayout`, `autosize`, `deselect`, `doubleclick`, `redraw`, `animated`


## Function reference

All functions defined by plotly are available as methods on the component. However it is **not recommendable** to call most of these manually since it is better to change the reactive properties on the data, layout or options directly, This will in turn trigger an update to the graph. If you do call these manually, the graph data and the props data might not be in sync.

For certain scenarios though it, like downloading an image, you need to call these functions. You call the functions as you would normally, but without the first argument, the DOM element.

The following functions are exposed:

`restyle`, `relayout`, `update`, `addTraces`, `deleteTraces`, `moveTraces`, `extendTraces`, `prependTraces`, `purge`, `toImage`, `downloadImage`, `plot`, `newPlot`

Some have special handling:

- `toImage`

Has default png format, and graph width and height pre filled, this can be overridden.

- `downloadImage`

Has default png format, and graph width and height pre filled. Filename is set to the title of the graph and with a date postfix. These can all be overridden.

- `plot`

Accepts no arguments. Uses data, layout and options from the props data.

- `newPlot`

Accepts no arguments. Uses data, layout and options from the props data.


Read more about plotlyjs function reference here:
https://plot.ly/javascript/plotlyjs-function-reference/
