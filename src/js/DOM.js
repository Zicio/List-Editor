export default class DOM {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
    }
  }

  // startRender(productData) {
  //   for (const el of productData) {
  //     e
  //   }
  // }

  static renderPopUp(e) {
    if (e.target.classList.contains('list__add-submit')) {
      const popUp = '<div class=popup><form action="" class="form"><div class="form__group"><label class="form__label" for="=name">Название</label><input type="text" class="form__name input" id="name" required=""></div><div class="form__group"><label class="form__label" for="price">Стоимость</label><input type="number" class="form__price input" id="price" min="1"required=""></div></form><div class="form__button-container"><button type="submit" class="form__save form__button">Сохранить</button><button type="reset" class="form__reset form__button">Отмена</button></div></div>';
      e.target.closest('.list').insertAdjacentHTML('beforeend', popUp);
    }
    if (e.target.classList.contains('form__save')) {
      const form = e.target.closest('.popup').querySelector('.form');
      const newProductData = [...form.elements].map(({ id, value }) => ({ id, value }));
      const popUp = e.target.closest('.popup');
      const newRowTable = document.querySelector('.list__table > tbody');
      const newProductName = newProductData[0].value;
      const NewProductPrice = newProductData[1].value;
      const newProduct = `<tr class="list__product"><th class="product__name">${newProductName}</th><th class="product__price">${NewProductPrice}</th><th><button type="button" class="change-button">&#9998</button><button type="button" class="delete-button">&#10006</button></th></tr>`;
      newRowTable.insertAdjacentHTML('beforeend', newProduct);
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
}
