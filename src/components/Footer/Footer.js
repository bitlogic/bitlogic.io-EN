import React from "react"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import ContactData from "./ContactData/contactData"
import Location from './Location/location';
import SocialLinks from "./SocialLinks/socialLinks"
import Navegation from './Navegation/navegation';
import Subscription from './Subscription/subscription';
import Sites from './Sites/Sites'
import "./Footer.scss"
import { useFooter } from "../../hooks";


const Footer = () => {
  const data = useFooter()?.allStrapiLayout?.nodes[0]

  return (
    <div className="Footer">
      <Container fluid className="Footer__Container">
        <Col>
          <div className="Footer__Row">
            <div className="Footer__Title Footer__Col Footer__Col__Navegation">
              <Navegation
                navegation={data?.footer?.navegation}
                navbarItem={data?.navbar?.navbarItem}
              />
            </div>

            <div className="Footer__Title Footer__Col Footer__Col__Contact">
              <ContactData
                contact={data?.footer?.contact}
                navButton={data?.navbar?.navButton}
                internalLink={data?.footer?.internalLink}
              />
            </div>

            <div className="Footer__Title Footer__Col Footer__Col__Contact">
              <Location location={data?.footer?.location} />
            </div>

            <div className="Footer__Col">
              <Sites sitesData={data?.Sites} />
            </div>

            <div className="Footer__Title Footer__Col Footer__Col__Subscription">
              <Subscription subscription={data?.footer?.subscription} />
            </div>
          </div>
        </Col>

        <Col
          xs={12}
          md={12}
          lg={12}
          className="Footer__Col Footer__Col__Social"
        >
          <div className="Footer__Title">
            <SocialLinks logo={data?.footer?.logo}
              socialMedia={data?.footer?.socialMedia?.socialMedia}
            />
          </div>
        </Col>
      </Container>
    </div>
  )
}
export default Footer
