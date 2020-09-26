const matrixFullName = (matrix) =>
   `${matrix.matrix_name}(${matrix.matrix_size})-${matrix.matrix_number}`;

const secondsToTime = (secondsToConvert) => {
   const allSeconds = parseInt(secondsToConvert, 10);
   const tempMinutes = Math.floor((allSeconds % 3600) / 60);
   const tempSeconds = Math.floor(allSeconds % 60);
   return {
      minutes: tempMinutes,
      seconds: tempSeconds,
      string: `${tempMinutes.toString().padStart(2, "0")}:${tempSeconds
         .toString()
         .padStart(2, "0")}`,
   };
};

export { matrixFullName, secondsToTime };
