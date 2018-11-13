import React from 'react';
import Wizard from '../Wizard';
import Indicators from '../../Indicators/Indicators';
import { shallow, mount } from 'enzyme';

jest.mock('../../../history', () => ({
  push: jest.fn()
}))
import history from '../../../history'

describe('<Wizard/>', () => {
  const initialProps = {
    wizardLength: 3,
    path: 'step',
    match: {
      params: {
        id: '1'
      }
    }
  }
  beforeEach(() => {
    jest.resetAllMocks()
  })
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Wizard {...initialProps}/>)
      expect(wrapper.find('.Wizard-title').text()).toBe('Churn Impact Forecast')
      expect(wrapper.find('.Wizard-subtitle').text()).toBe('To forecast the impact of churn on your future subscription revenues, please enter the following inputs.')
      expect(wrapper.find('.Wizard-contentTitle').text()).toBe('Use the sliders to enter inputs')
      expect(wrapper.find('.Wizard-button').length).toBe(1)
      expect(wrapper.find('.Wizard-button').text()).toBe('Next')
      expect(wrapper.find(Indicators).length).toBe(1)
    })
    it('should render prev and next buttons if middle steps', () => {
      const wrapper = shallow(<Wizard {...initialProps}/>)
      wrapper.setState({currentStep: 1})
      expect(wrapper.find('.Wizard-button').length).toBe(2)
      expect(wrapper.find('.Wizard-button').at(0).text()).toBe('Prev')
      expect(wrapper.find('.Wizard-button').at(1).text()).toBe('Next')
    })
    it('should render prev and submit buttons if last steps', () => {
      const wrapper = shallow(<Wizard {...initialProps}/>)
      wrapper.setState({currentStep: 2})
      expect(wrapper.find('.Wizard-button').length).toBe(2)
      expect(wrapper.find('.Wizard-button').at(0).text()).toBe('Prev')
      expect(wrapper.find('.Wizard-button').at(1).text()).toBe('Create Forecast')
    })
  })
  describe('@lifecycle', () => {
    describe('constructor', () => {
      it('should set initial values', () => {
        const wrapper = shallow(<Wizard {...initialProps}/>)
        expect(wrapper.state().currentStep).toBe(0)
        expect(wrapper.instance().params).toEqual({})
      })
    })
    describe('componentDidUpdate', () => {
      it('should change currentStep if diffenert param', () => {
        const wrapper = shallow(<Wizard {...initialProps}/>)
        expect(wrapper.state().currentStep).toBe(0)
        wrapper.instance().componentDidUpdate({ match: { params: { id: '2' } } })
        setTimeout(() => {
          expect(wrapper.state().currentStep).toBe(1)

        })
      })
    })
  })
  describe('@events', () => {
    describe('updateParams', () => {
      it('should set passsed params', () => {
        const wrapper = shallow(<Wizard {...initialProps}/>)
        const instance = wrapper.instance()
        const newParams = { key: 'value' }
        instance.updateParams(newParams)
        expect(instance.params).toEqual(newParams)
      })
    })
    describe('nextStep', () => {
      it('should go to next step page', () => {
        const wrapper = shallow(<Wizard {...initialProps}/>)
        wrapper.find('.Wizard-buttonNext').simulate('click')
        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/step/2')
      })
      it('should not go to next one if last one', () => {
        const props = {
          wizardLength: 3,
          path: 'step',
          match: {
            params: {
              id: '3'
            }
          }
        }
        const wrapper = shallow(<Wizard {...props}/>)
        wrapper.instance().nextStep()
        expect(history.push).not.toHaveBeenCalled()
      })
    })
    describe('prevStep', () => {
      it('should go to next step page', () => {
        const props = {
          wizardLength: 3,
          path: 'step',
          match: {
            params: {
              id: '3'
            }
          }
        }
        const wrapper = shallow(<Wizard {...props}/>)
        wrapper.find('.Wizard-buttonPrev').simulate('click')
        expect(history.push).toHaveBeenCalledTimes(1)
        expect(history.push).toHaveBeenCalledWith('/step/2')
      })
      it('should not go to prev page if first one', () => {
        const props = {
          wizardLength: 3,
          path: 'step',
          match: {
            params: {
              id: '1'
            }
          }
        }
        const wrapper = shallow(<Wizard {...initialProps}/>)
        wrapper.instance().prevStep()
        expect(history.push).not.toHaveBeenCalled()
        expect(wrapper.state().currentStep).toBe(0)
      })
    })
    describe('submitWizard', () => {
      it('should change currentStep to prev one', () => {
        const onSubmitMock = jest.fn()
        const paramsMock = { key: 'value' }
        const wrapper = shallow(<Wizard {...initialProps} onSubmit={onSubmitMock} />)
        wrapper.setState({currentStep: 2})
        wrapper.instance().params = paramsMock
        wrapper.find('.Wizard-buttonSubmit').simulate('click')
        expect(onSubmitMock).toHaveBeenCalledTimes(1)
        expect(onSubmitMock).toHaveBeenCalledWith(paramsMock)
      })
    })
  })
})
