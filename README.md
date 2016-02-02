# jquery.focusMode
jQuery plugin for focus on targets that are in the viewport, basically it adds a class to elements in viewport. I created it for a project in which I need to set a focus target and manage it with classes

```
$(someselector).focusMode(options)
```

- target: element(s) to target and add the effect (classes)
- classes:
 - body: 'is-focus-active'
 - container: 'focus-container'
 - element: 'focus-target'
- offsetIn: '0%' offset from the bottom to activate the class
- offsetOut: '0%' offset from the top to activate the class
