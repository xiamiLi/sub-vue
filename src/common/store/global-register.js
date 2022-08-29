
/**
 *
 * @param {vuex实例} store
 * @param {qiankun下发的props} props
 */
// eslint-disable-next-line space-before-function-paren
function registerGlobalModule(store, props = {}) {
  if (!store || !store.hasModule) {
    return
  }

  // 获取初始化的state
  // eslint-disable-next-line no-mixed-operators
  // const initState = props.getGlobalState && props.getGlobalState() || {
  //   menu: [],
  //   user: {},
  //   userDetail: {}
  // }
  // eslint-disable-next-line no-mixed-operators
  const initState = {
    menu: [],
    user: {},
    userDetail: {}
  }
  if (props.userDetail) {
    initState.userDetail = { ...props.userDetail.value }
  }
  // 将父应用的数据存储到子应用中，命名空间固定为global
  if (!store.hasModule('global')) {
    const globalModule = {
      namespaced: true,
      state: initState,
      actions: {
        // 子应用改变state并通知父应用
        // eslint-disable-next-line space-before-function-paren
        setGlobalState({ commit }, payload) {
          commit('setGlobalState', payload)
          commit('emitGlobalState', payload)
        },
        // 初始化，只用于mount时同步父应用的数据
        // eslint-disable-next-line space-before-function-paren
        initGlobalState({ commit }, payload) {
          commit('setGlobalState', payload)
        }
      },
      mutations: {
        // eslint-disable-next-line space-before-function-paren
        setGlobalState(state, payload) {
          // eslint-disable-next-line
          state = Object.assign(state, payload);
        },
        // 通知父应用
        // eslint-disable-next-line space-before-function-paren
        emitGlobalState(state) {
          if (props.setGlobalState) {
            props.setGlobalState(state)
          }
        }
      }
    }
    store.registerModule('global', globalModule)
  } else {
    // 每次mount时，都同步一次父应用数据
    store.dispatch('global/initGlobalState', initState)
  }
};

export default registerGlobalModule
