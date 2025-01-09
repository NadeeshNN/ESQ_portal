// const TEST_URL = `https://test.esqtruckapi.com.au/api/` //Test API
// const LIVE_URL = `https://test.esqtruckapi.com.au/api/` //LIVE API

const ENV = 1; // 0 = dev, 1 = test, 2 = live
const VERSION = "1.0.0";
const PAGE_SIZE = 10;
const API_URL = window.GlobalAppConfigs.API_URL_ESQ;

// if (ENV < 2) {
//   API_URL = TEST_URL
// } else {
//   API_URL = LIVE_URL
//   //   API_URL = config.API_URL;
// }

const COLOURS = [
  "#337AB7", //Primary Blue
  "#a5378b", //Secondary Purple
  "#E8E8E8", //Background grey
  "#c1c1c1", //Disabled
];

const HOVER_COLOR = "#c1c1c1";

export { API_URL, ENV, COLOURS, HOVER_COLOR, VERSION, PAGE_SIZE };
