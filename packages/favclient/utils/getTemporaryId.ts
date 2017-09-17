let tempId = 0;

function getTemporaryId(): string {
    return '' + tempId++;
}

export default getTemporaryId;
