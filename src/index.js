const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const langSwitch = document.getElementById('langSwitch');
const sort = document.getElementById('sort');
const pickRandom = document.getElementById('pickRandom');
let lang = 'en';
let sortBy = 'asc';

const coursesEn = [
  'Hamburger, cream sauce and poiled potates',
  'Goan style fish curry and whole grain rice',
  'Vegan Chili sin carne and whole grain rice',
  'Broccoli puree soup, side salad with two napas',
  'Lunch baguette with BBQ-turkey filling',
  'Cheese / Chicken / Vege / Halloum burger and french fries'];
const coursesFi = [
  'Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa',
  'Goalaista kalacurrya ja täysjyväriisiä',
  'vegaani Chili sin carne ja täysjyväriisi',
  'Parsakeittoa,lisäkesalaatti kahdella napaksella',
  'Lunch baguette with BBQ-turkey filling',
  'Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset'];

const looper = (courses) => {
  box1.innerText = '';
  for (let i = 0; i < courses.length; i++) {
    box1.innerText += courses[i] + ' \n';
  }
};

const sorter = (courses, sortBy1) => {
  if (sortBy1 === 'asc') {
    courses.sort();
  } else {
    courses.sort().reverse();
  }
  console.log(courses);
  sort.innerText = `Sort by: ${sortBy1}`;
  return courses;
};

const sortSwapper = (sortBy1) => {
  if (sortBy1 === 'asc') {
    sortBy = 'desc';
  } else sortBy = 'asc';
};

langSwitch.addEventListener('click', function() {
  console.log(sortBy);
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
  console.log(sortBy);
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
