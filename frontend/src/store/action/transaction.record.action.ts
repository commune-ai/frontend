import { DELETE_ACCOUNT_FAILED, DELETE_ACCOUNT_SUCCESS, DONE, LOADING, SAVE_METAMASK_FAILED, SAVE_METAMASK_SUCCESS, SAVE_TRANSACTION_FAILED, UPDATE_METAMASK_FAILED, UPDATE_METAMASK_SUCCESS } from "./type";

const API_URL = 'http://127.0.0.1:8000'

export const saveTransaction = async (payType: string, amount: number, destinationAddress: string, txHash: string) => {
    const body = JSON.stringify(
        {
            payType,
            amount,
            destinationAddress,
            txHash,
        })

    try {

        // const token = window.localStorage.getItem('token');

        const res = await fetch(`${API_URL}/api/data-analysis/saveTransaction/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: body
        })

        const data = await res.json()

    }
    catch (e) {

        // dispatch({ type: SAVE_TRANSACTION_FAILED })
    }
}

export const saveMetaMaskAddress = (address: string) => async (dispatch: any) => {

    const body = JSON.stringify(
        {
            address
        }
    )

    dispatch({ type: LOADING })

    dispatch({ type: SAVE_METAMASK_SUCCESS, payload: address })

    try { // const token = window.localStorage.getItem('token');

        const res = await fetch(`${API_URL}/api/data-analysis/saveMetamask/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: body
        })

        const data = await res.json()

        if (data.res === 'success') {
            dispatch({ type: SAVE_METAMASK_SUCCESS, payload: address })
        }

        dispatch({ type: DONE })

    }
    catch (e) {

        dispatch({ type: SAVE_METAMASK_FAILED })
        dispatch({ type: DONE })

    }

}

export const updateWalletAddress = (oldWalletAddress: string, walletAddress: string) => async (dispatch: any) => {

    const body = JSON.stringify({
        oldWalletAddress,
        walletAddress
    })

    try { // const token = window.localStorage.getItem('token');

        const res = await fetch(`${API_URL}/api/data-analysis/saveNewWalletAddress/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: body
        })

        const data = await res.json()

        if (data.res === 'success') {
            dispatch({ type: UPDATE_METAMASK_SUCCESS })
        }

    }
    catch (e) {

        dispatch({ type: UPDATE_METAMASK_FAILED })
    }

}

export const deleteUserAccount = (address: string) => async (dispatch: any) => {

    const body = JSON.stringify(
        {
            address
        }
    )

    try {

        const res = await fetch(`${API_URL}/api/data-analysis/deleteAccount/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: body
        })

        const data = await res.json()

        if (data.res === 'success') {
            dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: address })
        }

    }
    catch (e) {

        dispatch({ type: DELETE_ACCOUNT_FAILED, payload: address })
    }

}