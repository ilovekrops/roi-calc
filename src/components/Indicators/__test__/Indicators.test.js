import React from 'react';
import Indicators from '../Indicators';
import { shallow } from 'enzyme';

describe('<Indicators/>', () => {
  describe('@renders', () => {
    const initialProps = {
      number: 4,
      currentStep: 1
    }
    it('should render 4 numbers', () => {
      const wrapper = shallow(<Indicators {...initialProps}/>)
      expect(wrapper.find('.Indicators-number').length).toBe(4)
      expect(wrapper.find('.Indicators-number').at(0).text()).toBe('1')
      expect(wrapper.find('.Indicators-number').at(1).text()).toBe('2')
      expect(wrapper.find('.Indicators-number').at(2).text()).toBe('3')
      expect(wrapper.find('.Indicators-number').at(3).text()).toBe('4')
    })
    it('should set first two as active', () => {
      const wrapper = shallow(<Indicators {...initialProps}/>)
      expect(wrapper.find('.Indicators-number').at(0).hasClass('Indicators--isActive')).toBe(true)
      expect(wrapper.find('.Indicators-number').at(1).hasClass('Indicators--isActive')).toBe(true)
      expect(wrapper.find('.Indicators-number').at(2).hasClass('Indicators--isActive')).toBe(false)
      expect(wrapper.find('.Indicators-number').at(3).hasClass('Indicators--isActive')).toBe(false)
    })
  })
})
