const uploadForm = document.querySelector('.img-upload__form');
const tagInput = document.querySelector('.text__hashtags');

const commentInput = document.querySelector('.text__description');

const tagSymbols = /#[^0-9A-Za-z]+/g;
const sharpStart = /^#/;
const middleSharp = /.#./;
const TAG_MIN_LENGTH = 2;
const TAG_MAX_LENGTH = 20;
const MAX_NUM_OF_TAGS = 5;

const COMMENT_MAX = 140;

const checkForDoubles = function (array, arrayItem, regularIndex, doubleIndex) {
  const doubleTagItem = array[doubleIndex].toString().toLowerCase()
  return arrayItem === doubleTagItem  && doubleIndex != regularIndex;
}

const tagsValidity = function () {
  let tagsArr = tagInput.value.split(' ')

  for (let i = 0; i < tagsArr.length; i++) {
    const tagItem = tagsArr[i].toString().toLowerCase();
    
    const isSharpStart = tagItem.search(sharpStart);
    if (isSharpStart < 0) {
      tagInput.setCustomValidity('Хэш-тег должен начинаться с символа #');

      return
    }

    const symbolsTest = tagItem.search(tagSymbols);
    if (symbolsTest >= 0) {
      tagInput.setCustomValidity('В хэш-тегах возможно только использование букв и цифр');

      return
    }

    const isMiddleSharp = tagItem.search(middleSharp);
    if (isMiddleSharp >= 0) {
      tagInput.setCustomValidity('Хэш-теги должны быть разделены пробелами');

      return
    }

    if (tagItem.length < TAG_MIN_LENGTH) {
      tagInput.setCustomValidity('Хэш-тег не может состоять из одного симовола');
      
      return
    } else if (tagItem.length > TAG_MAX_LENGTH) {
      tagInput.setCustomValidity(`Максимальная длина - 20 символов. Удалите ${tagItem.length - TAG_MAX_LENGTH} симв.`)
      
      return
    } else if (tagsArr.length > MAX_NUM_OF_TAGS) {
      tagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов')
      
      return
    }

    for (let j = 0; j < tagsArr.length; j++) {
      if (checkForDoubles(tagsArr, tagItem, i, j)) {
        tagInput.setCustomValidity('Хэш-теги не должны повторяться')

        return
      }
    }
    tagInput.setCustomValidity('');
  }  
}

tagInput.addEventListener('input', tagsValidity);


const commentValidity = function () {
  if (commentInput.value.length > COMMENT_MAX) {
    commentInput.setCustomValidity(`Комментарий не больше 140 символов. Удалите ${commentInput.value.length - COMMENT_MAX} симв.`)

    return
  } else {
    commentInput.setCustomValidity('');
  }
}

commentInput.addEventListener('input', commentValidity);

uploadForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
})