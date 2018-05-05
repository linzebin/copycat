import JQuery from "./core";

////////////////////////    jQuery静态方法    ////////////////////////
function JQueryStatic(selector: string): JQuery {
  return new JQuery(selector);
}

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
   * @param {String} url 一个用来包含发送请求的URL字符串
   * @param {JQuery.AjaxSettings} settings 一个以"{键:值}"组成的AJAX 请求设置。所有选项都是可选的。可以使用$.ajaxSetup()设置任何默认参数。
   */
  export function ajax(url: string, settings?: JQuery.AjaxSettings);

  /**
   * 执行一个异步的HTTP（Ajax）的请求
   *
   * @export
   * @param {JQuery.AjaxSettings} settings
   */
  export function ajax(settings: JQuery.AjaxSettings);
  export function ajax(...args) {
    const defaultSettings: JQuery.AjaxSettings = {
      type: "GET",
      async: true,
      success() {},
      error() {},
      complete() {}
    };
    const targetSettings: JQuery.AjaxSettings = {};
    if (Array.isArray(args)) {
      Object.assign(targetSettings, defaultSettings, args[1], {
        url: args[0]
      });
    } else if (typeof args == "object") {
      Object.assign(targetSettings, defaultSettings, args);
    }

    const xhr = new XMLHttpRequest();
    xhr.open(targetSettings.type!, targetSettings.url!, targetSettings.async);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          targetSettings.success!(xhr.responseText);
        } else {
          targetSettings.error(xhr);
        }
        targetSettings.complete(xhr);
      }
    };

  }

  /**
   * 创建一个数组或对象序列化的的字符串，适用于一个URL 地址查询字符串或Ajax请求。
   *
   * @export
   * @param {Object} [obj={}]
   * @param {boolean} traditional
   * @returns {string}
   */
  export function param(obj: Object = {}, traditional: boolean): string {
    const buffer = new Array<string>();
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }
      const value = obj[key];
      buffer.push(encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value));
    }
    const source = buffer.join("&").replace(/%20/g, "+");
    return source;
  }

  export const fn = {
    /**
     * 一个对象的内容合并到jQuery的原型，以提供新的jQuery实例方法。
     */
    extend: function(obj: Object) {
      Object.keys(obj).forEach(key => {
        JQuery.prototype[key] = obj[key];
      });
    }
  };

  /**
   * 将两个或更多对象的内容合并到第一个对象。
   *
   * @export
   * @param {any} target
   * @param {any} objects
   * @returns
   */
  export function extend(target, ...objects) {
    return Object.assign(target, ...objects);
  }
}

window["jQuery"] = JQueryStatic;
window["$"] = JQueryStatic;

export default JQueryStatic;
