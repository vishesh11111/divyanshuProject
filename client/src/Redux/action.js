
export let intialString = {
    cartLength: "cart",
    authcheck: "auth"
}

export const AuthCheckUser = (data) => {
    return {
        type: intialString.authcheck,
        payload: data
    }
}

export const CartLength = (data) => {
    console.log("___________(99999)---", data)
    return {
        type: intialString.cartLength,
        payload: data
    }
}