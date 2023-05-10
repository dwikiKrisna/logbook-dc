import React from 'react'

const getLogbooks = async () => {
    const res = await fetch("http://localhost:3000/api/logbook", {
        next: { revalidate: 0 },
    });
    return res.json();
};

const ReportTable = async () => {
    const logbookData = await getLogbooks();

    const [logbooks] = await Promise.all([logbookData]);
    console.log(logbookData)

    return (
        <div>ReportTable</div>
    )
}

export default ReportTable