import JQuery from "./core";

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

  /**
   * 创建一个数组或对象序列化的的字符串，适用于一个URL 地址查询字符串或Ajax请求。
   *
   * @export
   * @param {any} [obj={}]
   * @param {boolean} traditional
   */
  export function param(obj = {}, traditional: boolean) {}

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
