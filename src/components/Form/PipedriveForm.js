import React from "react"
import MarkdownView from "react-showdown"
import Lottie from 'react-lottie'
import "./Form.scss"
import { Helmet } from "react-helmet"

const PipedriveForm = ({ data }) => {
  const { title, content, form_url, image, animation } = data;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  }

  return (
    <section className="form">
      <div className="container d-flex px-lg-2 flex-wrap">
        <div className="col-12 col-md-6 pe-md-5">
          {title && (
            <h2 className="title text-start">{title}</h2>
          )}
          {content && (
            <MarkdownView
              markdown={content}
              className="form__content text-start"
            />
          )}
          <div className="form__img text-center text-md-start">
            {image?.url ?
              <img
                src={image?.url} alt="hero"
              /> :
              <>
                {animation && <Lottie options={{
                  ...defaultOptions,
                  animationData: animation,
                }}
                />}
              </>
            }
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div
            className="pipedriveWebForms form-wrapper"
            data-pd-webforms={form_url}
          >
            <Helmet>
              <script async defer src="https://webforms.pipedrive.com/f/loader"></script>
            </Helmet>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PipedriveForm;