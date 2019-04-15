import React from 'react';
import AccountRequestActivity from '../AccountRequestActivity';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<AccountRequestActivity />).toJSON();
  expect(tree).toMatchSnapshot();
});
