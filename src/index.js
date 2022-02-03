import {
  coursesEn,
  coursesFi,
  looper,
  sort,
  sortBy,
  sorter,
} from './modules/SodexoData';
import {getFood} from './modules/network/Fetch';

sorter(coursesEn, sortBy);
sorter(coursesFi, sortBy);
looper(coursesEn);





sort.innerText = `Sort by: ${sortBy}`;

const spaceCat = document.querySelector('#spaceCat');
const mouse = document.querySelector('.mouse');
const mouseLeftBox = document.querySelector('.mouse-center');
const astronaut = document.querySelector('.layer1');
const shuttle = document.querySelector('.layer2');

document.addEventListener('mousemove', (evt) => {
// Get center
  let cx = spaceCat.clientWidth / 2;
  let cy = spaceCat.clientHeight / 2;

  let mouseX = evt.clientX,
    mouseY = evt.clientY;
  mouseLeftBox.innerHTML = `Vasemmasta kulmasta x: ${mouseX} ja y: ${mouseY}`;
  let from_center_x = cx - mouseX;
  let from_center_y = cy - mouseY;

  mouse.innerHTML = `Keskeltä x: ${from_center_x} ja y: ${from_center_y}`;

  astronaut.style.transform = 'translateX(' + from_center_x / 10 +
    '%) translateY(' + from_center_y / 10 + '%)';
  shuttle.style.transform = 'translateX(' + from_center_x / 350 +
    '%) translateY(' + from_center_y / 350 + '%)';

});
