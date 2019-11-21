const INITIAL_ROUTE = {
    languageCode: 'en'
}
export default (state = INITIAL_ROUTE, action) => {
    var action_str = action.type.replace('_FULFILLED', '');
    switch (action_str) {
        case 'LANGUAGE_CHANGED':
            return Object.assign({}, state, { languageCode: action.payload });
        default:
            return state
    }
}