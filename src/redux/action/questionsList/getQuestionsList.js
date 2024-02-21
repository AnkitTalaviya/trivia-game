import {
  FETCH_GET_QUESTIONS_LIST_REQUEST,
  FETCH_GET_QUESTIONS_LIST_SUCCESS,
  FETCH_GET_QUESTIONS_LIST_FAILURE,
} from "../../types/getQuestionsList";
import { getApi } from "../api";

export const fetchQuestionsListRequest = () => ({
  type: FETCH_GET_QUESTIONS_LIST_REQUEST,
});

export const fetchQuestionsListSuccess = (data) => ({
  type: FETCH_GET_QUESTIONS_LIST_SUCCESS,
  data,
});

export const fetchQuestionsListFailure = (error) => ({
  type: FETCH_GET_QUESTIONS_LIST_FAILURE,
  error,
});

export const fetchQuestionsList =
  (val = 10) =>
  (dispatch) => {
    dispatch(fetchQuestionsListRequest());
    return getApi(`?amount=${val}`)
      .then((data) => {
        dispatch(fetchQuestionsListSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(fetchQuestionsListFailure(error));
      });
  };
