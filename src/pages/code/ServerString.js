const ServerString = () => {
    let str = "";
    str = str + 'const express = require("express");\n';
    str = str + 'const morgan = require("morgan");\n';
    str = str + 'const cors = require("cors");\n';
    str = str + 'const connectDB = require("./db");\n';
    str = str + '\n';
    str = str + '\n';
    str = str + '// mongodb connection\n';
    str = str + 'connectDB();\n';
    str = str + '\n';
    str = str + '\n';
    str = str + 'const app = express();\n';
    str = str + '\n';
    str = str + '\n';
    str = str + 'app.use(express.json()); // for parsing application/json\n';
    str = str + 'app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded\n';
    str = str + 'app.use(cors());\n';
    str = str + '// JSON PRITIFYE\n';
    str = str + 'app.set("json spaces", 2);\n';
    str = str + '// log request\n';
    str = str + 'app.use(morgan("tiny"));\n';

    str = str + '\n';
    str = str + '\n';

    str = str + 'app.use("/product",require("./router/ProductRoute.js"));\n';

    str = str + 'app.use("/land",require("./router/LandRouter.js"));\n';

    str = str + 'app.use((req,res)=>{\n';
    str = str + 'res.send({msg:"Page Not Found!"});\n';
    str = str + '});\n';

    str = str + '\n';
    str = str + '\n';
    str = str + 'app.listen(8080,()=>{\n';
    str = str + 'console.log("Server is running on: http://localhost:8080");\n';
    str = str + '});\n';

    return str;
}
export default ServerString;