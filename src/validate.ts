export default (element: HTMLInputElement, type: 'H' | 'M' | 'S' | 'BPM' | 'Beat') => {
  element.addEventListener('blur', function () {
    let value = this.value;
    if (!this.value) {
      value = this.defaultValue;
    } else if (['H', 'M', 'Beat'].includes(type)) {
      value = String(parseInt(this.value));
    }
    this.value = value;
    const min = this.getAttribute('min');
    const max = this.getAttribute('max');
    if (min && parseInt(value) < parseInt(min)) {
      this.value = min;
    }
    if (type === 'M' && max && parseInt(value) > parseInt(max)) {
      this.value = max;
    }
  });
};
