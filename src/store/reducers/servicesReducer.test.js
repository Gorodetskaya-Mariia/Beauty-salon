import reducer from './servicesReducer';
import * as actionTypes from '../actions/types';

describe('services reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
          services: null,
          error: false,
          selectedService: null,
          loading: false
        });
    });

    it('should store the services', () => {
        expect(reducer({
          services: null,
          error: false,
          loading: false
        }, { 
            type: actionTypes.SET_SERVICES,
            services: {
              men: [],
              women: []
            }
         })).toEqual({
          services: {
            men: [],
            women: []
          },
            error: false,
            loading: false,
        });
    });
});