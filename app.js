const express = require("express");
const accounts = require("./accounts");
const { json } = require("body-parser");
const app = express();

app.use(express.json());
app.get("/accounts", (req, res) => {
  res.status(200).json(accounts);
});
app.post("/accounts", (req, res) => {
  const id = accounts[accounts.length - 1].id + 1;
  const newAccount = {
    id: id,
    username: req.body.username,
    funds: 0,
  };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});
app.delete("/accounts/:accountId", (req, res) => {
  if (accounts.find((acc) => acc.id == req.params.accountId)) {
    accounts = accounts.filter((acc) => acc.id != req.params.accountId);
    res.status(201).json(accounts);
  } else {
    res.status(404).json("account not found");
  }
});
app.put("/accounts/:accountId", (req, res) => {
  if (accounts.find((acc) => acc.id == req.params.accountId)) {
    accounts = accounts.map((acc) =>
      acc.id == req.params.accountId ? req : acc
    );
    res.status(201).json(accounts);
  } else {
    res.status(404).json("account not found");
  }
});

app.listen(8000);
