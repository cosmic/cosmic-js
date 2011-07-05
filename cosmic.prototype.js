/**
 * Switches to the next background-image by incrementing the
 * background-image ccs property (eg: name1.jpg, name2.jpg, name3jpg, etc.)
 * Starts back at 1 when max is reached.
 *
 * Example:
 *   $('foo').style.backgroundImage = "url(foo1.jpg)"
 *   $('foo').incrementBackgroundImage(5)
 *   $('foo').style.backgroundImage # => "url(foo2.jpg)"
**/
Element.addMethods({
  incrementBackgroundImage: function(element, max) {
    var style = $(element).getStyle('background-image')
    var imageRe = /([0-9]+)\.jpg/
    var current = parseInt(style.match(imageRe)[1], 10)
    var next = (current == max) ? 1 : current + 1;
    $(element).setStyle({
      backgroundImage: style.replace(imageRe, next + '.jpg')
    })
  }
})
