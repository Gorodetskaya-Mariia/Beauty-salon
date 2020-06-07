import reducer from './userDataReducer';
import * as actionTypes from '../actions/types';

describe('userData reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
          userData: [],
          loading: false,
          update: true
        });
    });

    it('should fetch user data', () => {
        expect(reducer({
          userData: [],
          update: true
        }, { 
            type: actionTypes.FETCH_USER_DATA_SUCCESS,
            userData: [{id: "1", userId: "some-Id"}],
            update: true          
         })).toEqual({
          userData: [{id: "1", userId: "some-Id"}],
          update: true  
        });
    });
});