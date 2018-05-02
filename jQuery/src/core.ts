import { DomHelper } from "./utils";

////////////////////////    jQuery实例方法    ////////////////////////
namespace JQuery {
  export interface AjaxSettings {}
}

/**
 * jQuery的实例
 *
 * @class JQuery
 */
class JQuery {
  public length = 0;
  constructor(public selector: string, public context?, root?) {
    // HANDLE: $(""), $(null), $(undefined), $(false)
    if (!selector) return this;

    const nodes = document.querySelectorAll(selector);
    nodes.forEach((e, i) => (this[i] = e));
    this.length = nodes.length;
  }

  /**
   * 为每个匹配的元素添加指定的样式类名
   *
   * @param {string} className
   * @returns
   * @memberof JQuery
   */
  addClass(className: string) {
    this.each((index, el) => {
      DomHelper.addClass(el, className);
    });
    return this;
  }

  /**
   * 获取匹配的元素集合中的第一个元素的属性的值。
   *
   * @param attributeName
   */
  attr(attributeName: string);
  /**
   * 设置每一个匹配元素的一个或多个属性。
   *
   * @param {string} attributeName
   * @param {*} [value]
   * @memberof JQuery
   */
  attr(attributeName: string, value?: any) {
    if (this.length === 0 || !attributeName) return;
    if (!value) {
      return (this[0] as Element).getAttribute(attributeName);
    } else {
      (this[0] as Element).setAttribute(attributeName, value);
      return this;
    }
  }

  /**
   * 为匹配的元素集合中的每个元素中移除一个属性
   *
   * @param {string} attributeName
   * @memberof JQuery
   */
  removeAttr(attributeName: string) {
    if (this.length === 0 || !attributeName) return;
    return this.each((index, el) => {
      el.removeAttribute(attributeName);
    });
  }

  /**
   * 移除集合中每个匹配元素上一个，多个或全部样式。
   *
   * @param {string} classname
   * @memberof JQuery
   */
  removeClass(classname: string) {
    return this.each((index, el) => {
      DomHelper.removeClass(el, classname);
    });
  }

  /**
   * 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类,取决于这个样式类是否存在或值切换属性。即：如果存在（不存在）就删除（添加）一个类。
   *
   * @param classname
   */
  toggleClass(classname: string) {
    return this.each((index, el) => {
      DomHelper.hasClass(el, classname) ? DomHelper.removeClass(el, classname) : DomHelper.addClass(el, classname);
    });
  }

  /**
   * 获取匹配的元素集合中第一个元素的当前值。
   *
   * @memberof JQuery
   */
  val();
  /**
   * 设置匹配的元素集合中每个元素的值。
   *
   * @param {any} [value]
   * @memberof JQuery
   */
  val(value?) {
    if (this.length === 0) return;
    if (!value) {
      return this[0].value;
    } else {
      (this[0] as Element).setAttribute("value", value);
      return this;
    }
  }

  /////////////////////////////////////////
  ///////////// css操作 ///////////////////
  /**
   * 获取匹配元素集合中的第一个元素的样式属性的值
   *
   * @param {string} propertyName
   * @memberof JQuery
   */
  css(propertyName: string);
  /**
   * 设置每个匹配元素的一个或多个CSS属性
   *
   * @param {string} propertyName
   * @param {any} [value]
   * @memberof JQuery
   */
  css(propertyName: string, value?) {
    if (this.length === 0 || !propertyName) return;
    if (!value) {
      return (this[0] as HTMLElement).style[propertyName];
    } else {
      return this.each((index, el) => {
        (el as HTMLElement).style[propertyName] = value;
      });
    }
  }

  get(num: number) {
    if (this.length === 0 || num < 0 || num >= this.length) return;
    return this[num];
  }

  fisrt() {
    return this[0];
  }

  last() {
    return this[this.length - 1];
  }

  /**
   * 历一个jQuery对象，为每个匹配元素执行一个函数
   *
   * @param {(index: number, element: HTMLElement) => void} callbackfn
   * @memberof JQuery
   */
  each(callbackfn: (index: number, element: HTMLElement) => void) {
    Object.keys(this)
      .filter(key => Number(key) % 1 === 0)
      .forEach((key, index) => {
        callbackfn(index, this[index]);
      });
    return this;
  }

  /////////////////////////////////////////
  ///////////// 数据操作 ///////////////////
  /**
   * 返回匹配的元素集合中的第一个元素的给定名称的数据存储的值。 通过.data(name, value)或HTML5 data-* 属性设置
   * 
   * @param {any} key 
   * @memberof JQuery
   */
  data(key);
  /**
   * 在匹配元素上存储任意相关数据.
   * 
   * @param {string} key 
   * @param {*} [value] 
   * @returns 
   * @memberof JQuery
   */
  data(key: string, value?: any) {
    if (this.length === 0) return;
    if (!value) {
      const el = this[0] as HTMLElement;
      return el.dataset ? el.dataset[key] : el.getAttribute(`data-${key}`);
    } else {
      return this.each((index, el) => {
        el.dataset ? (el.dataset[key] = value) : el.setAttribute(`data-${key}`, value);
      });
    }
  }

  /**
   * 在元素上移除绑定的数据
   * 
   * @param {string} key 
   * @returns 
   * @memberof JQuery
   */
  removeData(key: string) {
    return this.each((index, el) => {
      el.dataset ? (el.dataset[key] = "") : el.removeAttribute(key);
    });
  }

  /////////////////////////////////////////
  //////////////// 事件 ///////////////////
  on(event: string, callback: (e) => void) {}
}

export default JQuery;
