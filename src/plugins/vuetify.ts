import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const myCustomLightTheme = {
  dark: false,
  colors: {
    primary: "#FE0000",
    blue: "#06177A",
    orange: "#F65901",
    green: "#0CAE13",
    lime: "#CFBB03",
    wine: "#AE0C0C",
    brown: "#AE6D0C",
    yellow: "#FEF9C3",
    "purple-200": "#AE0C6D",
    "blue-200": "#0C6AAE",
    "green-200": "#0CAEA5",
  },
};

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },

  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
});

export default vuetify;
