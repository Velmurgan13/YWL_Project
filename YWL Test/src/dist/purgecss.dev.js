"use strict";

var purgecss = new Purgecss({
  content: ['**/*.html'],
  css: ['**/*.css']
});
var purgecssResult = purgecss.purge();