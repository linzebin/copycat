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

  forEach(callbackfn: (value: Element, index: number) => void) {}

  /**
   * 为每个匹配的元素添加指定的样式类名
   *
   * @param {string} className
   * @returns
   * @memberof JQuery
   */
  addClass(className: string) {
    Object.keys(this)
      .filter(key => Number(key) % 1 === 0)
      .forEach(key => {
        DomHelper.addClass(this[key], className);
      });
    return this;
  }
}

////////////////////////    jQuery静态方法    ////////////////////////
function JQueryStatic(selector: string): JQuery {
  return new JQuery(selector);
}

/**
 *
 */
namespace JQueryStatic {
  /**
   * 为以后要用到的Ajax请求设置默认的值
   *
   * @export
   * @param {JQuery.AjaxSettings} options
   * @returns {JQuery.AjaxSettings}
   */
  export function ajaxSetup(options: JQuery.AjaxSettings): JQuery.AjaxSettings {
    return {};
  }

  /**
   * 执行一个异步的HTTP（Ajax）的请求
   *
   * @export
   * @param {string} url 一个用来包含发送请求的URL字符串
   * @param {Object} settings 一个以"{键:值}"组成的AJAX 请求设置。所有选项都是可选的。可以使用$.ajaxSetup()设置任何默认参数。
   */
  export function ajax(url: string, settings: Object);

  /**
   * 执行一个异步的HTTP（Ajax）的请求
   *
   * @export
   * @param {Object} settings
   */
  export function ajax(settings: Object) {
    const defaultSettings = {};
    const targetSettings = {};
    if (Array.isArray(settings)) {
      Object.assign(targetSettings, defaultSettings, settings[1], {
        url: settings[0]
      });
    } else if (typeof settings == "object") {
      Object.assign(targetSettings, defaultSettings, settings);
    }
  }

  export function param(obj = {}, traditional: boolean) {}
}

window["jQuery"] = JQueryStatic;
window["$"] = JQueryStatic;

export default JQueryStatic;
