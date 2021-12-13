import DOM from './DOM';

export default class Logic {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
      Logic.startRender();
      this.listenerOfAdd();
      this.listenerOfSave();
      this.listenerOfReset();
      this.listenerOfСhange();
      this.listenerOfDelete();
    }
  }

  static startRender() {
    if (localStorage) {
      DOM.renderProducts();
    }
  }

  listenerOfAdd() {
    this.element.addEventListener('click', (e) => DOM.add(e));
  }

  listenerOfSave() {
    this.element.addEventListener('click', (e) => DOM.saveProduct(e, this.index));
    this.index = null;
  }

  listenerOfReset() {
    this.element.addEventListener('click', (e) => DOM.resetForm(e));
  }

  listenerOfСhange() {
    this.element.addEventListener('click', (e) => Logic.changeProduct(e));
  }

  listenerOfDelete() {
    this.element.addEventListener('click', (e) => DOM.deleteProduct(e));
  }

  static changeProduct(e) {
    if (e.target.classList.contains('change-button')) {
      DOM.renderPopUp();
      DOM.completeForm(e);
    }
  }
}
