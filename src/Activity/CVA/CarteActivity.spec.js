import React from 'react';
import CarteActivity from './CarteActivity';

import renderer from 'react-test-renderer'

describe("<CarteActivity />", () => {

  it('calls componentDidMount', () => {
    sinon.spy(CarteActivity.prototype, 'componentDidMount');
    const navigation = { navigate: jest.fn() };
    const wrapper = mount(<CarteActivity navigation={navigation}/>);
    expect(Cartectivity.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  // it("should point to the resetToScreen function in onPress", () => {
  //   resetToScreen = sinon.spy();
  //
  //   let wrapper = shallow(<CarteActivity />);
  //
  //   wrapper.simulate('press');
  //
  //   expect(wrapper.props().onPress.name).to.contain('bound resetToScreen');
  //
  //   describe("<CarteActivity/> : resetToScreen()", () => {
  //     it("should trigger resetToScreen if onPress is executed", () => {
  //       expect(resetToScreen.calledOnce).to.equal(true);
  //     });
  //   });
  // });
});
