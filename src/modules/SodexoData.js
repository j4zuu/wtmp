import LunchMenu from './JSONfiles/LunchMenu.JSON';
import LunchMenuEn from './JSONfiles/LunchMenuEn.JSON';
import {getFood} from './network/Fetch';

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const langSwitch = document.getElementById('langSwitch');
const sort = document.getElementById('sort');
const pickRandom = document.getElementById('pickRandom');
let lang = 'en';
let sortBy = 'asc';

const coursesEn = [];
const coursesFi = [];

const temp1 = getFood().then(data => tempFi = data);
console.log(temp1);

const looper = (courses) => {
  box1.innerText = '';
  for (let i = 0; i < courses.length; i++) {
    box1.innerText += courses[i] + ' \n';
  }
};
/**
 * Since task 3's description was so vague I couldn't really
 * understand what menu/menus were intended to be seen
 * So I just hardcoded first meals of first day
 */
let tempFi = LunchMenu.LunchMenus[0].SetMenus[0].Meals;
const tempEn = LunchMenuEn.LunchMenus[0].SetMenus[0].Meals;

const courseGetter = (arr, obj) => {
  for (let i = 0; i <= Object.keys(obj).length; i++) {
    if (obj[i] !== undefined) {
      arr.push(obj[i].Name);
      console.log(obj[i].Name);
    }
  }
};

courseGetter(coursesFi, tempFi);
courseGetter(coursesEn, tempEn);

const sorter = (courses, sortBy1) => {
  if (sortBy1 === 'asc') {
    courses.sort();
  } else {
    courses.sort().reverse();
  }
  sort.innerText = `Sort by: ${sortBy1}`;
  return courses;
};

const sortSwapper = (sortBy1) => {
  if (sortBy1 === 'asc') {
    sortBy = 'desc';
  } else sortBy = 'asc';
};

langSwitch.addEventListener('click', function() {
  if (lang === 'en') {
    lang = 'fi';
    if (sortBy === 'asc') {
      looper(sorter(coursesFi, 'asc'));
    } else looper(sorter(coursesFi, 'desc'));
  } else if (lang === 'fi') {
    if (sortBy === 'asc') {
      looper(sorter(coursesEn, 'asc'));
    } else looper(sorter(coursesEn, 'desc'));
    looper(coursesEn);
    lang = 'en';
  }
  sort.innerText = `Sort by: ${sortBy}`;
});

sort.addEventListener('click', function() {
  if (lang === 'en') {
    if (sortBy === 'asc') {
      looper(sorter(coursesEn, 'desc'));
    } else looper(sorter(coursesEn, 'asc'));
  } else if (lang === 'fi') {
    if (sortBy === 'asc') {
      looper(sorter(coursesFi, 'desc'));
    } else looper(sorter(coursesFi, 'asc'));
  }
  sortSwapper(sortBy);
});

pickRandom.addEventListener('click', function() {
  if (lang === 'en') {
    box2.innerText = coursesEn[Math.floor(Math.random() * coursesEn.length)];
  } else box2.innerText = coursesFi[Math.floor(
    Math.random() * coursesFi.length)];
});

export {looper, sort, sorter, sortBy, coursesFi, coursesEn};
