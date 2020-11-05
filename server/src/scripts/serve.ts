import listen from '../app';

const httpPort    = process.env.PORT ? parseInt(process.env.PORT) : 3001;

export default async () => {
    try {
        await listen(httpPort);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Listening on port ${httpPort}...`);
}
