const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(
        date.getSeconds(),
    ).padStart(2, '0')}`;
    return `${formattedTime} ${formattedDate}`;
};

module.exports = formatTime;
