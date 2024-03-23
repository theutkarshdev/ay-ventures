export function getCurrentDateInFormat() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }


  export function mailFiringDate(days) {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000); // Subtract days in milliseconds
  
    const year = previousDate.getFullYear();
    const month = String(previousDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(previousDate.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  

