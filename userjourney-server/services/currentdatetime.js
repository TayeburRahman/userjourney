
exports.currentDateTime = (req,res) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentDate = new Date();
    const previousDate = new Date('August 25, 2023');
 

    const day = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const currentMonthName = monthNames[month];
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHoursSig = hours % 12 === 0 ? 12 : hours % 12;
    const formattedHours = formattedHoursSig < 10 ? '0' + formattedHoursSig : formattedHoursSig
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const currentTimeS = `${formattedHours}:${formattedMinutes}${period}`
    const currentDateS = `${currentMonthName} ${day}, ${year}`

    const dateTime = `${currentDateS}-${currentTimeS}` 

    const timeDifference = currentDate - previousDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));



    return { currentDateS, dateTime, currentTimeS, daysDifference};
};
