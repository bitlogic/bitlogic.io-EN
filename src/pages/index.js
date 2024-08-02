import * as React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./../components/HomePage/HomeContainer/HomeContainer"
import "../styles/typography.css";
import PropTypes from "prop-types"

const IndexPage = ({location}) => <Home location={location} />

IndexPage.propTypes = {
    location: PropTypes.object.isRequired
}

export default IndexPage
