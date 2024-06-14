import express from 'express'
import router from './routes/router.js'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use('/', router);

// * Отлавливаем ошибки на запуске
try {
	app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT} PORT`));
} catch (e) {
	console.error(e);
}

// * Запускаем приложение