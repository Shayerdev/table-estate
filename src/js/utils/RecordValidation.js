export const formValidation = (data) => {
    try {
        Object.entries(data).forEach(([key, value]) => {
            if (value.trim() === '') {
                throw new Error(`Field '${key}' is required`);
            }
        });
    }
    catch (e){
       throw e.message;
    }
}