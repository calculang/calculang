
////////////// cul scope id 0 //////////



export const s0_thing = ({ t_in }) => s1_thing_({ t_in }) * 2;



////////////// cul scope id 1 //////////


export const s1_factor = ({}) => 0.9;
export const s1_t = ({ t_in }) => t_in;
export const s1_thing_ = ({ t_in }) => {
  if (s1_t({ t_in }) <= 0) return 1;else
  return s0_thing({ t_in: s1_t({ t_in }) - 1 }) * s1_factor({});
};





export const thing_single = s1_thing_






////////// defaults (imports above tho): ////

export const thing = s0_thing


