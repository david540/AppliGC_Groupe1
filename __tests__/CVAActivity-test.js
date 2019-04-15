import React from 'react';
import CVAActivity from '../CVAActivity';

import renderer from 'react-test-renderer';

const tree = renderer.create(<CVAActivity />).toJSON();
test('renders correctly', () => {
  expect(tree).toMatchSnapshot();
});
