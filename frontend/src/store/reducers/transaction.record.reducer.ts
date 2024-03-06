import { SAVE_TRANSACTION_SUCCESS, SAVE_TRANSACTION_FAILED, SAVE_METAMASK_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILED, DARKTHEME_PROVIDER, LIGHTTHEME_PROVIDER } from "../action/type";

const initialState = {
    records: {},
    loading: false,
    error: '',
    address: '',
    loginStatus: false,
    currenttheme: ''
}

const transactionReducer = (state = initialState, action: any) => {

    const { type, payload } = action

    switch (type) {
        case SAVE_TRANSACTION_FAILED:
            return {
                ...state,
                error: payload
            }
        case SAVE_TRANSACTION_SUCCESS:
            return {
                ...state,
                records: payload
            }
        case SAVE_METAMASK_SUCCESS:
            return {
                ...state,
                address: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginStatus: true
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginStatus: false
            }
        case DARKTHEME_PROVIDER:
            return {
                ...state,
                currenttheme: 'dark'
            }
        case LIGHTTHEME_PROVIDER:
            return {
                ...state,
                currenttheme: 'light'
            }
        default:
            return state
    }

}

export default transactionReducer
