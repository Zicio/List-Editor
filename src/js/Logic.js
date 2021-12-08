export default class Logic {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    } else {
      this.element = element;
    }
  }

  static renderPopUp(e) {
    if (e.target.classList.contains('list__add-submit')) {
      const popUp = '<div class=popup><form action="" class="form"><div class="form__group"><input type="text" class="form__name" id="name" required=""></div><div class="form__group"><input type="number" class="form__price" id="price" required=""></div></form><button type="submit" class="form__save">Сохранить</button><button type="reset" class="form__reset">Отмена</button></div>';
      e.target.closest('.list').insertAdjacentHTML('beforeend', popUp);
    }
  }
}
