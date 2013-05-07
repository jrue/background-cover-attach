Background Cover Attach JS
========

I love the `background-size:cover` CSS property. It automatically adjusts background images to fill a div, picking either the width or height as the point of scale depending on the height-width ratio of the div. It's a great solution to responsively designed backgrounds.

But there is a problem I've run into on a few occasions, which is positioning items on top of the backgrounds. Many times you want items to reposition based on the scale of the background image.

This is a small jQuery plugin I wrote to help fix that. 

**Example**

<img src="https://raw.github.com/jrue/background-cover-attach/master/demo/example.gif" width="200" height="225" alt="example of plugin in action" />

```javascript
$('#container a').bgCoverAttach();
```

Some of the optional parameters include setting a different container div which has the `background-size:cover` property, and setting a different `top` or `left` CSS values.

```javascript
//optional. Will auto-detect this.
$('#container a').bgCoverAttach({
	parentelm			: '#container',
	top					: '400px',
	left				: '50px'
});
```

Plugin by [Jeremy Rue](http://jeremyrue.com/)