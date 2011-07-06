// Change the window location #hash and makes sure it doesn't scroll
// by renaming the id temporarily
// Example: $.changeHashWithoutScrolling('#foo')
$.changeHashWithoutScrolling = function(hash) {
  var elem = $(hash)
  if (!elem.length)
    return
  var id = elem.attr('id')
  elem.attr('id', id+'-tmp')
  window.location.hash = hash
  elem.attr('id', id)
}

// Returns or replaces remplace the full html of the first element
// Example:
//   $('<p>').html()       # => 'Foo'
//   $('<p>').outerHtml()  # => '<p>Foo</p>'
//   $('<p>').outerHtml('<div>Toto</div>')
$.fn.outerHtml = function(s) {
  return s
    ? this.before(s).remove()
    : $('<p>').append(this.eq(0).clone()).html()
}

// Return the element where the current anchor link points to
// Example:
//   <a href="#bar">Foo</a>
//   <span id="bar">Bar</span>
//   <script>
//     $('a').anchor().text() # => "Bar"
//   </script>
$.fn.anchor = function() {
  return $($(this).attr('href').replace(/^.*#/, '#'))
}

// Formats the value of the elements to the french thousands
// Example: $('<input val="4200" type="number">') # => Changes value to "4 200"
$.fn.formatValFrench = function() {
  return $(this).each(function() {
    var val = $(this).val().toString().replace(/\s+/g, '');
    if (val.length < 4)
      return;
    var div = val.length % 3,
        start = div ? val.substr(0, div) + ' ' : '',
        end = val.substr(div).match(/[0-9a-zA-Z]{3}/g).join(' ');
    $(this).val(start + end);
  })
}

/**
 * Vertically align in the middle the contents of the element by
 * changing its height and padding.
 *
 * For example if the element actually takes up 30px but has the style:
 *   height:40px
 * This will change the style to:
 *   height:auto; padding-top:5px; padding-bottom:5px
**/
$.fn.verticalAlignPadding = function() {
  $(this).each(function() {
    var $this = $(this),
        paddingTop = parseInt($this.css('padding-top'), 10),
        paddingBottom = parseInt($this.css('padding-bottom'), 10),
        height = parseInt($this.css('height'), 10) - paddingTop - paddingBottom

    // Build a new height by adjusting padding only
    $this.css('height', 'auto')
    var autoHeight = $this.height(),
        diff = (height-autoHeight)/2
    $this.css({ 'padding-top': paddingTop+diff, 'padding-bottom': paddingBottom+diff })
  })
}


/**
* jQuery Crash (http://mktgdept.com/jquery-crash)
* A jQuery plugin to crash IE6.
*
* v0.0.2 - 5 March 2010
*
* Copyright (c) 2009 Chad Smith (http://twitter.com/chadsmith)
* Dual licensed under the MIT and GPL licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/gpl-license.php
*
* Use $.crash();
*
**/
;$.crash=function(x){for(x in document.open);};

// Returns a random element from a collection
// Example: $('p').randElement()
$.fn.randElement = function() {
  return $(this).eq(Math.round(Math.random()*(this.length-1)));
}

// Clears a text-field of it's default value on focus
// (Keeps the default in the `data-default` attribute)
$.fn.clearDefault = function() {
  return $(this).each(function(i, elem) {
    var elem = $(elem);
    elem.attr('data-default', elem.val());
    elem.focus(function(e) {
      if (elem.val() == elem.attr('data-default'))
        elem.val('');
    });
  });
}

// Use it on labels to add the "error" class if the "error" class appears
// on the associated input by looking at the for="" attribute or its children.
//
// Examples:
//   <input id="bob" class="error" /> <label for="bob">Bob</label>
//   <script>$('label').copyErrorClassFromInput()</script>
//   # => <input id="bob" class="error" /> <label for="bob" class="error">Bob</label>
//
//   <div><input class="error" /></div>
//   <script>$('div').copyErrorClassFromInput()</script>
//   # => <div class="error"><input class="error" /></div>
$.fn.copyErrorClassFromInput = function() {
  return $(this).each(function(i, elem) {
    var idFor = $(elem).attr('for');
    var input = idFor ? $('#'+idFor+'.error') : $(this).find('input.error');
    if (input.length > 0)
      $(this).addClass('error');
  })
}

// Like .serialize() but works on elements like inputs whether than forms
// $(jQuery).serializeArrayElem()
$.fn.serializeArrayElem = function() {
  return $(this).map(function(i, elem) {
    return { name: elem.name, value: $(this).val() };
  });
}



// Like $.fn.toggleClass() but to switch between two different classes rather than just one
$.fn.toggleClasses = function(firstclass, secondclass) {
  return $(this).each(function(i, elem) {
    var elem = $(elem)
    if (elem.hasClass(firstclass))
      elem.removeClass(firstclass).addClass(secondclass)
    else
      elem.removeClass(secondclass).addClass(firstclass)
  })
}


// Remove a class from a list and apply it on new elements
// Example:
//   <p>Foo</p>
//   <p class="current">Bar</p>
//   <script>
//     $('p').replaceClass('current', ':first') // will give .current to "Foo"
//   </script>
$.fn.replaceClass = function(className, newElement) {
  $(this).filter('.'+className).removeClass(className)
    .end().filter(newElement).addClass(className)
}

// Adds nth-child-1, nth-child-2, etc. classes to the elements
// to mimic the :nth-child(1), :nth-child(2), etc. selector.
$.fn.addNthChildClass = function() {
  return $(this).each(function(i, item) {
    $(item).addClass('nth-child-'+(i+1))
  })
}


// Fade out and show another element during `durationInSeconds` seconds
// $(jQuery).replaceWithFadeWithDuration('#elem', 10)
$.fn.replaceWithFadeWithDuration = function(replace, durationInSeconds) {
  return $(this).map(function(i, elem) {
    $(elem).fadeOut('fast', function() {
      $(replace).fadeIn('slow', function() {
        setTimeout(function() {
          $(replace).fadeOut('fast', function() {
            $(elem).fadeIn('slow');
          });
        }, durationInSeconds * 1000);
      });
    });
  });
  return true;
}



// Scroll to the bottom of an element
// $(jQuery).scrollBottom()
$.fn.scrollBottom = function() {
  return $(this).each(function() {
    $(this).scrollTop(9999); // $(this).find(':last').offset().top
  })
}


// Equalize the heights of elements
// (via http://www.cssnewbie.com/equalheights-jquery-plugin/)
// Usage: $(elems).equalHeights([minHeight][, maxHeight])
// Example: $('.foo').equalHeights()
$.fn.equalHeights = function(minHeight, maxHeight) {
  var tallest = minHeight ? minHeight : 0;
  this.each(function() {
    var height = $(this).height() + $(this).extraHeight();
    if (height > tallest)
      tallest = height;
  });
  if ((maxHeight) && tallest > maxHeight) tallest = maxHeight;
  return this.each(function() {
    $(this).height(tallest - $(this).extraHeight());
  });
}

// Returns the extra height provided by borders and paddings
// Example: $('.foo').css({border:'1px solid'}).extraHeight(); # => 2
$.fn.extraHeight = function() {
  var height = 0,
      properties = ['border-top-width', 'border-bottom-width', 'padding-top', 'padding-bottom'],
      $this = $(this);
  $(properties).each(function(i, prop) {
    var size = parseInt($this.css(prop), 10);
    if (!isNaN(size))
      height += size;
  });
  return height;
}


// Add a class whenever ajax is loading
// Example: $('body').ajaxLoadingClass('loading')
$.fn.ajaxLoadingClass = function(classname) {
  var that = $(this);
  $(window).ajaxStart(function() { that.addClass(classname) });
  $(window).ajaxStop(function() { that.removeClass(classname) });
  return that;
}

// Send ajax requests to the same same url, method and data as a form
// Example:
//   $('form').submit(function() {
//     $(this).ajax({ success: function() { alert('yeehah' )} })
//   })
$.fn.ajax = function(options) {
  return $(this).each(function() {
    var defaultOptions = {
      type: $(this).attr('method'),
      url: $(this).attr('action'),
      data: $(this).serialize(),
    }
    return $.ajax($.extend(defaultOptions, options))
  })
}

// CSS expression :file()
// Queries files by type (image, music, archive, video, email) or extension in links and images.
// Examples:
//   $('a:file(music)')  # => all links to zip or rar files
//   $(':file(jpg)')     # => all links and images in ".jpg"
$.extend($.expr[':'], {
  file: function(a,i,m) {
    var types = {
          image: /\.(png|gif|jpe?g|bmp|tiff|psd|psp|svg|xcf|ico)$/,
          music: /\.(mp3|ogg|flac|wav|aif|aiff|aifc|cda|m3u|mid|mod|mp2|snd|voc|wma)$/,
          archive: /\.(zip|rar|tar|tar\.gz)$/,
          video: /\.(avi|wmv|qt|mkv|flv|mpg|ram)$/,
          email: /^(mailto:)/
        },
        type = m[3],
        match = types[type] || new RegExp('\\.'+type+'$'),
        target = a.src ? a.src : a.href;
    return target.match(match);
  }
});

// CSS expression :external
// Example:
//   $('a:external') # => all rel="external" links
$.extend($.expr[':'],{
  external: function(a) {
    return a.href && $(a).attr("rel") == 'external' && a.href.indexOf('javascript') != 0;
  }
});

