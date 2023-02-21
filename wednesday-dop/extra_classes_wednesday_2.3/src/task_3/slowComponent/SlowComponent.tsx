import {memo} from "react";

//1
// export const SlowComponent = () => {
//   console.log('SlowComponent1 re-render...');
//
//   let now = performance.now();
//
//   while (performance.now() - now < 1000) {
//     // Artificial delay -- do nothing for 100ms
//   }
//
//   return <p>I am a very slow component tree.</p>;
// };


//2
// export const SlowComponent = memo(() => {
//   console.log('SlowComponent2 re-render...');
//
//   let now = performance.now();
//
//   while (performance.now() - now < 1000) {
//     // Artificial delay -- do nothing for 100ms
//   }
//
//   return <p>I am a very slow component tree.</p>;
// });


//3
export const SlowComponent = () => {
  console.log('SlowComponent3 re-render...');

  let now = performance.now();

  while (performance.now() - now < 1000) {
    // Artificial delay -- do nothing for 100ms
  }

  return <p>I am a very slow component tree.</p>;
};