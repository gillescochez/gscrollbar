
# gscrollbar

jquery custom scrollbar plugin with touch device support, lightweight and easy to use.

# usage

## initialize

```javascript

// can also pass an options setting as argument
$('.scroll').gscrollbar();

```
## update

To do an update simply call the plugin again and an initialized element and pass the string  update as a first argument.
The second argument can be a number, an element or an anchor.

```javascript

$('#scroll1').gscrollbar('update', 100); // update with a given number

```

## options

```javascript

$.fn.gscrollbar.defaults = {
    axis: 'y', // vertical or horizontal scrollbar? ( x || y ).
    wheel: 40,  //how many pixels must the mouswheel scroll at a time.
    scroll: true, //enable or disable the mousewheel;
    size: 'auto', //set the size of the scrollbar to auto or a fixed number.
    sizethumb: 'auto' //set the size of the thumb to auto or a fixed number.
};

```

# credits

gscrollbar is based on tiny scrollbar and it released under the same license.

The differences between the 2 plugins  are the following:

* Different API
* gscrollbar inject the DOM it needs, tiny expects it (for every instance)
* gscrollbar is slightly bigger (2.69 against 2.29 minified)

So not much really, tiny scrollbar is really good I just didn't like having to set up the markup it expects in my documents for each element using it.

## Tiny Scrollbar Copyright Notice

```javascript

/*!
* Tiny Scrollbar 1.66
* http://www.baijs.nl/tinyscrollbar/
*
* Copyright 2010, Maarten Baijs
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/gpl-2.0.php
*
* Date: 13 / 11 / 2011
* Depends on library: jQuery
* 
*/

```
