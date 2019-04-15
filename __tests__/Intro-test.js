// import { add } from './add.js';
//
// describe('add()', () => {
//   it('adds two numbers', () => {
//     expect(add(2, 3)).toEqual(5);
//   });
//
//   it-'doesnt add the third number', () => {
//     expect(add(2, 3, 5)).toEqual(add(2, 3));
//   };
// });

// __tests__/Intro-test.js
import React from 'react';
import Intro from '../Intro';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
