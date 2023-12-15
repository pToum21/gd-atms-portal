module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      const formattedDate = new Date(date).toLocaleDateString();
      return formattedDate;
    },
  
    equal: (x, y) => {
      return x === y;
    },
  
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    // The custom helper 'format_date' takes in a timestamp
    format_date: (date) => {
      // Using JavaScript Date methods, we get and format the month, date, and year
      // We need to add one to the month since it is returned as a zero-based value
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
        // We add five years to the 'year' value to calculate the end date
        new Date(date).getFullYear()
        }`;
    },
  
  };