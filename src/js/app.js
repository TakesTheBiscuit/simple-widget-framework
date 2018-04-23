import { h, render } from 'preact';

import stylesheet from '../css/theme.scss';
import MyComponent from '~/views/my_component';


export function run(options = {}) {


  const me = document.querySelector('script[data-name="MagicWidget1"]');
  const fish_id = me.getAttribute('data-fish');

  options.model.fish = fish_id;

  if (options.target) {
  	var element_selector = String(options.target);
  }	else {
  	var element_selector = String('body');
  }

  const parentEl = document.querySelector(element_selector);

  render((
    <MyComponent model={options.model}/>
  ), parentEl);
};
