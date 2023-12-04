const express = require('express')
 
const app = express();
const port = process.env.port || 3000;

app.get('/', async (req, res) => {
    // const body = req.body;

    res.send('completed');
});



app.listen(port, () => console.log(`App listening on port ${port}!`));














// // "use strict";
// // import { CreateEntities } from "./Functions/CreateEntities.js";
// // import { CreateJson_Structure } from "./Functions/CreateJsonStructure.js";
// // import { CreateImport_Mapping } from "./Functions/CreateImport_Mapping.js";

// // import { ApplicationName } from "./Utilities/Index.js";

// // async function main() {
// //   const app = ApplicationName();
// //   const workingCopy = await app.createTemporaryWorkingCopy("main");
// //   const modules = await workingCopy.openModel();
// //   const model = modules.allModules().filter((dm) => dm.name === "SDKModule")[0];
// //   const moduleName = "SDKModule";

// //   const domainModelInterface = modules
// //     .allDomainModels()
// //     .filter((dm) => dm.containerAsModule.name === moduleName)[0];
// //   const domainModel = await domainModelInterface.load();


// //   const jsonData1 = {
// //     ToDoList: [{ Task: "Send email" }],
// //   };


// //   CreateEntities(jsonData1, modules, moduleName, domainModel);
// //   await modules.flushChanges();
// //   await workingCopy.commitToRepository("main");
// //   let Json_Structure = CreateJson_Structure(jsonData1, model, modules);
// //   CreateImport_Mapping(model, modules, jsonData1, moduleName, Json_Structure);










// // await modules.flushChanges();
// // await workingCopy.commitToRepository("main");
// // }
// // main().catch(console.error);



















// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";

// const app = express();
// const port = process.env.port || 3000;

// import { CreateEntities } from "../Functions/CreateEntities.js";
// import { CreateJson_Structure } from "../Functions/CreateJsonStructure.js";
// import { CreateImport_Mapping } from "../Functions/CreateImport_Mapping.js";

// import { ApplicationName } from "../Utilities/Index.js";

// app.use(cors());

// // Configuring body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/create', async (req, res) => {
//     const body = req.body;
//     console.log(body)

//     const app = ApplicationName();
//     const workingCopy = await app.createTemporaryWorkingCopy("main");
//     const modules = await workingCopy.openModel();
//     const model = modules.allModules().filter((dm) => dm.name === "SDKModule")[0];
//     const jsonData1 = {
//         ToDoList: [{ Task: "Send email" }],
//     };
//     const moduleName = "SDKModule";
//     const domainModelInterface = modules
//         .allDomainModels()
//         .filter((dm) => dm.containerAsModule.name === moduleName)[0];
//     const domainModel = await domainModelInterface.load();
//     CreateEntities(jsonData1, modules, moduleName, domainModel);
//     await modules.flushChanges();
//     await workingCopy.commitToRepository("main");
//     let Json_Structure = CreateJson_Structure(jsonData1, model, modules);
//     CreateImport_Mapping(model, modules, jsonData1, moduleName, Json_Structure);
//     await modules.flushChanges();
// });



// app.listen(port, () => console.log(`App listening on port ${port}!`));
