import { h, Component } from 'preact';


export default class MyComponent extends Component {

  render({ model }, { }) {
    return (
      <div>
      	<a class={model.class} onClick="handleChildClick({event})">GO GO GO</a>
      </div>
    );
  }

}

/*

        <p>{model.text}</p>
        <p>rcKey: {model.rcKey}</p>
*/