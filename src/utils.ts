
const defaultPortNumber = 3000;

export function getBaseUrl() {

    if (process.env.PORT_NUMBER) {
        const portNumber = parseInt(process.env.PORT_NUMBER);

        return `http://backend:${portNumber}`;

    } else if (process.env.BACKEND_URL) {
        return `http://${process.env.BACKEND_URL}`;

    }
    return `http://localhost:${defaultPortNumber}`;
}
