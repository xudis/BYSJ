export function charactor(state: any, action: any) {
    switch (action.type) {
        case '1'://店员
            return '1';
        case '2'://店员
            return '2';
        case '3'://店员
            return '3';
        default:
            return state === undefined ? "1" : state
    }
}
export function proviceRoleCode(state: any, action: any) {
    return state == undefined ? '1' : state
}