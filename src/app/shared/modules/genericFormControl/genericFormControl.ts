import { FormGroup, FormControl } from "@angular/forms";

export function genericFormControl(instance: any, blockedAttributes?: string[]): FormGroup {
  const keys = Object.keys(instance);
  const attributes = keys.filter(key => !(blockedAttributes.includes(key)));
  console.log(attributes);

  const controls = {};
  attributes.forEach(attribute => {
    controls[attribute] = new FormControl(instance[attribute]);
  });

  return new FormGroup({
    ...controls
  });
}
