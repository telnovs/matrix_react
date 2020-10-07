import { base64Encode } from "./helpers";

const apiURL = "http://as2877.ddns.net:5984/matrix";
const userName = "admin";
const password = "matrix-123";

const getFromAPI = async (parURL) => {
   const response = await fetch(`${apiURL}/${parURL}`, {
      method: "get",
      headers: {
         "Content-type": "application/json",
         Authorization: "Basic " + base64Encode(userName + ":" + password),
      },
   });
   if (!response.ok) {
      console.log("Абзац...", response);
   }

   return response.json();
};

const getMatrices = async (callbackFunction) => {
   const result = await getFromAPI(`/_design/matrices/_view/active_matrices`);
   callbackFunction(result.rows);
};

const getBakingJournal = async (callbackFunction) => {
   const startDate = "2020-09-15";
   const endDate = "2020-09-16";
   const result = await getFromAPI(
      `/_design/bakingJournal/_view/bakingJournal?include_docs=true&inclusive_end=false&start_key="${startDate}"&end_key="${endDate}"`
   );
   callbackFunction(result.rows);
};

const getLastSuccessBaking = async (matrixID, callbackFunction) => {
   const result = await getFromAPI(
      `/_design/bakingJournal/_view/lastSuccessBaking?inclusive_end=true&start_key=["${matrixID}", {}]&end_key=["${matrixID}"]&limit=1&descending=true`
   );
   callbackFunction(result.rows);
};

const addNewBaking = async (matrixID, startTime, bakingSeconds) => {
   // eslint-disable-next-line no-underscore-dangle
   const resultMatrix = await getFromAPI(`/${matrixID}`);

   const response = await fetch(apiURL, {
      method: "post",
      headers: {
         "Content-type": "application/json",
         Authorization: "Basic " + base64Encode(userName + ":" + password),
      },
      body: JSON.stringify({
         dateTime: `2020-09-15T${startTime}`,
         matrix: resultMatrix,
         success: "???",
         bakingTimes: [{ pass: 1, durationInSeconds: bakingSeconds }],
      }),
   });
   if (!response.ok) {
      console.log("Абзац...", response);
   }

   const result = await response.json();
};

const setBakingSuccess = async (bakingID, success) => {
   const resultBaking = await getFromAPI(`/${bakingID}`);

   resultBaking.success = success.toString();

   const response = await fetch(`${apiURL}/${bakingID}`, {
      method: "put",
      headers: {
         "Content-type": "application/json",
         Authorization: "Basic " + base64Encode(userName + ":" + password),
      },
      body: JSON.stringify(resultBaking),
   });
   if (!response.ok) {
      console.log("Абзац...", response);
   }

   const result = await response.json();
};

export { getMatrices, getBakingJournal, getLastSuccessBaking, addNewBaking, setBakingSuccess };
