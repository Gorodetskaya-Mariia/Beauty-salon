// import React from 'react';
// import { Link } from "react-router-dom";
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import Header from "./Header";

// import { Menu } from "antd";

// configure({adapter: new Adapter()});

// describe('<Menu />', () => {
//     let wrapper;

//     beforeEach(() => {
//         wrapper = shallow(<Header />);
//     });

//     it('should render three <Menu.Item /> elements if not authenticated', () => {
//         expect(wrapper.find(<Menu.Item />)).toHaveLength(3);
//     });

//     it('should render four <Menu.Item  /> elements if authenticated', () => {
//         wrapper.setProps({isAuthenticated: true});
//         expect(wrapper.find(<Menu.Item />)).toHaveLength(4);
//     });

//     it('should an exact logout button', () => {
//         wrapper.setProps({isAuthenticated: true});
//         expect(wrapper.contains(<Menu.Item key="login"><Link to="/logout">Logout</Link></Menu.Item>)).toEqual(true);
//     });
// });