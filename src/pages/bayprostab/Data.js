const customLib = require("../../lib/Lib");


module.exports.bayprostab = (opt, dt, mnth, yr) => {
    let obj = {};
    let server_url = "";
    let download_lnk = "";
    let x = opt;
    let ret = {};

    switch (x) {
        case "0":  //bua salary
            obj = {
                dt: customLib.dateFormat(dt, "."),
                dt_ext: customLib.dateFormat(customLib.date_add(dt, 15), "."),
                subject1: "mvwf©m †m›Uv‡ii Kv‡Ri eyqvi iIkbv †eMg (eyqv) Gi",
                subject2: customLib.month_bn_arr[parseInt(mnth)] + " " + parseInt(yr) + " gv‡mi gvwmK †eZb",
                subject3: "mvwf©m †m›Uv‡ii Kv‡Ri eyqvi iIkbv †eMg (eyqv) Gi " + customLib.month_bn_arr[parseInt(mnth)] + " " + yr + " gv‡mi gvwmK †eZb",
                porposed: "cwiKwíZ m¤ú~Y© e¨q t  " + (100 * parseInt(customLib.last_day_in_month(parseInt(yr), parseInt(mnth)))) + "/-",
                desc: " - " + customLib.month_bn_arr[parseInt(mnth)] + " " + parseInt(yr),
                days: customLib.last_day_in_month(parseInt(yr), parseInt(mnth)),
                total: (100 * parseInt(customLib.last_day_in_month(parseInt(yr), parseInt(mnth)))) + "/-",
                taka: (100 * parseInt(customLib.last_day_in_month(parseInt(yr), parseInt(mnth)))),
                tor: "mvwf©m †m›Uv‡ii Kv‡Ri eyqv Rbve iIkbv †eMg Gi " + customLib.month_bn_arr[parseInt(mnth)] + " " + parseInt(yr) + " gv‡mi gvwmK †eZb eve` " + (100 * parseInt(customLib.last_day_in_month(parseInt(yr), parseInt(mnth)))) + "/- UvKv ms¯’vcb DBs m`‡m¨i bv‡g †eqvivi †P‡Ki gva¨‡g UvKv D‡Ëvjb K‡i eyqv‡K bM‡` cwi‡k&va K‡i wnmve wefv‡M  mgš^q Kiv n‡e|"
            };
            server_url = process.env.REACT_APP_SERVER_URL + "bayprostab/buasalary";
            download_lnk = process.env.REACT_APP_SERVER_URL + "bayprostab/download_buasalary";
            ret = { obj: obj, server_url: server_url, download_lnk: download_lnk };
            break;

        case "1":  // Rent
            obj = {
                dt: customLib.dateFormat(dt, "."),
                dt_ext: customLib.dateFormat(customLib.date_add(dt, 15), "."),
                subject: customLib.month_bn_arr[parseInt(mnth)] + " " + parseInt(yr) + "  gv‡mi evwo fvov I 3wU M¨v‡iR fvov",
                desc: " - " + customLib.month_bn_arr[parseInt(mnth)] + " " + parseInt(yr),
                tor: customLib.month_bn_arr[parseInt(mnth)] + " " + parseInt(yr) + " gv‡mi evwo fvov I M¨v‡iR fvov †Rbv‡ij Acv‡ikb LvZ †_‡K cwi‡kva Kiv n‡e | c‡i Zv wewfbœ cÖ‡R± †_‡K AbycvZ Abyhvqx †diZ n‡e|"
            };
            server_url = process.env.REACT_APP_SERVER_URL + "bayprostab/house_rent";
            download_lnk = process.env.REACT_APP_SERVER_URL + "bayprostab/download_house_rent";
            ret = { obj: obj, server_url: server_url, download_lnk: download_lnk };
            break;
        default:
            console.log("No result");
    }
    return ret;
}