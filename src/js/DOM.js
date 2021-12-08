import Logic from './Logic';

export default class Dom {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
      this.listenerOfAdd();
    }
  }

  listenerOfAdd() {
    this.element.addEventListener('click', (e) => Logic.renderPopUp(e));
  }
}
