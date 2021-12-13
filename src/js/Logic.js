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
    }
  }

  static startRender() {
    if (localStorage.productData) {
      DOM.renderNewProduct(JSON.parse(localStorage.productData));
    }
  }

  listenerOfAdd() {
    this.element.addEventListener('click', (e) => DOM.renderPopUp(e));
  }

  listenerOfSave() {
    this.element.addEventListener('click', (e) => DOM.saveProduct(e));
  }

  listenerOfReset() {
    this.element.addEventListener('click', (e) => DOM.resetForm(e));
  }
}
