import Typed from 'typed.js';

const animateTitle = () => {
 var typed = new Typed('#h-title', {
  strings: ["Leave a trace. Print your Records", "Leave a trace. Print your Rides","Leave a trace. Print your Marathon","Leave a trace. Print your Hike","Leave a trace. Print your Trail", "Leave a trace. Print your Iron-Man"],
  smartBackspace: true,
  typeSpeed: 75,
  showCursor: false
});
};

export {animateTitle};
