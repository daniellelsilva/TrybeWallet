// Esse reducer será responsável por tratar as informações da pessoa usuária

// USER_LOGIN

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_LOGIN':
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
