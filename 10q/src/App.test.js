import { changeToEndOfGame } from "./ducks/quizReducer";

it("returns stuff", () => {
  expect(changeToEndOfGame()).toBeTruthy();
});
