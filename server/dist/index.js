import app from './app.js';
const port = process.env.PORT || 3001;
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});
//# sourceMappingURL=index.js.map