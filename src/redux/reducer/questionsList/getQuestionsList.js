import {
  FETCH_GET_QUESTIONS_LIST_REQUEST,
  FETCH_GET_QUESTIONS_LIST_SUCCESS,
  FETCH_GET_QUESTIONS_LIST_FAILURE,
} from "../../types/getQuestionsList";

let initialState = {
  data: null,
  error: null,
  loading: false,
};

const questionsList = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GET_QUESTIONS_LIST_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case FETCH_GET_QUESTIONS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.data?.data,
        error: null,
      };
    case FETCH_GET_QUESTIONS_LIST_FAILURE:
      return {
        loading: false,
        data: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export default questionsList;
