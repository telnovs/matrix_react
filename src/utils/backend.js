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
}

const getBakingJournal = (callbackFunction) => {
   const startDate = "2020-09-15";
   const endDate = "2020-09-16";
   getFromAPI(`${apiURL}/_design/bakingJournal/_view/bakingJournal?include_docs=true&inclusive_end=false&start_key="${startDate}"&end_key="${endDate}"`, callbackFunction);
} 

const getLastSuccessBaking = (matrix_id, callbackFunction) => {
   getFromAPI(`${apiURL}/_design/bakingJournal/_view/lastSuccessBaking?inclusive_end=true&start_key=["${matrix_id}", {}]&end_key=["${matrix_id}"]&limit=1&descending=true`, callbackFunction);
}

export { getMatrices, getBakingJournal, getLastSuccessBaking };
