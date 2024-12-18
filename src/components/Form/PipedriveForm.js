import React, { useState, useEffect } from "react"
import MarkdownView from "react-showdown"
import Lottie from 'react-lottie'
import "./Form.scss"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"

const PipedriveForm = ({ data }) => {
  const { title, content, form_url, image, animation } = data;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://webforms.pipedrive.com/f/loader';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
            <h1 className="title text-start">{title}</h1>
          )}
          {content && (
            <MarkdownView
              markdown={content}
              className="form__content text-start"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
          <div className="form__img text-center text-md-start">
            {image?.url ? (
              <img
                src={image?.url}
                alt={image.alternativeText
                  ? image.alternativeText
                  : `${title}`
                }
                width={290}
                height={290}
              />
            ) : (
              <>
                {animation && <Lottie options={{
                  ...defaultOptions,
                  animationData: animation,
                }}
                />}
              </>
            )}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="pipedriveWebForms form-wrapper" data-pd-webforms={form_url}>
            {loading && <div>Loading...</div>}
            <Helmet>
              <script async defer src="https://webforms.pipedrive.com/f/loader"></script>
            </Helmet>
          </div>
        </div>
      </div>
    </section>
  )
}

PipedriveForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    form_url: PropTypes.string.isRequired,
    animation: PropTypes.object,
    image: PropTypes.shape({
      url: PropTypes.string,
      alternativeText: PropTypes.string,
    })
  }).isRequired
}

export default PipedriveForm;