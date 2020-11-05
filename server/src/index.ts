import * as mongoose from 'mongoose';

const databaseURL = process.env.MONGODB_URI || 'mongodb://localhost/canadian-well';

async function run() {
    try {
        await mongoose.connect(databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Connected to database at ${databaseURL}`);
    let scriptName = process.argv.length === 3 ? process.argv[2] : 'serve';
    try {
        let script = await import(`./scripts/${scriptName}`)
        script.default();
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
}

run();
