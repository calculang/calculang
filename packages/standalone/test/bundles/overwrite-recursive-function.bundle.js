let model = {}; 



////////////// cul scope id 0 //////////



export const s0_thing = ({ t_in }) => s1_thing_({ t_in }) * 2;



////////////// cul scope id 1 //////////


export const s1_factor = ({}) => 0.9;
export const s1_t = ({ t_in }) => t_in;
export const s1_thing_ = ({ t_in }) => {
  if (s1_t({ t_in }) <= 0) return 1;else
  return s1_thing_({ t_in: s1_t({ t_in }) - 1 }) * s1_factor({});
};





export const thing_single = s1_thing_; model['thing_single'] = thing_single; 






////////// defaults (imports above tho): ////

export const thing = s0_thing; model['thing'] = thing


model['s0_thing'] = s0_thing;
model['s1_factor'] = s1_factor;
model['s1_t'] = s1_t;
model['s1_thing_'] = s1_thing_;

