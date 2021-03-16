export const process = (encrypt, message, cypher) => {
    return {
        type: "PROCESS",
        payload: {
            encrypt,
            message,
            cypher
        },
    };
};