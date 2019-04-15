import React from 'react';
import InfoActivity from '../InfoActivity';

import renderer from 'react-test-renderer';
import Enzyme, { shallow, render, mount } from 'enzyme';

const tree = renderer.create(<InfoActivity />).toJSON();
test('renders correctly', () => {
  expect(tree).toMatchSnapshot();
});

const clickFn = jest.fn();

describe('InfoActivity', () => {
  it('button click should hide component', () => {
    const component = shallow(<InfoActivity onPress={clickFn} />);

    component
      .find('button#my-button-two')
      .simulate('click');

    expect(clickFn).toHaveBeenCalled();
  });
});
