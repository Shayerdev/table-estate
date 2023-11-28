export const getRecords = async () => {
    const requestRecords = await fetch('http://localhost:3004/records');
    return await requestRecords.json();
}

export const addRecord = async (record) => {
    const {id, ...filterRecord} = record;
    const requestRecords = await fetch('http://localhost:3004/records', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: Math.floor(new Date().getTime() / 1000),
            ...filterRecord
        })
    });
    return await requestRecords.json();
}

export const remRecord = async (id) => {
    const requestRecords = await fetch(`http://localhost:3004/records/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await requestRecords.json();
}

export const updRecords = async (records) => {
    const requestRecords = await fetch(`http://localhost:3004/records/${records.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(records)
    });
    return await requestRecords.json();
}

export const getCities = async () => {
    const requestRecords = await fetch('http://localhost:3004/city');
    return await requestRecords.json();
}

export const getTypes = async () => {
    const requestRecords = await fetch('http://localhost:3004/types');
    return await requestRecords.json();
}
