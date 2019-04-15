import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

describe('App Snapshot', () => {
  test('renders', () => {
    const component = renderer.create(
      <App />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
