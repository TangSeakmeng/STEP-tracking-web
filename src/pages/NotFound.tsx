import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../assets/lottie/42479-page-not-found-404.json';

const NotFoundPage = (props: any) => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="notFoundPageContainer">
      <Lottie options={defaultOptions} />
    </div>
  );

}

export default NotFoundPage;