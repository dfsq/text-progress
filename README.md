# text-progress

TextProgress is a very simple text-based progress indicator. Insipored by terminal like proress bars it can be used to render simlpe progress.

## Installation

Installation with bower:

```
bower install --save text-progress
```

Or simply download dist folder from the repository and put in your assets folder.

## Demo

Take a look at hosted demo

http://dfsq.github.io/text-progress/

## API

TextProgress uses [UMD](https://github.com/umdjs/umd/blob/master/returnExports.js) pattern to export itself either as CommonJS/AMD module or global constructor.

Instance object has few methods to control behavior:

* **set** - Sets the current absolute value of the progress (not percent).
* **increment** - Increment progress by specified value. Takes single numeric argument. Adds up to current *value*.
* **getPercent** - Get current progress percent value.

## License

Copyright (c) 2015 Aliaksandr Astashenkau

Licensed under the [MIT License](https://github.com/dfsq/text-progress/blob/master/LICENSE).
