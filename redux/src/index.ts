interface ReduxAction {
  type: string;
  payload?: any;
}
type ReduxReducer = (prevState: any, action: ReduxAction) => any;
type ReduxListener = () => any;

class ReduxStore {
  currentState;
  currentReducer: ReduxReducer;
  currentListeners = new Array<ReduxListener>();

  constructor(reducer: ReduxReducer) {
    if (typeof reducer !== "function") {
      throw new TypeError("Expected the reducer to be a function.");
    }
    this.currentReducer = reducer;
  }
  // 注册监听事件
  subscribe(listener: ReduxListener) {
    if (typeof listener !== "function") {
      throw new TypeError("Expected the listener to be a function.");
    }
    this.currentListeners.push(listener);
  }
  // 分发action
  dispatch(action: ReduxAction) {
    this.currentState = this.currentReducer(this.currentState, action);
    this.currentListeners.map(listener => {
      listener();
    });
  }
  // 获取state
  getState() {
    return this.currentState;
  }
}

function createStore(reducer: ReduxReducer) {
  // 注册订阅者
  const store = new ReduxStore(reducer);
  // initial state tree
  store.dispatch({ type: "@@redux/INIT" });
  return store;
}

window.Redux = { createStore };
