import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

import Adapter from 'enzyme-adapter-react-16';

import MainActivity from './MainActivity';

configure({ adapter: new Adapter() });

it('renders correctly', () => {
    const tree = renderer(<MainActivity />);
    expect(tree.toJSON()).toMatchSnapshot();
});

test('test onPress functionality', () => {

    const onPressEvent = jest.fn();

    onPressEvent.mockReturnValue('Link on press invoked');

    const wrapper = shallow(<MainActivity onPress={ onPressEvent }/>);

    wrapper.find(TouchableOpacity).first().props().onPress();

    expect(onPressEvent.mock.calls.length).toBe(1);

});
