export function heheReducer(state: { hehe: String }, action: { type: String }) {
    switch (action.type) {
        case "clickhehe":
            return { hehe: "click_hehe" };
        default:
            return state === undefined ? [] : state
    }
}