
const INITIAL_STATE = {
    languageCode: 'en',

}
export default (state = INITIAL_STATE, action) => {
    const action_str = action.type.replace('_FULFILLED', '')
    switch (action_str) {
        case 'LANGUAGE_CHANGED':
            //console.log('Language Changed.');
            //console.log(action.payload);
            return Object.assign({}, state, { languageCode: action.payload });
        case 'LOGOUT_PRESSED':
            return Object.assign({}, state, { isLoginPressed: action.payload.isButtonPressed });
        case 'SET_LOGOUT_STATE':
            return Object.assign({}, state, { isLoginPressed: action.payload.status });
        default:
            return state
    }
}