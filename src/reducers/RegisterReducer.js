export const initialState = {
  username: "",
  password: "",
  password2: "",
  email: "",
  phone: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_PASSWORD2":
      return { ...state, password2: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PHONE":
      return { ...state, phone: action.payload };
    default:
      return state;
  }
};
