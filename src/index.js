import { Checkbox, Input, Slider, InputNumber, Switch } from "antd";
import createComponent from "./components/BaseComponent";

import {
  RadioField as Radio,
  SelectField as Select
} from "./components/MultiSelect";
import mapError, { customMap } from "./components/mapError";
const CheckboxGroup = Checkbox.Group;

const defaultTo = (value, d) => {
  if (!value && value !== 0) return d;
  return value;
};

const eventMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.target.value)
}));

const checkboxGroupMap = customMap(({ input: { onChange, value = [] } }) => {
  value = defaultTo(value, []);
  return { onChange, value };
});

const sliderMap = customMap(
  ({ input: { onChange, value = 0 }, range, min = 0, max = 100 }) => {
    value = defaultTo(value, range ? [min, max] : 0);
    return { onAfterChange: onChange, value };
  }
);
const textFieldMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.nativeEvent.target.value)
}));

const selectFieldMap = customMap(
  ({ input: { onChange, value }, multiple, options }) => {
    if (options && options.lenght > 0) {
      value = value ? value : multiple ? [options[0].value] : options[0].value;
    }
    return { dropdownMatchSelectWidth: true, value, style: { minWidth: 200 } };
  }
);

export const CheckboxGroupField = createComponent(
  CheckboxGroup,
  checkboxGroupMap
);

export const SelectField = createComponent(Select, selectFieldMap);
export const CheckboxField = createComponent(Checkbox, eventMap);
export const RadioField = createComponent(Radio, eventMap);
export const TextField = createComponent(Input, textFieldMap);
export const SwitchField = createComponent(Switch, mapError);
export const NumberField = createComponent(InputNumber, mapError);
export const SliderField = createComponent(Slider, sliderMap);
export * from "./components/DatePicker";