const apiURL = "http://as2877.ddns.net:5984/matrix";

const getFromAPI = async (parURL, callbackFunction) => {
   const response = await fetch(parURL);
   if (!response.ok) {
      console.log("Абзац...", response);
   }

   const result = await response.json();

   callbackFunction(result.rows);
};

const getMatrices = (callbackFunction) => {
   getFromAPI(`${apiURL}/_design/matrices/_view/active_matrices`, callbackFunction);
};

const getBakingJournal = (callbackFunction) => {
   const startDate = "2020-09-15";
   const endDate = "2020-09-16";
   getFromAPI(
      `${apiURL}/_design/bakingJournal/_view/bakingJournal?include_docs=true&inclusive_end=false&start_key="${startDate}"&end_key="${endDate}"`,
      callbackFunction
   );
};

const getLastSuccessBaking = (matrixID, callbackFunction) => {
   getFromAPI(
      `${apiURL}/_design/bakingJournal/_view/lastSuccessBaking?inclusive_end=true&start_key=["${matrixID}", {}]&end_key=["${matrixID}"]&limit=1&descending=true`,
      callbackFunction
   );
};

const addNewBaking = async (matrix, bakingSeconds) => {
   // eslint-disable-next-line no-underscore-dangle
   const response1 = await fetch(`${apiURL}/${matrix._id}`);
   if (!response1.ok) {
      console.log("Абзац...", response1);
   }

   console.log(await response1.json());

   const response = await fetch(apiURL, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
         dateTime: "2020-09-15T18:35",
         matrix,
         success: "???",
         bakingTimes: [{ pass: 1, durationInSeconds: bakingSeconds }],
      }),
   });
   if (!response.ok) {
      console.log("Абзац...", response);
   }

   const result = await response.json();
   console.log(result);
};

const setBakingSuccess = async (bakingID, success) => {
   console.log(`${bakingID} ${success}`);
};

export { getMatrices, getBakingJournal, getLastSuccessBaking, addNewBaking, setBakingSuccess };
