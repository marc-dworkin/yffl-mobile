const ifNull = (val, ifNullVal = 0) => {
  if (val) {
    return val;
  }
  return ifNullVal;
};

export const getYFFLPoints = (section, stats) => {
  let pts = 6 * ifNull(stats.tds);
  pts += 2 * ifNull(stats.twoptm);

  switch (section) {
    case 'passing':
      // Q. Each 100 yards passing = +1
      pts += parseInt(ifNull(stats.yds) / 100, 10);
      break;
    case 'rushing':
      /*
      H. Rushes for 100-149 yds = +1
I. Rushes for 150-199 yds = +2
J. Rushes for 200-249 yds = +4
K. Rushes for 250+ yds = +6
*/
      if (stats.yds > 249) {
        pts += 6;
      } else if (stats.yds > 199) {
        pts += 4;
      } else if (stats.yds > 149) {
        pts += 2;
      } else if (stats.yds > 99) {
        pts += 1;
      }
      break;
    case 'receiving':
      // P. Each 100 yards receiving = +1
      pts += parseInt(ifNull(stats.yds) / 100, 10);

      /*
L. Receives 6-8 passes = +1
M. Receives 9-11 passes = +2
N. Receives 12-14 passes = +3
O. Receives 15+ passes = +4
*/
      if (stats.rec > 14) {
        pts += 4;
      } else if (stats.rec > 11) {
        pts += 3;
      } else if (stats.rec > 8) {
        pts += 2;
      } else if (stats.rec > 5) {
        pts += 1;
      }

      break;
    case 'kicking':
      pts += 3 * ifNull(stats.fgm, 0);
      pts += 1 * ifNull(stats.xpmade, 0);
      break;
    default:
      break;
  }
  return pts;
};

export default null;
