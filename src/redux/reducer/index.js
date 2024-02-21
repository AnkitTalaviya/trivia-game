import { combineReducers } from "redux";
import questionsList from "./questionsList/getQuestionsList";

const rootReducer = combineReducers({
  questionsList,
});

export default rootReducer;
