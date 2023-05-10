const getDate = (IsoFormatDate) => {
    const utcDate = new Date(IsoFormatDate);
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const localDate = utcDate.toLocaleDateString('id-ID', options);

    return localDate;
}

const getTime = (IsoFormatDate) => {
    const utcDate = new Date(IsoFormatDate);
    const hours = utcDate.getHours();
    const minutes = utcDate.getMinutes();
    const formattedTime = hours + ':' + minutes;

    return formattedTime;
}

// input : "2023-05-10" and "16:27" output IsoFormatDateUTC : "2023-05-10T09:27:00.000Z"
const getIsoFormatDateUTC = (date, time) => {
    const utcDate = new Date(date + ' ' + time);
    const utcDateString = utcDate.toISOString();

    return utcDateString;
}


export { getDate, getTime, getIsoFormatDateUTC };