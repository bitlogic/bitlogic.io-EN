import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ContactData from "./ContactData/contactData"
import Location from './Location/location';
import SocialLinks from "./SocialLinks/socialLinks"
import Navegation from './Navegation/navegation';
import Subscription from './Subscription/subscription';
import "./Footer.scss"
import { useFooter } from "../../hooks"


const Footer = () => {
  const data = useFooter()?.allStrapiLayout?.nodes[0]
  return (
    <>
      <div className="Footer">
        <Container fluid className="Footer__Container">
          <Row className="Footer__Row ps-xl-5">
            <Col
              xs={6}
              md={3}
              lg={4}
              xl={3}
              className="Footer__Col Footer__Col__Navegation"
            >
              <div className="Footer__Title">
                <Navegation
                  navegation={data?.footer?.navegation}
                  navbarItem={data?.navbar?.navbarItem}
                />
              </div>
            </Col>

            <Col
              xs={6}
              md={4}
              lg={4}
              xl={3}
              className="Footer__Col Footer__Col__Contact"
            >
              <div className="Footer__Title">
                <ContactData
                  contact={data?.footer?.contact}
                  navButton={data?.navbar?.navButton}
                  internalLink={data?.footer?.internalLink}
                />
              </div>
            </Col>

            <Col
              xs={6}
              md={4}
              lg={4}
              xl={3}
              className="Footer__Col Footer__Col__Contact d-none d-xl-block"
            >
              <div className="Footer__Title ps-xl-3">
                <Location location={data?.footer?.location} />
              </div>
            </Col>

            <Col
              xs={12}
              md={5}
              lg={4}
              xl={3}
              className="Footer__Col Footer__Col__Navegation"
            >
              <div className="Footer__Title">
                <Subscription subscription={data?.footer?.subscription} />
              </div>
            </Col>

            <Col
              xs={12}
              md={12}
              lg={12}
              className="Footer__Col Footer__Col__Social"
            >
              <div className="Footer__Title">

                <SocialLinks
                  logo={data?.footer?.logo}
                  socialMedia={data?.footer?.socialMedia?.socialMedia}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
export default Footer
