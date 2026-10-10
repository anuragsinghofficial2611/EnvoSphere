import app from './app.js';
import connectDB from './config/database.js';

connectDB();
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log('server is live at port ',PORT);
})