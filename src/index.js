import app from './app';
import { PORT } from './config';
import connectDatabase from './services/MongoDb/connection';

(async () => {
    try {
        const { err: mongoConnectionErr } = await connectDatabase();
        if (mongoConnectionErr) throw new Error(mongoConnectionErr);

        app.get('/', (req, res) => {
            res.send('Hello, World!');
        });

        app.use((req, res) =>
            res.status(404).json({
                message: `${req.protocol}://${req.get('host')}${req.originalUrl}: not a Valid Path!`,
            })
        );

        app.use((error, req, res) => {
            const errorMessage = error?.message || 'Something went wrong!';
            logger.error(errorMessage, { error, data: { status: 500, req } });
            return res.status(500).json({ message: errorMessage });
        });

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server Error', error?.message);
        process.exit(1);
    }

})();


