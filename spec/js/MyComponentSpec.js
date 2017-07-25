import { h } from 'preact';
import { render } from 'preact-render-spy';
import MyComponent from '~/views/my_component';


describe('MyComponent', () => {
  let model;
  let dom;

  beforeEach(() => {
    model = { text: 'Lorem ipsum in ullamco nisi eiusmod.' };
    dom = render(<MyComponent model={model}/>);
  })

  describe('Render', () => {
    it('should render the notification title', () => {
      expect(dom.find('p').text()).toEqual(model.text);
    })
  })
})
