export default class DOM {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
    }
  }

  static renderPopUp(e) {
    e.preventDefault();
    if (e.target.classList.contains('list__add-submit')) {
      const popUp = '<div class=popup><form action="" class="form" id="form"><div class="form__group"><label class="form__label" for="=name">Название</label><input type="text" class="form__name input" id="name" required=""></div><div class="form__group"><label class="form__label" for="price">Стоимость</label><input type="number" class="form__price input" id="price" min="1"required=""></div></form><div class="form__button-container"><button type="submit" class="form__save form__button">Сохранить</button><button type="reset" class="form__reset form__button">Отмена</button></div></div>';
      e.target.closest('.list').insertAdjacentHTML('beforeend', popUp);
    }
  }

  static saveProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('form__save')) {
      const form = e.target.closest('.popup').querySelector('.form');
      const newProductData = [[...form.elements].map(({ id, value }) => ({ id, value }))];
      const popUp = e.target.closest('.popup');
      DOM.renderNewProduct(newProductData);
      popUp.remove();
      if (!localStorage.productData) {
        localStorage.setItem('productData', JSON.stringify(newProductData));
        return;
      }
      const productData = JSON.parse(localStorage.productData);
      for (const product of newProductData) {
        productData.push(product);
      }
      localStorage.setItem('productData', JSON.stringify(productData));
    }
  }

  static resetForm(e) {
    e.preventDefault();
    const popUp = document.querySelector('.popup');
    if (e.target.classList.contains('form__reset')) {
      popUp.remove();
    }
  }

  static renderNewProduct(productData) {
    const newRowTable = document.querySelector('.list__table > tbody');
    for (const el of productData) {
      const ProductName = el[0].value;
      const ProductPrice = el[1].value;
      const newProduct = `<tr class="list__product"><th class="product__name">${ProductName}</th><th class="product__price">${ProductPrice}</th><th><button type="button" class="change-button">&#9998</button><button type="button" class="delete-button">&#10006</button></th></tr>`;
      newRowTable.insertAdjacentHTML('beforeend', newProduct);
    }
  }
}
