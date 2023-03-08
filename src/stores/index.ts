import appStore from './app'
import permisstionStore from './permisstion'
import userStore from './user'

export default function useStore() {
  return {
    userStore: userStore(),
    permisstionStore: permisstionStore(),
    appStore: appStore(),
  }
}
