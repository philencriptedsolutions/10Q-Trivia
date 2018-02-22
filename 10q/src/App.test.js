

import { gameIsStarting, winnerList } from '../src/Components/Dashboard/Dashboard';
import { first_name } from '../src/Components/Login/Login';
import { userChoice, hidden } from '../src/Components/SubComponents/Answer/Answer';

import { changeToEndOfGame } from "./ducks/quizReducer";


it("gameIsStarting initial value is set to false", () => {
  expect(gameIsStarting).toBeFalsy();
});

it('winnerList initial value is set to false', () => {
  expect(winnerList).toBeFalsy();
})

it("first name set to first name ", () => {
  expect(first_name).toBe(first_name);
});

it('userChoice initial value is set to false', () => {
  expect(userChoice).toBeFalsy();
})

it('hidden initial value is set to false', () => {
  expect(hidden).toBeFalsy();
})




