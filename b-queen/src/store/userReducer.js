const INICIAL_STATE = {
    userEmail: '',
    userLogged: 0,
    userLocal: '',
}

function userReducer(state = INICIAL_STATE, action) {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, userLogged: 1, userEmail: action.userEmail, userLocal: action.userLocal }
        case 'LOG_OUT':
            return { ...state, userLogged: 0, userEmail: '', userLocal: '' }
        default:
            return state;
    }
}

export default userReducer;