import { connect } from 'react-redux'
import Message from '../component/message'
import { actions } from "../store/combine"

const mapStateToProps = (state: { charactor: any, proviceRoleCode: any }) => {
    return ({
        charactor: state.charactor,
        proviceRoleCode: state.proviceRoleCode
    })
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        changeCharactor: (type: any) => dispatch(actions.changeCharactor(type))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Message)
