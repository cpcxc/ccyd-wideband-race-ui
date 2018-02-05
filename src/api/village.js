
import cq from './village_cq';
import wx from './village_wx';
import tt from './village_tt';

const datas = [
  // 城区
  ...cq,
  // 外县
  ...wx,
  // 铁通
  ...tt
];
export default (area) => {
  return datas.filter(p=> (p[1]==area || (p[1]== undefined && area=='铁通'))).map(p=>p[0]);
}; 
