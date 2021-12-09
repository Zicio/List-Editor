import DOM from './DOM';

export default class Logic {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
      this.listenerOfAdd();
    }
  }

  // start() {
  //   try {
  //     const productData = JSON.parse(localStorage.getItem('productData'));
  //     if (productData !== null)

  //     }
  //     catch(e){
  //       console.error(e);
  //     }
  // }

  listenerOfAdd() {
    this.element.addEventListener('click', (e) => DOM.renderPopUp(e));
  }
}
