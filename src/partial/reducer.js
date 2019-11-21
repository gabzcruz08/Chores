const INITIAL_STATE = {
    language: 'en',
    isLoginPressed: false,
}
export default (state = INITIAL_STATE, action) => {
    const action_str = action.type.replace('_FULFILLED', '');
    switch (action_str) {
        case 'Language_Change':
            return {
                ...state,
                language: action.payload.languagecode
            }
        case 'LOGOUT_PRESSED':
            return {
                ...state,
                isLoginPressed: action.payload.isButtonPressed
            }
        case 'SET_LOGOUT_STATE':
            return Object.assign({}, state, { isLoginPressed: action.payload.status });
        default:
            return state
    }
}