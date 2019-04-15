// import 'react-native';
// import mockComponent from 'react-native/jest/mockComponent'; // <-- ADD THIS
// import React from 'react';
// import renderer from 'react-test-renderer';
//
// import MainActivity from './MainActivity';
//
// // jest.mock('Button', () => {  //<-- ADD THIS
// //     return mockComponent('Button');
// // });
//
// it('renders correctly', () => {
//     const tree = renderer(<MainActivity />);
//     expect(tree.toJSON()).toMatchSnapshot();
// });
//
// // it('changes text onPress', () => {
// //     const tree = renderer(<MainActivity />);
// //     const btn = tree.query('#theButton');
// //
// //     btn.simulate('press'); //<-- NOW YOU CAN SIMULATE
// //     expect(tree.state().active).toBe(true);
// //     expect(tree.query('#theText').text()).toBe('Active');
// //
// //     btn.simulate('press');
// //     expect(tree.state().active).toBe(false);
// //     expect(tree.query('#theText').text()).toBe('Dead');
// // });

import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

import Adapter from 'enzyme-adapter-react-16';

import MainActivity from './MainActivity';

configure({ adapter: new Adapter() });

test('test onPress functionality', () => {

    const onPressEvent = jest.fn();

    onPressEvent.mockReturnValue('Link on press invoked');

    const wrapper = shallow(<MainActivity onPress={ onPressEvent }/>);

    wrapper.find(TouchableOpacity).first().props().onPress();

    expect(onPressEvent.mock.calls.length).toBe(1);

});
