const app = require("./app");

app.get("/", (req, res) => {
	res.send("Hello server!");
});

app.listen(3000, () => {
	console.log("listening on port 3000...");
});
