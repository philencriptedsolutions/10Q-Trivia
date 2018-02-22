import * as quizReducer from "./ducks/quizReducer";

// Josh 

describe('changeToWrong functions as expected', function() {
  test('should create an action', function() {
    expect( quizReducer.changeToWrong() ).toBeTruthy();
  });
  
  test('should create an action that sets wrong to true', function() {
    const expectedAction = {
      type: 'CHANGE_WRONG',
      payload: true
    }
    expect( quizReducer.changeToWrong() ).toEqual( expectedAction );
  });

  test('should create an action that matches expected action', function() {
    const expectedAction = {
      type: 'CHANGE_WRONG',
      payload: true
    }
    expect( quizReducer.changeToWrong() ).toEqual( expectedAction );
  });

  test('should create an action that matches type', function() {
    const expectedType = { type: 'CHANGE_WRONG' }
    expect( quizReducer.changeToWrong() ).toMatchObject( expectedType );
  });

  test('should create an action that matches payload', function() {
    const expectedPayload = {payload: true}
    expect( quizReducer.changeToWrong() ).toMatchObject( expectedPayload );
  });

});
