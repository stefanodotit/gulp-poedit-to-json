# gulp-poedit-to-json

Convert all poedit file (only active string) into a new json file with the same name. <br>
Perfect for Angular2 translate.

Installation
------------

`npm install gulp-poedit-to-json --save-dev`

Params
-----
path: '/path/to/poedit/folder'

Example
-----

```js
var gulp = require('gulp'),
    poeditToJson = require('gulp-poedit-to-json');

gulp.task('default',['poeditToJson']);

gulp.task('poeditToJson', function(){
  return poeditToJson({ path: '/path/to/poedit/folder'});
});
```
