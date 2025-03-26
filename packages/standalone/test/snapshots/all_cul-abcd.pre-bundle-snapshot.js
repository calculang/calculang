let model = {}; 



////////////// cul scope id 0 //////////





////////////// cul scope id 1 //////////

export const s1_d = ({ c_in }) => s2_a({}) + s2_b({}) + s2_c({ c_in });



////////////// cul scope id 2 //////////

export const s2_a = ({}) => 1;export const s2_b = ({}) => 1;export const s2_c = ({ c_in }) => c_in;


export const s1_a = s2_a; model['s1_a'] = s1_a;
export const s1_b = s2_b; model['s1_b'] = s1_b;
export const s1_c = s2_c; model['s1_c'] = s1_c


export const a = s1_a; model['a'] = a; ;
export const b = s1_b; model['b'] = b; ;
export const c = s1_c; model['c'] = c; ;
export const d = s1_d; model['d'] = d; 






////////// defaults (imports above tho): ////




model['s1_d'] = s1_d;
model['s2_a'] = s2_a;
model['s2_b'] = s2_b;
model['s2_c'] = s2_c;

