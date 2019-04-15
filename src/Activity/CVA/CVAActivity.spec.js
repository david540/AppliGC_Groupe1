import React from 'react';
import TouchableOpacity from 'react';
import CVAActivity from './CVAActivity';

import renderer from 'react-test-renderer';
// import axios from 'axios',

// const chai = require('chai');
// const sinon = require('sinon');
// chai.use(require('sinon-chai'));

describe('CVAActivity Component', () => {

  it('username and password should changed', () => {
    const wrapper = shallow(<CVAActivity />);

    expect(wrapper.state().username).to.equal('');
    expect(wrapper.state().password).to.equal('');

    wrapper.setState({username : 'user', password:'pwd'});

    expect(wrapper.state().username).to.equal('user');
    expect(wrapper.state().password).to.equal('pwd');
  });


  it('calls componentDidMount', () => {
    sinon.spy(CVAActivity.prototype, 'componentDidMount');

    const wrapper = mount(<CVAActivity />);
    expect(CVAActivity.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  // it('decrements the counter', () => {
  //   const wrapper = shallow(<App />);
  //
  //   wrapper.setState({ counter: 0 });
  //   wrapper.find('button').at(1).simulate('click');
  //
  //   expect(wrapper.state().counter).to.equal(-1);
  // });
});
