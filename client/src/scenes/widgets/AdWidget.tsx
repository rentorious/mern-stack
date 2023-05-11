import React from "react";

import { Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { selectState } from "../../state";

const AdWidget = () => {
  const { palette } = useTheme();
  const dark = palette.secondary.dark;
  const main = palette.secondary.main;
  const medium = palette.secondary.contrastText;

  const { baseUrl } = useSelector(selectState);

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://dvvyme64phkx2.cloudfront.net/pexels-shiny-diamond-3373738.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;
