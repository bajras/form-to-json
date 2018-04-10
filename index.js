// Class that extract all the form element's values into JSON and can be used before AJAX.
export default class FormToJSON {
  constructor(form) {
    this.form = form;
  }

  static isValidElement(element) {
    return element.name && element.value;
  }

  static isValidValue(element) {
    return (!["checkbox", "radio"].includes(element.type) || element.checked);
  }

  static isCheckbox(element) {
    return element.type === "checkbox";
  }

  static isMultiSelect(element) {
    return element.options && element.multiple;
  }

  static getSelectValues(options) {
    [].reduce.call(options, (values, option) => { // eslint-disable-line
      return option.selected ?
        values.concat(option.value) :
        values;
    }, []);
  }

  extractFormToJSON() {
    return [].reduce.call(this.form.elements, (data, element) => { // eslint-disable-line
      if (FormToJSON.isValidElement(element) && FormToJSON.isValidValue(element)) {
        if (FormToJSON.isCheckbox(element)) {
          data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (FormToJSON.isMultiSelect(element)) {
          data[element.name] = this.getSelectValues(element);
        } else {
          data[element.name] = element.value;
        }
      }

      return data;
    }, {});
  }
}
