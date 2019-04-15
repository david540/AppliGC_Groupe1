import React from 'react';
import TouchableOpacity from 'react';
import AccountRequestActivity from './CvaConnect';

import renderer from 'react-test-renderer';
// import axios from 'axios',

// const chai = require('chai');
// const sinon = require('sinon');
// chai.use(require('sinon-chai'));

describe('AccountRequestActivity Component', () => {

  it('newAccount should be equal to false', () => {
    const wrapper = shallow(<AccountRequestActivity />);

    expect(wrapper.state().newAccount).to.equal(false);
  });

  it('calls componentDidMount', () => {
    sinon.spy(AccountRequestActivity.prototype, 'componentDidMount');

    const wrapper = mount(<AccountRequestActivity />);
    expect(AccountRequestActivity.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('onPress', () => {
    // const wrapper = shallow(<AccountRequestActivity />);
    // wrapper.setState({ loadisnotdone : true });
    // sinon.spy(AccountRequestActivity.prototype, '_handleCVA');
    const wrapper = mount(<AccountRequestActivity />);

    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.props().onPress.name).to.contain('bound _handleCVA');

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
