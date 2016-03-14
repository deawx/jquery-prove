

```javascript
//composable validator plugin - required email
$.fn.requiredEmail = function(options){
	var input = $(this);
	var check1 = input.proveRequired(options1);
	var check2 = input.provePattern(options2);
	return (check1 && check2);
};
```

Validator Anatomy
- jQuery plugin
- Single input options parameter which is the field validator config object.
- The `this` context is the DOM input to validate.
- Returns
	- `true` on validation success
	- `false` on validation was not successful
	- `undefined` on validation was not performed
- Accepts a boolean debug option
- Must return undefined on blank or empty input.