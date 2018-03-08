# vue-plotly

## Install

```bash
npm install vue-plotly plotly.js --save
```

Then use it as a module:

```bash
import VuePlotly from 'vue-plotly'
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

* `autoResize` (default: `false`)

  If true, the graph resizes when the window is resized.

* `watchShallow` (default: `false`)

  If true, does not trigger a redraw when child properties of data changes, but not the data object itself. Might be needed for large datasets.

## Function reference

All functions defined by plotly are available as methods on the component. However it is **not recommendable** to call most of these manually since it is better to change the reactive properties on the data, layout or options directly, This will in turn trigger an update to the graph. If you do call these manually, the graph data and the props data might not be in sync.

For certain scenarios though it, like downloading an image, you need to call these functions. You call the functions as you would normally, but without the first argument, the DOM element.

Read more about plotlyjs function reference here:
https://plot.ly/javascript/plotlyjs-function-reference/
