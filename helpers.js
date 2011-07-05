// Shortest way to test for IE
IE='\v'=='v'

// Silently die if no Firebug
if (!console) var console = { log: function(){} }

// Moves the first element in an array to the end
// Example: [1, 2, 3, 4].enqueue() # => [2, 3, 4, 1]
Array.prototype.enqueue = function() {
  this.push(this.splice(0, 1)[0]);
  return this;
}

// Call a callback whenever a page's #hash changes
// Example: onHashChange(function() { $(location.hash).show() })
function onHashChange(callback, interval) {
  var currentHash = window.location.hash;
  if (!interval) interval = 200;
  return setInterval(function() {
    if (window.location.hash != currentHash) {
      callback.call();
      currentHash = window.location.hash;
    }
  }, 200);
}
