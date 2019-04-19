import { FormGroup, FormControl } from '@angular/forms';

export function genericFormControl(
  instance: any,
  blockedAttributes?: string[],
  initialValue?: {},
  exceptions?: {}
): FormGroup {
  const keys = Object.keys(instance);
  const attributes = keys.filter(key => !blockedAttributes.includes(key));

  const controls = {};
  attributes.forEach(attribute => {
    const value =
      (exceptions && exceptions[attribute]) ||
      (initialValue && initialValue[attribute]) ||
      instance[attribute];
    console.log(value);
    controls[attribute] = new FormControl(value);
  });

  return new FormGroup({
    ...controls
  });
}
