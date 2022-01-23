import {
  coursesEn,
  coursesFi,
  sortBy,
  sort,
  sorter,
  looper,
} from './modules/SodexoData';

sorter(coursesEn, sortBy);
sorter(coursesFi, sortBy);
looper(coursesEn);

sort.innerText = `Sort by: ${sortBy}`;
