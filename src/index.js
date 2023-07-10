import {fetchBreeds, fetchCatByBreed} from "./js/cat-api.js"
import Notiflix from "notiflix";
import 'notiflix/src/notiflix.css';
import SlimSelect from "slim-select";
import 'slim-select/dist/slimselect.css';
import createSelectElement from "./js/create-select-elemet.js";
import createInfoElement from "./js/create-info-elemet.js";
import getArgs from "./js/get-args.js"


const selectEl = document.querySelector('.breed-select');
const errorText = document.querySelector('error')
const catInfoEl = document.querySelector('.cat-info')
let eventError = false;


startLoading(selectEl);

fetchBreeds()
  .then(data => {
    if (!data.length) throw new Error('Data not found');
    return data.reduce(
      (markup, currentEl) => markup + createSelectElement(currentEl),
      ''
    );
  })
  .then(updateSelect)
  .catch(onError)
  .finally(endLoading);

selectEl.addEventListener('change', onSelect);

function onSelect(e) {
    startLoading(catInfoEl);
    fetchCatByBreed(e.target.value)
      .then(data => {
        if (!data.length) throw new Error('Data not found');
        return data.reduce(
          (markup, currentEl) => markup + createInfoElement(getArgs(currentEl)),
          ''
        );
      })
      .then(updateInfo)
      .catch(onError)
      .finally(endLoading);
}

function updateSelect(markup) {
    selectEl.innerHTML = markup;
    new SlimSelect({
      select: selectEl,
      settings: {
        placeholderText: 'Select a breed',
      },
    });
    selectEl.classList.remove('invisible');
  }

function updateInfo(markup) {
    catInfoEl.innerHTML = markup;
    catInfoEl.classList.remove('invisible');
}


function startLoading(element) {
    if (eventError) afterError();
    Notiflix.Loading.hourglass('Loading data, please wait...', {
        backgroundColor: 'rgba(0,0,0,0.6)',
      });
}

function endLoading() {
    Notiflix.Loading.remove();
}
  
function onError(error) {
    eventError = true;
    Notiflix.Notify.failure(error.message);
}
  
function afterError() {
    const notify = document.querySelector('.notiflix-notify-failure');
    if (notify) notify.remove();
    eventError = false;
}



export {startLoading, catInfoEl};