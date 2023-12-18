import ApiService from '../api-service';
import { favoritesDB } from '../favoritesDB';
import { openModalExercise } from '../exercise-modal';

const exercisesList = document.querySelector('.js-cards');

async function removeHandler({ target }) {
  if (target.classList.contains('favorite-cards__icon-trash')) {
    removeElFromFavoritesOnTrashBtn(target);
    return;
  }

  const exerciseId = target.closest('li').dataset.id;
  if (!exerciseId) {
    return;
  }

  const apiService = new ApiService();

  try {
    apiService.id = exerciseId;
    const exercise = await apiService.fetchExerciseById();

    if (!exercise) {
      throw new Error('Exercise not found!');
    }

    openModalExercise(exercise);
  } catch (error) {
    console.error(error);
  }
}

async function removeElFromFavoritesOnTrashBtn(el) {
  const exerciseEl = el.closest('li');
  const exerciseID = exerciseEl.dataset.id;
  exerciseEl.closest('li').remove();
  favoritesDB.remove(exerciseID);
  localStorage.setItem('isDataOld', JSON.stringify(true));
}

function removeElFromFavorites({ _id }) {
  const exerciseEl = document.querySelector('.favorite-cards__gallery-link[data-id="' + _id + '"]');
  exerciseEl.closest("li").remove();
  localStorage.setItem('isDataOld', JSON.stringify(true)); //?
}

if (exercisesList) {
  exercisesList.addEventListener('click', removeHandler);
} else {
  console.error("Element with class 'js-cards' not found for workout.");
}

export { removeElFromFavorites };
