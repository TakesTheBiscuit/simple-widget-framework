import { h, render } from 'preact';

import stylesheet from '../css/theme.scss';
import MyComponent from '~/views/my_component';



document.addEventListener('DOMContentLoaded', function() {

  // if invocation is indicated via all of these params
  const me = document.querySelector('script[data-rcName="MagicWidget1"]');
  var rcTarget = me.getAttribute('data-rcTarget');
  var rcKey = me.getAttribute('data-rcKey');
  var rcStyle = me.getAttribute('data-rcStyle');

  if (rcTarget) {
    //var element_selector = String(options.rcTarget);
    var stickyClass = '';
  } else {
    // fallback to body element integration
    var rcTarget = String('body');
    var stickyClass = 'rcStickyButton';
  }

  if (rcTarget && rcKey && rcStyle) {
    var options = {
      rcTarget: rcTarget,
      model: {
        text: 'Invoked automatically',
        rcKey: rcKey,
        rcStyle: rcStyle,
        sticky: stickyClass,
        class: 'myButton',
        deepLink: 'https://widget.bigdata.com/status/' + rcKey,
        cssFile: 'http://192.168.10.10:8080/app.magicwidget.css'
      }
    };

    // make it into a widget 
    MagicWidget.widget(options);



  }
  
});


export function onItemClick(event) {
  console.log(event);
}

export function widget(options = {}) {
  console.log('l39 .widget called');
  //options.model.rcKey = rcKey;
  var element_selector = String(options.rcTarget);
/*
  options.model.rcKey = options.rcKey;
  options.model.rcTarget = options.rcTarget;
  options.model.rcStyle = options.rcStyle;*/

  const parentEl = document.querySelector(element_selector);




    const handshake = new Postmate.Model({
      // Expose your model to the Parent. Property values may be functions, promises, or regular values
      height: () => document.height || document.body.offsetHeight,
      the_world: () => options.model || false
    });

    // When parent <-> child handshake is complete, events may be emitted to the parent
    var arr = {
      message: 'Hello, world!',
      the_world: options.model
    };


    handshake.then(parent => {
      parent.emit('init', arr);
      options.model.parent = parent;
    });

  function handleChildClick(event) {
     console.log("The Child button data is: ");
     console.log("The Child HTML is: " + event);
  }



  render((
    <MyComponent
      model={options.model}
      
    />
  ), parentEl);
};

export function show(options = {}) {
  console.log('l56 .show called');

  options.model.rcKey = options.rcKey;
  options.model.rcTarget = options.rcTarget;
  options.model.rcStyle = options.rcStyle;

  if (options.rcTarget) {
  	var element_selector = String(options.rcTarget);
  }	else {
    // fallback to body element integration
  	var element_selector = String('body');
  }

  const parentEl = document.querySelector(element_selector);

  render((
    <MyComponent model={options.model}/>
  ), parentEl);
};
