//Crete Record: use following code in case if payload doesn't have a file field
export async function createRecord(collection, payload) {
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create record");
        }

        response = await response.json();
        return response;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

//Crete Record: use following code in case if payload having a file field
export async function createMultipartRecord(collection, payload){
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`,
            {
                method: "POST",
                body: payload
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create record");
        }

        response = await response.json();
        return response;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export async function getRecord(collection) {
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch records");
        }

        response = await response.json();
        return response;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
//Crete Record: use following code in case if payload doesn't have a file field
export async function updateRecord(collection, id, payload) {
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create record");
        }

        response = await response.json();
        return response;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
//Crete Record: use following code in case if payload having a file field
export async function updateMultipartRecord(collection, id, payload) {
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${id}`,
            {
                method: "PUT",
                body: payload
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update record");
        }

        response = await response.json();
        return response;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
export async function deleteRecord(collection, id) {
    try {
        let response = await fetch(
            `${import.meta.env.VITE_APP_BACKEND_SERVER}/${collection}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete record");
        }

        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}