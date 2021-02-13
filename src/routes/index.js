const { Router } = require("express");
const router = Router();

const sql = require("mssql");

// config for your database
const config = {
  user: "sqladmin",
  password: "Pa$$w0rd2021",
  server: "devutec2021.database.windows.net",
  database: "DBA_ACHITECT",
};

router.get("/actualizar-producto/:id", (req, res) => {
  console.log(req.params.id);

  res.render("update", {
    id: req.params.id,
    nombre: "camisa",
    precio: 30,
    existencias: 20,
  });
});

router.get("/", (req, res) => {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("select * from mproductos", function (err, recordset) {
      if (err) console.log(err);

      // send records as a response
      //   res.send(recordset);
      res.render("index", {
        contacts: [
          { id: 1, nombre: "camisa", precio: 30, existencias: 20 },
          { id: 2, nombre: "pantalon", precio: 40, existencias: 20 },
        ],
      });
    });
  });
});

router.post("/create", (req, res) => {
  const data = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    existencias: req.body.existencias,
  };
  console.log(data);
  //   db.ref("contacts").push(newContact);
  //   res.redirect("/");
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query(
      `insert into mproductos values ('${data.nombre}',${data.precio}, ${data.existencias})`,
      function (err, recordset) {
        if (err) console.log(err);

        // send records as a response
        //   res.send(recordset);
        res.redirect("/");
      }
    );
  });
});

router.delete("/delete/:id", (req, res) => {
  //   db.ref("contacts/" + req.params.id).remove();
  res.redirect("/");
});

router.get("/update/:id", (req, res) => {
  const data = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    existencias: req.body.existencias,
  };
  console.log(data);
  console.log(`Actualizando ${req.params.id}`);
  res.redirect("/");
});

module.exports = router;
