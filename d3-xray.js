(function() {
  // used to make sure the line break
  // only fires once per mouseover
  var trigger;
  // if d3 isn't available, bail
  if (!d3) {
    return;
  }
  // listen to every element (!)
  // probably not performant, but who caressss
  d3.selectAll('*')
    .on('mouseenter', function() {
      var node,
          data,
          attributes,
          tag,
          selectors,
          identifier;
      node = this;
      trigger = true;
      data = d3.select(this).datum();
      // if there's no bound data, exit
      if (typeof data === 'undefined') {
        return;
      }
      // compile a node identifier by looking
      // for these attributes and then prefixing
      // with the associated string
      attributes = {
        'id': '#',
        'class': '.'
      };
      // type of node
      tag = node.tagName;
      // CSS selectors
      selectors = Object.keys(attributes)
        .map(function(attribute) {
          var value,
              prefix;
          prefix = attributes[attribute];
          value = d3.select(node).attr(attribute);
          if (value) {
            return prefix + value.replace(/ /g, prefix);
          } else {
            return '';
          }
        }).join('');
      // identifier string
      identifier = tag + selectors;
      // log results to console
      if (console && typeof console.log === 'function') {
        console.log(identifier, data);
      }
    })
    .on('mouseleave', function() {
      // log a line break in between mouse actions
      if (trigger) {
        if (console && typeof console.log === 'function') {
          console.log('');
        }
        trigger = false;
      }
    });
}).call(this);
