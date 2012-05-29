Dialogables [WIP]
=================

This provides super-duper easy ajaxy dialog behaviour to your apps.

Why did I do this, you ask?  Well, all "dialogs" / "modals" are annoying and based
off an already existing DOM element. This is all good and dandy for simple stuff,
but when your app is ready to be uber cool, you may want to utilize dialogs given a
link or a button (or whatever your heart desires).  Maybe you want to have many dialogs
on a page or a dialog that will pop-up another dialog.... Well, this plugin makes your
life easier.  You're welcome :)


Features
--------

* Loads remote dialogs.
* Inspired by Twitter Bootstrap modals.
* No need to create empty dialog divs and bloat your markup... this does the work for you. =)
* Supports multiple dialogs.
* ... extremely simple.

The Magic
---------

```html
<!-- using data-api (preferred way!) -->
<a data-toggle="dialog" href="/example/remote.html">Dialog Link</a>
```

or

```html
<!-- initializing by selector -->
<a class="dialogable" href="/example/remote.html">Dialog Button</a>
<script>
    $(function() {
        $('a.dialogable').dialogable();
    });
</script>
```

Some Events
-----------

```javascript
// show event - before loading remote content
$(document).on('show', 'a.dialogable, [data-toggle="dialog"]', function(e) {
    // ... stuffs go here!
});

// shown event - after dialog has been loaded
$(document).on('shown', 'a.dialogable, [data-toggle="dialog"]', function(e) {
    // ... stuffs go here!
});

// destroy event - before dialog is actually destroyed
$(document).on('destroy', 'a.dialogable, [data-toggle="dialog"]', function(e) {
    // ... stuffs go here!
});

// destroyed event - after dialog has been destroyed
$(document).on('destroyed', 'a.dialogable, [data-toggle="dialog"]', function(e) {
    // ... stuffs go here!
});
```

Extra Stuffs
------------

Options:
```javascript
$('a.dialogable').dialogable({
    prototype: $('<div />', { class: 'dialog' }).hide(), // pass in a different prototype if you want =)!
});
```

Examples
--------

See `example/index.html` for more magical stuffs.