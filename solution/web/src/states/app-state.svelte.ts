export default class AppState {
  static #instance: AppState

  #isBusy = $state<boolean>(false)

  private constructor() {}

  static get instance() {
    return this.#instance ?? (this.#instance = new AppState())
  }

  get displayOverlay(): boolean {
    return this.#isBusy
  }

  showOverlay(): void {
    this.#isBusy = true
  }

  hideOverlay(): void {
    this.#isBusy = false
  }
}

