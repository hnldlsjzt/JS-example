/**
 * @param {function} handle 最终需要执行的事件处理函数
 * @param {number} wait 事件出发后多久开始执行
 * @param {boolean} immediate 控制执行第一次还是最后一次
 * @return {function}
 */
 function debounce(handle, wait, immediate) {
    // 首先对参数类型做一下判断
    if (typeof handle !== "function") {
      throw new Error("handle must be an function");
    }
    if (typeof wait === "undefined") {
      wait = 300;
    }
    // 允许第二个参数传入的是布尔类型，即 immediate
    if (typeof wait === "boolean") {
      immediate = wait;
      wait = 300;
    }
    if (typeof immediate !== "boolean") {
      immediate = false;
    }
    let timer = null;
    return function proxy(...args) {
      if (immediate && !timer) {
        handle.call(this, ...args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (!immediate) {
          handle.call(this, ...args);
        }
      }, wait);
    };
  }