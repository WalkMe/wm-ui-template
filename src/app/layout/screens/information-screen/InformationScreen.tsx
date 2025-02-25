import React, { useRef, useEffect } from "react";
import useViewManager from "../../../hooks/useViewManager";

import {
  IInformationScreenData,
  InformationScreenType,
} from "../../../interfaces/information-screen/informationScreen.interface";

const DEFAULT_ERROR = "Something is wrong, please try again";

export default function InformationScreen(props: IInformationScreenData) {
  const { type, error } = props;
  const loading = useRef(null);
  const noConnection = useRef(null);
  const isLoading = type === InformationScreenType.Loading;
  const isNoConnection = type === InformationScreenType.NoConnection;
  const { animateCoreElements } = useViewManager();

  useEffect(() => {
    if (isLoading) {
      animateCoreElements({
        elements: [loading.current],
        animateClassName: "fadeInUp",
        timeout: 300,
      });
    } else if (isNoConnection) {
      animateCoreElements({
        elements: [noConnection.current],
        animateClassName: "fadeInUp",
        timeout: 300,
      });
    }
  }, [type]);

  if (type === InformationScreenType.Error) {
    if (error) {
      console.error(error);
    } else {
      console.error(DEFAULT_ERROR);
    }
  }

  return (
    <div className="information-screen">
      {isLoading && (
        <div ref={loading} className="screen info loading">
          <div className="preloader"></div>
          <span>Loading</span>
        </div>
      )}
      {isNoConnection && (
        <div ref={noConnection} className="screen info no-connection">
          <svg
            viewBox="0 0 88 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58.9002 56H70.4002C79.0002 56 86.0002 49.1 86.0002 40.5C86.0002 33.1 80.9002 27 74.0002 25.4L74.2002 25.5L74.0002 25.4C74.0002 25.3 74.0002 25.2 74.0002 25.1C74.0002 17.6 67.9002 11.6 60.5002 11.6C58.5002 11.6 56.7002 12 55.0002 12.8L54.7002 12.3L55.0002 12.8C51.7002 6.3 44.9002 1.9 37.2002 1.9C26.1002 1.9 17.1002 10.9 17.1002 22C17.1002 23 17.2002 24 17.3002 24.9L17.2002 25C8.6002 25 1.7002 31.9 1.7002 40.5C1.7002 49.1 8.6002 56 17.2002 56H29.0002"
              strokeWidth="3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M36.2998 48.3L51.5998 63.6"
              strokeWidth="3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M51.4996 48.5L36.0996 63.8"
              strokeWidth="3"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="title">
            WalkMe can’t load due to internet connection
          </span>
          {}
          <span>
            {error ||
              "Check your connection and try again or contact your IT department"}
          </span>
        </div>
      )}
    </div>
  );
}
