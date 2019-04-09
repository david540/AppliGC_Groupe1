import React from 'react';
import renderer from 'react-test-renderer';

import MainActivity from './MainActivity';

describe('MainActivity Snapshot', () => {
  it('renders', () => {
    const component = renderer.create(
      <MainActivity />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// const navigation = { navigate: jest.fn() };
