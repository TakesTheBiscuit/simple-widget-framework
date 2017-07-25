import { h, render } from 'preact';

import stylesheet from '../css/theme.scss';
import MyComponent from '~/views/my_component';


export function run(options = {}) {
  const parentEl = document.querySelector(String(options.target));
  render((
    <MyComponent model={options.model}/>
  ), parentEl);
};
