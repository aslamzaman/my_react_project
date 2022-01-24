const ModelString =(tbl,fld)=>{
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
    str = str + 'const mongoose = require("mongoose");\n';	

	str = str + '\n';	
	str = str + '\n';
    str = str + '// Table: '+ tbl+ '\n';
	str = str + '// Fields: ' + fld + '\n';
   
    str = str + '// '+ tbl +': { type: mongoose.Schema.Types.ObjectId, ref: "'+ titleCase(tbl) +'" }\n';
    str = str + '\n';	
	str = str + '\n';   
    str = str + '//-----------------  SCHEMA -----------------------------\n';
    str = str + 'const ' + titleCase(tbl) + 'Schema=new mongoose.Schema({\n';
    let x = "";
    let i = 0;
    for (i = 0; i < splitFld.length - 1; i++) {
        x = x + splitFld[i].trim() + ': {type: String},\n';
    }
    x = x + (splitFld[(splitFld.length - 1)]).trim() + ':{type: String}\n';
    str = str + x;
    str = str + '});\n';

	str = str + '\n';
    str = str + '\n';
    str = str + '//-----------------  MODEL -----------------------------\n';
    str = str + 'const ' + titleCase(tbl) + 'Model=mongoose.model("' + titleCase(tbl) + '", ' + titleCase(tbl) + 'Schema);\n';


	str = str + '\n';
	str = str + '\n';
	
	str = str + 'module.exports = ' + titleCase(tbl) + 'Model;\n';

	return str;


}
export default ModelString;