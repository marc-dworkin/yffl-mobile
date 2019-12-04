// https://stackoverflow.com/questions/30620684/importing-moment-timzone-and-moment-range-with-webpack-babel-es6
// const moment = require('moment');
import moment from 'moment';
import { extendMoment } from 'moment-range';
// import 'moment-range';
window.moment = moment;
extendMoment(window.moment);

const today = moment();

// TODO: 4 week superbowl
const quarters = (year) => {
  if (year >= 2019) {
    return [
      {
        name: 'Quarter 1', code: 'q1', number: 1, weekCount: 3,
      },
      {
        name: 'Quarter 2', code: 'q2', number: 2, weekCount: 3,
      },
      {
        name: 'Quarter 3', code: 'q3', number: 3, weekCount: 3,
      },
      {
        name: 'Quarter 4', code: 'q4', number: 4, weekCount: 3,
      },
      {
        name: 'Playoffs', code: 'playoffs', number: 5, weekCount: 2,
      },
      {
        name: 'SuperBowl', code: 'superbowl', number: 6, weekCount: 2,
      },
    ];
  }
  return [
    {
      name: 'Quarter 1', code: 'q1', number: 1, weekCount: 3,
    },
    {
      name: 'Quarter 2', code: 'q2', number: 2, weekCount: 4,
    },
    {
      name: 'Quarter 3', code: 'q3', number: 3, weekCount: 3,
    },
    {
      name: 'Quarter 4', code: 'q4', number: 4, weekCount: 3,
    },
    {
      name: 'Playoffs', code: 'playoffs', number: 5, weekCount: 2,
    },
    {
      name: 'SuperBowl', code: 'superbowl', number: 6, weekCount: 2,
    },
  ];
};

// will assume first year is most recent
const seasons = [
  {
    year: 2019,
    kickoffDate: moment('2019-09-05', 'YYYY-MM-DD'),
    isCurrent: 1,
    isPast: 0,
  },
  {
    year: 2018,
    kickoffDate: moment('2018-09-06', 'YYYY-MM-DD'),
    isCurrent: 0,
    isPast: 1,
  },
  {
    year: 2017,
    kickoffDate: moment('2017-09-07', 'YYYY-MM-DD'),
    isCurrent: 0,
    isPast: 1,
  },
  {
    year: 2016,
    kickoffDate: moment('2016-09-08', 'YYYY-MM-DD'),
    isCurrent: 0,
    isPast: 1,
  },
  {
    year: 2015,
    kickoffDate: moment('2015-09-10', 'YYYY-MM-DD'),
    isCurrent: 0,
    isPast: 1,
  },
];

for (let i = 0; i < seasons.length; i += 1) {
  const s = seasons[i];

  let firstWeekNumber = 0;
  let endDate = s.kickoffDate.clone().add(-1, 'millisecond');
  // assume quarters in order
  s.quarters = quarters(s.year).map((q) => {
    const startDate = endDate.clone().add(1, 'millisecond');
    endDate = startDate
      .clone()
      .add(q.weekCount, 'week')
      .add(-1, 'millisecond');
    const weeks = [];
    for (let d = startDate.clone(); d < endDate; d.add(1, 'week')) {
      const dates = moment().range(
        d.clone(),
        d
          .clone()
          .add(1, 'week')
          .add(-1, 'millisecond'),
      );
      weeks.push({
        number: (firstWeekNumber += 1),
        isCurrent: dates.contains(today),
        isPast: today > dates.end,
        dates,
      });
    }

    // todo: if past quaarter last week is current

    const qDates = moment().range(startDate, endDate);
    return {
      ...q,
      dates: qDates,
      // if past season last quarter is current
      isCurrent: s.isPast === 0 ? qDates.contains(today) : q.number === 4,
      isPast: today > qDates.end,
      weeks,
    };
  });
}

export default seasons;

export const currentYear = seasons.filter((s) => today > s.kickoffDate)[0];
// .filter(s => s.isCurrent)[0];
export const currentQuarter = currentYear
  .quarters.filter((s) => s.isCurrent)[0] || currentYear.quarters[3];

export const currentWeek = currentQuarter.weeks.filter((s) => s.isCurrent)[0]
  || currentQuarter.weeks[currentQuarter.weeks.length - 1];
