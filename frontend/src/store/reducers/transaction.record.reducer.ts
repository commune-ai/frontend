import { SAVE_TRANSACTION_SUCCESS, SAVE_TRANSACTION_FAILED, SAVE_METAMASK_SUCCESS, LOGIN_SUCCESS, LOGIN_FAILED } from "../action/type";

const initialState = {
    records: {},
    loading: false,
    error: '',
    address: '',
    loginStatus: false
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
        default:
            return state
    }

}

export default transactionReducer
