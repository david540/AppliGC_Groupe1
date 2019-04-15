import React from 'react';
import CarteActivity from '../CarteActivity';

// import Enzyme, { shallow, render, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
//
// // React 16 Enzyme adapter
// Enzyme.configure({ adapter: new Adapter() });

// // Make Enzyme functions available in all test files without importing
// global.shallow = shallow;
// global.render = render;
// global.mount = mount;

import renderer from 'react-test-renderer';

jest.mock('react-navigation-stack', () => {});

describe('CarteActivity', () => {
  it('should renders correctly', () => {
    const navigation = { navigate:jest.fn() };
    expect(renderer.create(<CarteActivity navigation={navigation}/>)).toMatchSnapshot();
  });
});



// describe('<CarteActivity />', () => {
//   it('Page rendered', () => {
//     const rendered = renderComponent({
//     });
//
//     expect(rendered).toMatchSnapshot();
//   });
// });

// describe('<CarteActivity />', () => {
//   it('renders correctly', () => {
//     const rendered = renderComponent({
//       ...testProps,
//       loadDataList,
//       loading: true,
//     });
//
//     expect(rendered).toMatchSnapshot();
//   });
// });

// it('should be possible to activate button with Spacebar', () => {
//   const component = mount(<MyComponent />);
//
//   component
//     .find('button#my-button-one')
//     .simulate('keydown', { keyCode: 32 });
//
//   expect(component).toMatchSnapshot();
//   component.unmount();
// });
