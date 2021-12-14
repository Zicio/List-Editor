export default class DOM {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
    }
  }

  static saveProduct(e) {
    const popUp = e.target.closest('.popup');
    popUp.remove();
    DOM.renderProducts();
  }

  static resetForm(e) {
    const popUp = document.querySelector('.popup');
    if (e.target.classList.contains('form__reset')) {
      e.preventDefault();
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
    const popUpEl = '<div class=popup><form action="" class="form" id="form"><div class="form__group"><label class="form__label" for="=name">Название</label><input type="text" class="form__name input" id="name" data-validity-message="Поле пустое" minLength="1"></div><div class="form__group"><label class="form__label" for="price">Стоимость</label><input type="number" class="form__price input" id="price" data-validity-message="Поле пустое" minLength="1" min="1"></div></form><div class="form__button-container"><button type="submit" class="form__save form__button">Сохранить</button><button type="reset" class="form__reset form__button">Отмена</button></div></div>';
    document.querySelector('.list').insertAdjacentHTML('beforeend', popUpEl);
  }

  static renderProduct(productData) {
    const newRowTable = document.querySelector('.list__table > tbody');
    const ProductName = productData[0].value;
    const ProductPrice = productData[1].value;
    const newProduct = `<tr class="list__product"><th class="product__name">${ProductName}</th><th class="product__price">${+ProductPrice}</th><th><button type="button" class="change-button">&#9998</button><button type="button" class="delete-button">&#10006</button></th></tr>`;
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
