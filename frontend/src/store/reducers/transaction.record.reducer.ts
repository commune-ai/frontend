import { SAVE_TRANSACTION_SUCCESS, SAVE_TRANSACTION_FAILED, SAVE_METAMASK_SUCCESS } from "../action/type";

const initialState = {
    records: {},
    loading: false,
    error: '',
    address: ''
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
        default:
            return state
    }

}

export default transactionReducer
