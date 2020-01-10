export function charactor(state: any, action: any) {
    switch (action.type) {
        case '1'://店员
            return '1';
            break;
        case '2'://店员
            return '2';
            break;
        case '3'://店员
            return '3';
            break;
        default:
            return state === undefined ? "1" : state
    }
}
export function proviceRoleCode(state: any, action: any) {
    return state == undefined ? '1' : state
}