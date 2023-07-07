const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const pool = require("../config/db");

// get table_name from mastertable given table_id
const getTable = async (id) => {
  try {
    const data = await pool.query(
      `SELECT table_name FROM MasterTable WHERE table_id = ${id}`
    );
    if (!data.rows.length) {
      throw new Error("Table not found");
    }
    return data.rows[0].table_name;
  } catch (error) {
    throw new Error("Error retrieving table name");
  }
};

// upload excel data to database given parsed excel data in json format
exports.uploadxltodb = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const tablename = "createdAt" + Date.now();

  const columns = Object.keys(data[0]);
  const columndefination = columns
    .map((column) => `${column} VARCHAR(255)`)
    .join(",");
  const rows = data.map((obj) => Object.values(obj));
  const placeholders = columns.map((_, index) => `$${index + 1}`);

  await pool.query(
    `CREATE TABLE IF NOT EXISTS ${tablename}(id SERIAL PRIMARY KEY,${columndefination})`
  );

  for (let i in rows) {
    await pool.query(
      `INSERT INTO ${tablename} (${columns.join(
        ","
      )}) VALUES (${placeholders.join(",")})`,
      rows[i]
    );
  }

  await pool.query(
    `CREATE TABLE IF NOT EXISTS MasterTable(table_id SERIAL PRIMARY KEY,table_name VARCHAR (255))`
  );
  await pool.query(`INSERT INTO MasterTable (table_name) VALUES ($1) `, [
    tablename,
  ]);

  // created success
  res.status(200).json({
    success: true,
  });
});

//get masterdata
exports.masterdata = catchAsyncErrors(async (req, res) => {
  const data = await pool.query(`SELECT * FROM MasterTable`);
  res.status(200).json({ data: data.rows });
});

// get tabledata given tableid
exports.tabledata = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  const tablename = await getTable(id);
  const allData = await pool.query(`SELECT * FROM ${tablename}`);
  const tabledata = allData.rows;
  res.status(200).json({
    tabledata,
  });
});

// delete table given tableid
exports.deletetable = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  const tablename = await getTable(id);
  await pool.query(`DROP TABLE IF EXISTS ${tablename}`);
  await pool.query(`DELETE FROM MasterTable WHERE table_id = ${id}`);
  res.status(200).json({
    success: true,
  });
});

// add row given tableid,data
exports.addrow = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const columns = Object.keys(data).join(", ");
  const values = Object.values(data)
    .map((value) => `'${value}'`)
    .join(", ");
  const tablename = await getTable(id);
  const updated = await pool.query(
    `INSERT INTO ${tablename}(${columns}) VALUES (${values}) RETURNING *`
  );
  const result = updated.rows[0];
  res.status(200).json({
    success: true,
    result,
  });
});

// update row given tableid,rowid,data
exports.updaterow = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  const rowid = req.query.rowid;
  const tablename = await getTable(id);
  const data = req.body;
  const condition = `id = ${rowid}`;
  const clauses = Object.entries(data)
    .map(([column, value]) => `${column}='${value}'`)
    .join(", ");
  await pool.query(
    `UPDATE ${tablename} SET ${clauses} WHERE ${condition} RETURNING *`
  );
  const updated = await pool.query(`SELECT * FROM ${tablename}`);
  const result = updated.rows;
  res.status(200).json({
    success: true,
    result,
  });
});

// delete row given tableid, rowid
exports.deleterow = catchAsyncErrors(async (req, res) => {
  const id = req.params.id;
  const rowid = req.query.rowid;
  const tablename = await getTable(id);
  await pool.query(`DELETE FROM ${tablename} WHERE id=$1`, [rowid]);
  const tabledata = await pool.query(`SELECT * from ${tablename}`);
  const data = tabledata.rows;
  res.status(200).json({
    success: true,
    data,
  });
});
