class DomHelper {
  static hasClass(elem: Element, name: string) {
    return (" " + elem.className + " ").indexOf(" " + name + " ") >= 0;
  }
  static addClass(elem: Element, name: string) {
    if (!this.hasClass(elem, name)) {
      elem.className += (elem.className ? " " : "") + name;
    }
  }
  static removeClass(elem: Element, name: string) {
    let set = " " + elem.className + " ";
    while (set.indexOf(" " + name + " ") >= 0) {
      set = set.replace(" " + name + " ", "");
    }
    elem.className = typeof set.trim === "function" ? set.trim() : set.replace(/^\s+|\s+$/g, "");
  }
}

export { DomHelper };
