import { useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return {
        ...state,
        [action.id]: action.value,
      };
    case "INPUT_CHANGE_SELECT":
      return {
        ...state,
        [action.id]: action.value,
      };
    default:
      return state;
  }
};

const useForm = (initialValues) => {
  const [formState, dispatch] = useReducer(formReducer, initialValues);

  const inputHandler = (e) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: e.target.value,
      id: e.target.id,
    });
  };
  const inputSelectHandler = (e) => {
    dispatch({
      type: "INPUT_CHANGE_SELECT",
      value: e.target.innerText,
      id: "label",
    });
  };

  return { formState, inputHandler, inputSelectHandler };
};

export default useForm;