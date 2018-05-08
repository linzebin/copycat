class Callbacks {
  static _cbs = new Array<Function>();
  static _disabled = false;
  static _fired = false;

  static add(cb: Function) {
    this._cbs.push(cb);
  }

  static disable() {
    this._disabled = true;
  }

  static disabled() {
    return this._disabled;
  }

  static empty() {
    this._cbs.splice(0, this._cbs.length);
  }

  static fire(...args) {
    if (!this._disabled) {
      this._fired = true;
      this._cbs.forEach(fn => {
        fn(...args);
      });
    }
    return this;
  }

  static fireWith(context, ...args) {
    if (!this._disabled) {
      this._fired = true;
      this._cbs.forEach(fn => {
        fn.apply(context, ...args);
      });
    }
    return this;
  }

  static fired() {
    return this._fired;
  }

  static has(cb) {
    return this._cbs.some(c => c === cb);
  }

  static lock() {}

  static locked() {}

  static remove(cb) {
    this._cbs.splice(this._cbs.findIndex(c => c === cb), 1);
    return this;
  }
}

export default Callbacks;
