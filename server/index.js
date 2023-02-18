const express = require("express");
const cors = require("cors");
const {connection}  =require("./config/db");
const userController = require("./routes/users.routes");
require("dotenv").config();

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(cors());


app.use("/users", userController);

app.get("/", (req, res) => {
	res.send('RUNNING SUCCESSFULLY');
});


app.listen(PORT, async () => {
	try {
		await connection
		console.log('Connection made')
	} catch (error) {
		console.log('connection refused',error)
	}
	console.log(`Listening at http://localhost:${PORT}`);
});
