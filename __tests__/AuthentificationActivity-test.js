import React from 'react';
import AuthentificationActivity from '../AuthentificationActivity';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<AuthentificationActivity />).toJSON();
  expect(tree).toMatchSnapshot();
});
