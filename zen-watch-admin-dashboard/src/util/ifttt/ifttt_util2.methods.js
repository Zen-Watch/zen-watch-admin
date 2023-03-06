const parseCommaSeparatedString = (str) => {
    const object = str.split(',').reduce((acc, curr) => {
        const [key, value] = curr.trim().split(':');
        acc[key] = value.trim();
        return acc;
    }, {});
    return object; //If required,  JSON.stringify(object, null, 2);
}