import { connect } from "react-redux"
import Home from "../components/login"
export const mapStateToProps = (state: any) => {
    return {
        hehe: state.hehe
    }
}
export const mapAction = () => {
    return {
        clickhehe: {
            type: "clickhehe",
            hehe: "click_hehe"
        }
    }
}
export default connect(mapStateToProps, mapAction)(Home)