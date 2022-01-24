const RouteString =(tbl,fld)=>{
	function titleCase(str) {
		return str
			.split(' ')
			.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}


	const clearHandler = (str) => {
        var x1 = str.replace(/`/g, "");
        return x1;
    }

    let clsFld = clearHandler(fld);

    let splitFld = clsFld.split(',');


	let str = "";

	str = str + 'const express = require("express");\n';
	str = str + 'const router = express.Router();\n';
	str = str + 'const ' + titleCase(tbl) + 'Model = require("../models/' + titleCase(tbl) + 'Model");\n';
	str = str + '// const fs = require("fs");\n';

	str = str + '\n';	
	str = str + '\n';
	str = str + '//-----------------  SAVE  -----------------------------\n';
	str = str + 'router.post("/save", (req, res) => {\n';	
	str = str + '// fs.appendFile("src/backup/'+tbl+'_doc_url.txt", "\\n" + req.body.picurl + ",", (err)=>{console.log(err)});\n';
	str = str + 'const New'+ titleCase(tbl) +'Model = new '+ titleCase(tbl) +'Model(req.body);\n';
	str = str + 'New'+ titleCase(tbl) +'Model.save((err, '+ tbl +') => {\n';
	str = str + 'if(err){\n';
	str = str + 'res.json({ msg: "'+ titleCase(tbl) +' saving error!" });\n';
	str = str + '}else{\n';
	str = str + 'res.json({ msg: "'+ titleCase(tbl) +' saved successfully; Saved id: " + '+ tbl +'._id });\n';
	str = str + '}\n';
	str = str + '});\n';
	str = str + '});\n';
	
	str = str + '\n';
	str = str + '\n';

	str = str + '//-----------------  EDIT -----------------------------\n';
	str = str + 'router.get("/edit/:id", (req, res) => {\n';
	str = str + titleCase(tbl) +'Model.findOne({_id: req.params.id},\n';
	str = str + '(err, '+ tbl +'Data) => {\n';
	str = str + 'if(err){\n';
	str = str + 'res.json({ msg: "No data found!" });\n';
	str = str + '}else{\n';
	str = str + 'res.json('+ tbl +'Data);\n';
	str = str + '}\n';
	str = str + '});\n';
	str = str + '});\n';
	
	str = str + '\n';
	str = str + '\n';

	str = str + '//-----------------  UPDATE -----------------------------\n';
	str = str + 'router.post("/update/:id", (req, res) => {\n';
	str = str + '// imageUrl.save_url(req.body.picurl);\n';
	str = str + titleCase(tbl) +'Model.findOneAndUpdate({_id: req.params.id},\n';
	str = str + '{$set: req.body},\n';
	str = str + '(err) =>{\n';
	str = str + 'if(err){\n';
	str = str + 'res.json({ msg: "'+ titleCase(tbl) +' updating error!" });\n';
	str = str + '}else{\n';
	str = str + 'res.json({ msg: "'+ titleCase(tbl) +' updated successfully" });\n';
	str = str + '}\n';
	str = str + '});\n';
	str = str + '});\n';
	
	str = str + '\n';
	str = str + '\n';


	str = str + '//-----------------  DELETE -----------------------------\n';
	str = str + 'router.delete("/delete/:id", (req, res) => {\n';   
	str = str + titleCase(tbl) +'Model.findOneAndDelete({_id: req.params.id},\n';
	str = str + '(err) => {\n';
	str = str + 'if (err) {\n';
	str = str + 'res.json({ msg: "'+ titleCase(tbl) +' deleting error!" });\n';
	str = str + '} else {\n';
	str = str + 'res.json({ msg: "'+ titleCase(tbl) +' deleted successfully" });\n';
	str = str + '}\n';
	str = str + '});\n';
	str = str + '});\n';
	
	str = str + '\n';
	str = str + '\n';


	str = str + '//-----------------  LIST/SHOW  ALL -----------------------------\n';

	str = str + 'router.get("/", (req, res) => {\n';
	str = str + 'let result = '+ titleCase(tbl) +'Model.find({}).sort({ _id: -1 });\n';
	str = str + 'result.exec((err, data) => {\n';
	str = str + 'if (err) {\n';
	str = str + 'res.send(err);\n';
	str = str + '} else {\n';
	str = str + 'let obj = [];\n';
	str = str + 'for (let i = 0; i < data.length; i++) {\n';
	str = str + 'obj.push({\n';
	let x = "";
    let i = 0;
	x = x + '_id: data[i]._id,\n';
    for (i = 0; i < splitFld.length - 1; i++) {
        x = x + splitFld[i].trim() + ': data[i].'+ splitFld[i].trim() +',\n';
    }
    x = x + (splitFld[(splitFld.length - 1)]).trim() + ': data[i].'+ splitFld[i].trim() + '\n';
    str = str + x;
	str = str + '});\n';
	str = str + '}\n';
	str = str + 'res.send(obj);\n';
	str = str + '}\n';
	str = str + '})\n';
	str = str + '});\n';


	str = str + '\n';
	str = str + '\n';

	str = str + '//-----------------  VIEW -----------------------------\n';
	str = str + 'router.get("/view/:id", (req, res) => {\n';
	str = str + 'let result = '+ titleCase(tbl) +'Model.findOne({_id: req.params.id});\n';
	str = str + 'result.exec((err, view) => {\n';
	str = str + 'if (err) {\n';
	str = str + 'res.send(err);\n';
	str = str + '} else {\n';
	str = str + 'res.send(view);\n';
	str = str + '}\n';
	str = str + '})\n';
	str = str + '});\n';


	str = str + '\n';
	str = str + '\n';


	
	str = str + '//-----------------  DROP DOWN -----------------------------\n';
	str = str + 'router.get("/dropdown", (req, res) => {\n';
	str = str + titleCase(tbl) +'Model.find({}, (err, ' + tbl + ')=>{\n';
	str = str + 'if(err){\n';
	str = str + 'res.send(err);\n';
	str = str + '}else{\n';
	str = str + 'if (' + tbl + '){\n';
	str = str + 'res.json(' + tbl + ');\n';
	str = str + '}else{\n';
	str = str + 'res.json({ msg: "No data found!" });\n';
	str = str + '}\n';
	str = str + '}\n';
	str = str + '}).sort({name: 1});\n';
	str = str + '});\n';
	
	str = str + '\n';
	str = str + '\n';

	str = str + 'module.exports = router;\n';

	return str;


}
export default RouteString;