# A note on mixins

A mixin is a collection of functions to be applied to a class.
Each mixin function should have the same argument signature as the
corresponding function to be overridden, with one exception.
The first argument to a mixin function will be the overridden function
if it exists and null otherwise. It's up to the mixin function when to
run the overridden function, if at all.
