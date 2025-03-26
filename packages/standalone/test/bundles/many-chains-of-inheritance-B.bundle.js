let model = {}; 



////////////// cul scope id 0 //////////


export const s0_thing = ({}) => 110;



////////////// cul scope id 1 //////////


export const s1_thing_that_calls_thing = ({}) => s0_thing({});



////////////// cul scope id 2 //////////

export const s2_thing_ = ({}) => 100;
export const s2_other_thing = ({}) => 1;


export const s1_thing_ = s2_thing_; model['s1_thing_'] = s1_thing_;
export const s1_other_thing = s2_other_thing; model['s1_other_thing'] = s1_other_thing


export const other_thing = s1_other_thing; model['other_thing'] = other_thing; ;
export const thing_that_calls_thing = s1_thing_that_calls_thing; model['thing_that_calls_thing'] = thing_that_calls_thing; 






////////// defaults (imports above tho): ////

export const thing = s0_thing; model['thing'] = thing


model['s0_thing'] = s0_thing;
model['s1_thing_that_calls_thing'] = s1_thing_that_calls_thing;
model['s2_thing_'] = s2_thing_;
model['s2_other_thing'] = s2_other_thing;

