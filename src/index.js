import LunchMenu from './assets/LunchMenu';

const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const langSwitch = document.getElementById('langSwitch');
const sort = document.getElementById('sort');
const pickRandom = document.getElementById('pickRandom');
let lang = 'en';
let sortBy = 'asc';

const coursesEn = [];
const coursesFi = [];

const looper = (courses) => {
  box1.innerText = '';
  for (let i = 0; i < courses.length; i++) {
    box1.innerText += courses[i] + ' \n';
  }
};

const courseGetter = () => {
  for (let i = 0; i <= Object.keys(LunchMenu.courses).length; i++) {
    if (LunchMenu.courses[i] !== undefined) {
      coursesFi.push(LunchMenu.courses[i].title_fi);
      coursesEn.push(LunchMenu.courses[i].title_en);
    }
  }
};

courseGetter();

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

sorter(coursesEn, sortBy);
sorter(coursesFi, sortBy);
looper(coursesEn);

sort.innerText = `Sort by: ${sortBy}`;
