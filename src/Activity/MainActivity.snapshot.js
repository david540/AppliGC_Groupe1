import 'react-native';
import mockComponent from 'react-native/jest/mockComponent'; // <-- ADD THIS
import React from 'react';
import renderer from 'react-test-renderer';

import MainActivity from './MainActivity';

// jest.mock('Button', () => {  //<-- ADD THIS
//     return mockComponent('Button');
// });

it('renders correctly', () => {
    const tree = renderer(<MainActivity />);
    expect(tree.toJSON()).toMatchSnapshot();
});

// it('changes text onPress', () => {
//     const tree = renderer(<MainActivity />);
//     const btn = tree.query('#theButton');
//
//     btn.simulate('press'); //<-- NOW YOU CAN SIMULATE
//     expect(tree.state().active).toBe(true);
//     expect(tree.query('#theText').text()).toBe('Active');
//
//     btn.simulate('press');
//     expect(tree.state().active).toBe(false);
//     expect(tree.query('#theText').text()).toBe('Dead');
// });
