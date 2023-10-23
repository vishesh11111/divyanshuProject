import { intialString } from "./action";
const checkuser = localStorage.getItem("user");


const init = {
    authcheck: checkuser ? false : true,
    cartLength: 0,
}

export const reducer = (state = init, payload) => {
    console.log("===========>>>>>>", payload);
    switch (payload.type) {
        // case (intialString.authcheck):
        //     return { ...state, authcheck: presentuser ? false : true }
        case (intialString.cartLength):
            return { ...state, cartLength: payload?.payload }
        default:
            return state;
    }
} 