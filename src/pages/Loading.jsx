import React, {useState} from 'react'
import anime from 'animejs';
function Loading() {
anime ({
  targets: 'div.box',
  translateY: [
      {value: 200, duration: 500},
      {value:0, duration: 800}  
  ],
  rotate: {
  value: '1turn',
  },
  borderRadius: 50,
  direction: 'alternate',
  easing: 'easeInOutQuad',
  delay: function() { return anime.random(0, 1000); },
  autoplay: true,
  loop: true,
  elasticity: 200 
}); 
// loading page inserted
return(
 <div id="boxes">
        <div class="box red"></div>
        <div class="box blue"></div>
        <div class="box green"></div>
        <div class="box cyan"></div>
  </div>
)
}

export default Loading;
