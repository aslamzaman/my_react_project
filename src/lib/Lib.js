
module.exports.price = {
	brick: 10.0,
	cement: 450.0,
	sand: 20.0,
	khoa: 85.0,
	rod: 60.0,
	paint: 1200.0,
	tiles: 80.0,
	flatbar: 55.0,
	anglebar: 65.0,
	mason: 450.0,
	labour: 300.0
};

module.exports.dateFormat = (dt, format) => {
	// *** date_format:("2010-06-25",".")      result= 25.06.2010
	var d = new Date(dt);
	var days_array = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "22", "24", "25", "26", "27", "28", "29", "30", "31"];
	var months_array = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var dot_date = "";
	if (format === "-") {
		dot_date = d.getFullYear() + "-" + months_array[d.getMonth()] + "-" + days_array[d.getDate()];
		return dot_date;
	} else {
		dot_date = days_array[d.getDate()] + "." + months_array[d.getMonth()] + "." + d.getFullYear();
		return dot_date;
	}
};



module.exports.yearsMontshDays = (d1, d2) => {
	let a = new Date(d1).getTime();
	let b = new Date(d2).getTime();
	let days = (b - a) / 86400000; // days

	let y = Math.floor(days / 365); // yrs
	let yrsToDays = days % 365; // days

	let m = Math.floor(yrsToDays / 30); // months
	let d = yrsToDays % 30; // days

	let ret = y + "yrs. " + m + "months " + d + "days";
	return ret;
};

module.exports.last_day_in_month = (yyyy, m) => {
	// example (2021, 0) = 31 ; (2021, 1) = 28;
	let dt = new Date(yyyy, (parseInt(m) + 1), 0);
	return dt.getDate();
};

module.exports.age = dt => {
	let d1 = new Date(dt);
	let d2 = d1.getTime();
	let d3 = new Date();
	let d4 = d3.getTime();
	let d5 = (d4 - d2) / (1000 * 60 * 60 * 24 * 365);
	return d5.toFixed(2);
};

module.exports.date_diff = (dt1, dt2, add_one_day) => {
	let d1 = new Date(dt1);
	let d2 = d1.getTime();
	let d3 = new Date(dt2);
	let d4 = d3.getTime();
	let d5 = 0;
	if (add_one_day === 1) {
		d5 = ((d4 - d2) + (3600000 * 24)) / (3600000 * 24 * 365);
	} else {
		d5 = (d4 - d2) / (3600000 * 24 * 365);
	}
	return d5.toFixed(2);
};

module.exports.titleCase = str => {
	return str
		.split(" ")
		.map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};

module.exports.date_add = (dt, days) => {
	let d1 = new Date(dt);
	let dt_to_time = d1.getTime();
	let days_to_time = days * 86400 * 1000;
	let total_time = parseInt(dt_to_time) + parseInt(days_to_time);
	let date_add = new Date(total_time);
	return date_add;
};


module.exports.month_bn_arr = [
	"Rvbyqvix",
	"†deªæqvix",
	"gvP©",
	"GwcÖj",
	"†g",
	"Ryb",
	"RyjvB",
	"AvMó",
	"†m‡Þ¤^i",
	"A‡±vei",
	"b‡f¤^i",
	"wW‡m¤^i"
];


module.exports.manulal_date_diff = (d1, d2) => {
	let dt1 = this.dateFormat(d1, "-");
	let dt2 = this.dateFormat(d2, "-");

	let sp1 = dt1.split("-");
	let sp2 = dt2.split("-");

	let extMonth = 0;
	let d = 0;
	let extYrs = 0;
	let m = 0;
	let y = 0;

	// Days 
	if (parseInt(sp2[2]) < parseInt(sp1[2])) {
		extMonth = 1;
		d = ((parseInt(sp2[2]) + 30) - parseInt(sp1[2]));
	} else {
		extMonth = 0;
		d = (parseInt(sp2[2]) - parseInt(sp1[2]));
	}

	// Months 
	if (parseInt(sp2[1]) < (parseInt(sp1[1]) + extMonth)) {
		extYrs = 1;
		m = ((parseInt(sp2[1]) + 12) - (parseInt(sp1[1]) + extMonth));
	} else {
		extYrs = 0;
		m = (parseInt(sp2[1]) - (parseInt(sp1[1]) + extMonth));
	}

	// Years 
	y =  ( parseInt(sp2[0]) - (parseInt(sp1[0]) + extYrs) );

	let result = y + " years " + m + " months "+ d + " days";
	return result;
}