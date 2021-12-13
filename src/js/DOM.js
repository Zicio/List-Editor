export default class DOM {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
    }
  }

  static add(e) {
    e.preventDefault();
    if (e.target.classList.contains('list__add-submit')) {
      DOM.renderPopUp();
    }
  }

  static saveProduct(e, index) {
    if (e.target.classList.contains('form__save')) {
      e.preventDefault();
      const form = e.target.closest('.popup').querySelector('.form');
      const newProductData = [...form.elements].map(({ id, value }) => ({ id, value }));
      const popUp = e.target.closest('.popup');
      popUp.remove();
      DOM.saveData(newProductData);
      DOM.renderProducts();
    }
  }

  static saveData(data) {
    localStorage.setItem(`${data[0].value}`, JSON.stringify(data));
  }

  static resetForm(e) {
    e.preventDefault();
    const popUp = document.querySelector('.popup');
    if (e.target.classList.contains('form__reset')) {
      popUp.remove();
    }
  }

  static completeForm(e) {
    const inputsOfForm = document.querySelector('.form').elements;
    const productName = e.target.closest('.list__product').querySelector('.product__name').textContent;
    const product = JSON.parse(localStorage.getItem(productName));
    for (let i = 0; i < inputsOfForm.length; i++) {
      inputsOfForm[i].value = product[i].value;
    }
  }

  static deleteProduct(e) {
    if (e.target.classList.contains('delete-button')) {
      const productName = e.target.closest('.list__product').querySelector('.product__name').textContent;
      e.target.closest('.list__product').remove();
      localStorage.removeItem(productName);
    }
  }

  static renderPopUp() {
    const popUpEl = '<div class=popup><form action="" class="form" id="form"><div class="form__group"><label class="form__label" for="=name">Название</label><input type="text" class="form__name input" id="name" required=""></div><div class="form__group"><label class="form__label" for="price">Стоимость</label><input type="number" class="form__price input" id="price" min="1"required=""></div></form><div class="form__button-container"><button type="submit" class="form__save form__button">Сохранить</button><button type="reset" class="form__reset form__button">Отмена</button></div></div>';
    document.querySelector('.list').insertAdjacentHTML('beforeend', popUpEl);
  }

  static renderProduct(productData) {
    const newRowTable = document.querySelector('.list__table > tbody');
    const ProductName = productData[0].value;
    const ProductPrice = productData[1].value;
    const newProduct = `<tr class="list__product"><th class="product__name">${ProductName}</th><th class="product__price">${ProductPrice}</th><th><button type="button" class="change-button">&#9998</button><button type="button" class="delete-button">&#10006</button></th></tr>`;
    newRowTable.insertAdjacentHTML('beforeend', newProduct);
  }

  static renderProducts() {
    const products = document.getElementsByClassName('list__product');
    for (const product of [...products]) {
      product.remove();
    }
    const keys = Object.keys(localStorage);
    const newRowTable = document.querySelector('.list__table > tbody');
    for (const key of keys) {
      const ProductName = JSON.parse(localStorage.getItem(key))[0].value;
      const ProductPrice = JSON.parse(localStorage.getItem(key))[1].value;
      const newProduct = `<tr class="list__product"><th class="product__name">${ProductName}</th><th class="product__price">${ProductPrice}</th><th><button type="button" class="change-button">&#9998</button><button type="button" class="delete-button">&#10006</button></th></tr>`;
      newRowTable.insertAdjacentHTML('beforeend', newProduct);
    }
  }
}
