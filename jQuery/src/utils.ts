class DomHelper {
  static hasClass(elem: HTMLElement, name: string) {
    return (" " + elem.className + " ").indexOf(" " + name + " ") >= 0;
  }
  static addClass(elem: HTMLElement, name: string) {
    if (!this.hasClass(elem, name)) {
      elem.className += (elem.className ? " " : "") + name;
    }
  }
  static removeClass(elem: HTMLElement, name: string) {
    let set = " " + elem.className + " ";
    while (set.indexOf(" " + name + " ") >= 0) {
      set = set.replace(" " + name + " ", "");
    }
    elem.className = typeof set.trim === "function" ? set.trim() : set.replace(/^\s+|\s+$/g, "");
  }
  static getClass(elem: HTMLElement): string {
    return (elem.getAttribute && elem.getAttribute("class")) || "";
  }
}

class Tools {
  cameraToUnderline(str: string) {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
}

export { DomHelper, Tools };
