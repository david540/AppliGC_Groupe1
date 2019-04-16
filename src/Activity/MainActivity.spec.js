import React from 'react';
import TouchableOpacity from 'react';
import MainActivity from './MainActivity';

import renderer from 'react-test-renderer';
// import axios from 'axios',

// const chai = require('chai');
// const sinon = require('sinon');
// chai.use(require('sinon-chai'));

describe('MainActivity Component', () => {

  it('authentificationType should be equal to 1', () => {
    const wrapper = shallow(<MainActivity />);

    expect(wrapper.state().authentificationType).to.equal(1);
  });

  it('calls loadForPartenariatsAndEvents', () => {
    sinon.spy(MainActivity.prototype, 'loadForPartenariatsAndEvents');

    const wrapper = mount(<MainActivity />);
    expect(MainActivity.prototype.loadForPartenariatsAndEvents.calledOnce).to.equal(true);
  });

  it('calls componentDidMount', () => {
    sinon.spy(MainActivity.prototype, 'componentDidMount');

    const wrapper = mount(<MainActivity />);
    expect(MainActivity.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  // it('onPress', () => {
  //   // const wrapper = shallow(<MainActivity />);
  //
  //   // wrapper.setState({ loadisnotdone : true });
  //
  //
  //   let wrapper = shallow(<MainActivity  />);
  //   wrapper.simulate('press');  //find(TouchableOpacity).at(0)
  //   expect(wrapper.props().onPress.name).to.contain('bound goToScreen');
  //
  // });

  // it('decrements the counter', () => {
  //   const wrapper = shallow(<App />);
  //
  //   wrapper.setState({ counter: 0 });
  //   wrapper.find('button').at(1).simulate('click');
  //
  //   expect(wrapper.state().counter).to.equal(-1);
  // });
});
