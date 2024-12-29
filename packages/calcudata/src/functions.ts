import { SayHelloProps } from "./types";

export function sayHello({ firstName, lastName, age}: SayHelloProps) {
  console.log('Hello!');
  console.log(`Your name is ${firstName + (lastName ?? '')}`)

  if (age)
    console.log(`Your age is ${age}`);
}