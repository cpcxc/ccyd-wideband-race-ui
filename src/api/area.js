
import cq from './village_cq';
import wx from './village_wx';
import tt from './village_tt';

const datas = [
  // 城区
  ...cq,
  // 外县
  ...wx,
];

export default datas.map(p=>p[1]).reduce((p,c)=>{
  if(p.indexOf(c) == -1) p.push(c);
  return p;
},[]).concat('铁通');
