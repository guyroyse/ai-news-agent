// TODO: stub, add routes as needed

export enum Route {
  Home = 'home'
}

export default class AppRouter {
  static #instance: AppRouter
  #currentRoute = $state<Route>(Route.Home)

  private constructor() {}

  static get instance() {
    return this.#instance ?? (this.#instance = new AppRouter())
  }

  get currentRoute(): Route {
    return this.#currentRoute
  }

  routeToHome() {
    this.#currentRoute = Route.Home
  }
}
