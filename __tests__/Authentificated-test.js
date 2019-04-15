import React from 'react';
import Authentificated from '../Authentificated';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Authentificated />).toJSON();
  expect(tree).toMatchSnapshot();
});
