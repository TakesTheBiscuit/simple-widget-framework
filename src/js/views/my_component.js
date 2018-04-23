import { h, Component } from 'preact';


export default class MyComponent extends Component {
  render({ model }, { }) {
    return (
      <div>
        <p>{model.text}</p>
        <p>FISH_ID: {model.fish}</p>
      </div>
    );
  }
}
