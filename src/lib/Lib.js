{
    construction: {
        price: {
            brick: 12.0,
            cement: 550.0,
            sand: 25.0,
            khoa: 115.0,
            rod: 100.0,
            paint: 1500.0,
            tiles: 80.0,
            flatbar: 105.0,
            anglebar: 105.0,
            mason: 550.0,
            labour: 400.0
        }
    },
    landArea: {
        convertToSft(opt, value) {

            switch (opt) {
                case "sf":
                    return (parseFloat(value) * 1);
                    break;
                case "sm":
                    return (parseFloat(value) * 10.7639);
                    break;
                case "sc":
                    return (parseFloat(value) * 4356);
                    break;
                case "ojutangsho":
                    return (parseFloat(value) * 4.356);
                    break;
                case "shotok":
                    return (parseFloat(value) * 435.6);
                    break;
                case "katha":
                    return (parseFloat(value) * 720);
                    break;
                case "bigha":
                    return (parseFloat(value) * 14400);
                    break;
                case "kani":
                    return (parseFloat(value) * 17280);
                    break;
                case "acre":
                    return (parseFloat(value) * 43560);
                    break;
                case "hectare":
                    return (parseFloat(value) * 107639);
                    break;
                case "gonda":
                    return (parseFloat(value) * 864);
                    break;
                case "kora":
                    return (parseFloat(value) * 653.4);
                    break;
                case "kranti":
                    return (parseFloat(value) * 72);
                    break;
                case "til":
                    return (parseFloat(value) * 3.6);
                    break;
                case "slink":
                    return (parseFloat(value) * 0.4356);
                    break;
                default:
                    console.log(`Sorry, we are out of ${expr}.`);
            }

        },
        get(opt, value) {
            let result = 0;
            let x = this.convertToSft(opt, value);
            switch (opt) {
                case "sf":
                    result = x;
                    break;
                case "sm":
                    result = (x / 10.7639);
                    break;
                case "sc":
                    result = (x / 4356);
                    break;
                case "ojutangsho":
                    result = (x / 4.356);
                    break;
                case "shotok":
                    result = (x / 435.6);
                    break;
                case "katha":
                    result = (x / 720);
                    break;
                case "bigha":
                    result = (x / 14400);
                    break;
                case "kani":
                    result = (x / 17280);
                    break;
                case "acre":
                    result = (x / 43560);
                    break;
                case "hectare":
                    result = (x / 107639);
                    break;
                case "gonda":
                    result = (x / 864);
                    break;
                case "kora":
                    result = (x / 653.4);
                    break;
                case "kranti":
                    result = (x / 72);
                    break;
                case "til":
                    result = (x / 3.6);
                    break;
                case "slink":
                    result = (x / 0.4356);
                    break;
                default:
                    result = 0;
            }
            return result;
        }
    },
    rajuk:{
        conv_sft(s1, s2, d, opt){
          var sft = 0;
          if (opt == "0") {
            sft = (parseFloat(s1) + parseFloat(s2)) * 435.6;
          }
          if (opt == "1") {
            sft = (parseFloat(s1) + parseFloat(s2)) * 720;
          }
          if (opt == "2") {
            sft = (parseFloat(s1) + parseFloat(s2));
          }
          return sft;
        },
        get_mgc(s1, s2, d, opt){
          let mgc = 0;
          let far = 0;
          let mgc_ratio = 0;
        
          let total_sft = this.conv_sft(s1, s2, d, opt);
          let katha = parseFloat(total_sft / 720);
        
          if ((katha >= 0.001) && (katha < 2)) {
            mgc = total_sft * 3.15;
            far = 3.15;
            mgc_ratio = 67.5;
          }
          else if ((katha >= 2) && (katha < 3)) {
            mgc = total_sft * 3.35;
            far = 3.35;
            mgc_ratio = 65.0;
          }
          else if ((katha >= 3) && (katha < 5)) {
            mgc = total_sft * 3.50;
            far = 3.50;
            mgc_ratio = 62.5;
          }
          else if ((katha >= 5) && (katha < 7)) {
            mgc = total_sft * 3.75;
            far = 3.75;
            mgc_ratio = 60.0;
          }
          else if ((katha >= 7) && (katha < 9)) {
            mgc = total_sft * 4.00;
            far = 4.00;
            mgc_ratio = 60.0;
          }
          else if ((katha >= 9) && (katha < 10)) {
            mgc = total_sft * 4.25;
            far = 4.25;
            mgc_ratio = 57.5;
        
          }
          else if ((katha >= 10) && (katha < 12)) {
            mgc = total_sft * 4.50;
            far = 4.50;
            mgc_ratio = 57.50;
        
          }
          else if ((katha >= 12) && (katha < 14)) {
            mgc = total_sft * 4.75;
            far = 4.75;
            mgc_ratio = 55.00;
        
          }
          else if ((katha >= 14) && (katha < 16)) {
            mgc = total_sft * 5.00;
            far = 5.00;
            mgc_ratio = 52.50;
        
          }
          else if ((katha >= 16) && (katha < 18)) {
            mgc = total_sft * 5.25;
            far = 5.25;
            mgc_ratio = 52.50;
        
          }
          else if ((katha >= 18) && (katha < 20)) {
            mgc = total_sft * 5.25;
            far = 5.25;
            mgc_ratio = 50.00;
        
          }
          else {
            mgc = total_sft * 5.50;
            far = 5.50;
            mgc_ratio = 50.00;
        
          };
        
        
        
          /** ---------------------------  */
        
          let x = {
            result_mgc: mgc,
            result_far: far,
            result_mgc_ratio: mgc_ratio
          };
        
          return x;
        },
        shareing(s1, s2, d, opt){
      
          let w = parseFloat(this.get_mgc(s1, s2, d, opt).result_mgc);
        
          let ds = (parseFloat(w) * (parseFloat(d) / 100));
          let s1s = (((parseFloat(w) - parseFloat(ds)) / (parseFloat(s1) + parseFloat(s2))) * parseFloat(s1));
          let s2s = (((parseFloat(w) - parseFloat(ds)) / (parseFloat(s1) + parseFloat(s2))) * parseFloat(s2));
          let x = {
            developer_sft: ds,
            share1_sft: s1s,
            share2_sft: s2s
          };
        
          return x;
        }
      },   
    util: {
        daysArray: [
            "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
        ],
        monthBnArr: [
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
        ],
        monthsObj: [
            { bn: "Rvbyqvix", en: "January" },
            { bn: "†deªæqvix", en: "February" },
            { bn: "gvP©", en: "March" },
            { bn: "GwcÖj", en: "April" },
            { bn: "†g", en: "May" },
            { bn: "Ryb", en: "June" },
            { bn: "RyjvB", en: "July" },
            { bn: "AvMó", en: "August" },
            { bn: "†m‡Þ¤^i", en: "September" },
            { bn: "A‡±vei", en: "October" },
            { bn: "b‡f¤^i", en: "November" },
            { bn: "wW‡m¤^i", en: "December" }
        ],
        dateFormat(dt, format) {
            // *** date_format:("2010-06-25",".")      result= 25.06.2010
            var d = new Date(dt);
            if (format === "-") {
                return d.getFullYear() + "-" + this.daysArray[d.getMonth() + 1] + "-" + this.daysArray[d.getDate()];
            } else {
                return this.daysArray[d.getDate()] + "." + this.daysArray[d.getMonth() + 1] + "." + d.getFullYear();
            }
        },
        dateTimeFormat(dt) {
            // *** date_format:("2010-06-25",".")      result= 25.06.2010
            var d = new Date(dt);
            return d.getFullYear() + "-" + this.daysArray[d.getMonth() + 1] + "-" + this.daysArray[d.getDate()] + " | " + this.daysArray[d.getHours() + 1] + ":" + this.daysArray[d.getMinutes() + 1] + ":" + this.daysArray[d.getSeconds() + 1];
        },
        yearsMontshDays(d1, d2) {
            let a = new Date(d1).getTime();
            let b = new Date(d2).getTime();
            let days = (b - a) / 86400000; // days

            let y = Math.floor(days / 365); // yrs
            let yrsToDays = days % 365; // days

            let m = Math.floor(yrsToDays / 30); // months
            let d = yrsToDays % 30; // days

            let ret = y + "yrs. " + m + "months " + d + "days";
            return ret;
        },
        lastDayInMonth(yyyy, m) {
            // example (2021, 0) = 31 ; (2021, 1) = 28;
            let dt = new Date(yyyy, (parseInt(m) + 1), 0);
            return dt.getDate();
        },
        Age(dt) {
            let d1 = new Date(dt);
            let d2 = d1.getTime();
            let d3 = new Date();
            let d4 = d3.getTime();
            let d5 = (d4 - d2) / (1000 * 60 * 60 * 24 * 365);
            return d5.toFixed(2);
        },
        dateDiff(dt1, dt2, add_one_day) {
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
        },
        titleCase(str) {
            return str
                .split(" ")
                .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");
        },
        dateAdd(dt, days) {
            let d1 = new Date(dt);
            let dt_to_time = d1.getTime();
            let days_to_time = days * 86400 * 1000;
            let total_time = parseInt(dt_to_time) + parseInt(days_to_time);
            let date_add = new Date(total_time);
            return date_add;
        },
        manulalDateDiff(d1, d2) {
            var d1 = new Date(d1);
            var d2 = new Date(d2);

            let dt1 = d1.getFullYear() + "-" + this.daysArray[d1.getMonth() + 1] + "-" + this.daysArray[d1.getDate()];
            let dt2 = d2.getFullYear() + "-" + this.daysArray[d2.getMonth() + 1] + "-" + this.daysArray[d2.getDate()];

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
            y = (parseInt(sp2[0]) - (parseInt(sp1[0]) + extYrs));

            let result = y + " years " + m + " months " + d + " days";
            return result;
        },
        numComma(x) {
            let a = parseFloat(x).toFixed(2);

            let num = a.toString();
            let num1 = num.split(".")

            //00,00,20,000
            let n = "000000000000" + num1[0];
            let n2 = n.substring((n.length - 9), n.length);
            let n3 = n2.split("");

            let c1 = parseInt(n3[0] + n3[1]);
            let c2 = parseInt(n3[2] + n3[3]);
            let c3 = parseInt(n3[4] + n3[5]);
            let c4 = "";
            let cx = n3[6] + n3[7] + n3[8];
            if (parseInt(cx) > 0) {
                c4 = parseInt(cx);
            } else {
                c4 = cx;
            }

            let st1 = "";
            let st2 = "";
            let st3 = "";
            let st4 = c4;

            if (c1 === 0) {
                st1 = "";
            } else {
                st1 = c1 + ",";
            }

            if (c2 === 0) {
                st2 = "";
            } else {
                st2 = c2 + ",";
            }

            if (c3 === 0) {
                st3 = "";
            } else {
                st3 = c3 + ",";
            }


            let decimalPlace = "";

            if (num1[1]) {
                decimalPlace = "." + num1[1];
            } else {
                decimalPlace = "";
            }

            if (num1[0].length > 9) {
                return x;
            } else {
                return st1 + st2 + st3 + st4 + decimalPlace;
            }
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        uniqueArr(x) {
            let unique = x.filter((item, index) => {
                return x.indexOf(item) === index;
            })
            return unique;
        },
        sort: {
            arr(data, n) {
                return `${n === 1 ? data.sort() : data.sort().reverse()}`;
            },
            obj: {
                val(data, n) {
                    return data.sort((a, b) => `${n === 1 ? (a.value - b.value) : (b.value - a.value)}`);
                }
            }
        },
        inword: {
            en(num) {
                let a = [
                    "",
                    "one ",
                    "two ",
                    "three ",
                    "four ",
                    "five ",
                    "six ",
                    "seven ",
                    "eight ",
                    "nine ",
                    "ten ",
                    "eleven ",
                    "twelve ",
                    "thirteen ",
                    "fourteen ",
                    "fifteen ",
                    "sixteen ",
                    "seventeen ",
                    "eighteen ",
                    "nineteen ",
                ];
                let b = [
                    "",
                    "",
                    "twenty",
                    "thirty",
                    "forty",
                    "fifty",
                    "sixty",
                    "seventy",
                    "eighty",
                    "ninety",
                ];

                if ((num = num.toString()).length > 9) return "overflow";
                let n = ("000000000" + num)
                    .substr(-9)
                    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
                if (!n) return;
                var str = "";
                str +=
                    n[1] != 0
                        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
                        : "";
                str +=
                    n[2] != 0
                        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
                        : "";
                str +=
                    n[3] != 0
                        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
                        : "";
                str +=
                    n[4] != 0
                        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
                        : "";
                str +=
                    n[5] != 0
                        ? (str != "" ? "and " : "") +
                        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
                        "only "
                        : "";
                return str;
            },
            bn(number) {
                let num_to_bd = [
                    'k~b¨',
                    'GK',
                    '`yB',
                    'wZb',
                    'Pvi',
                    'cvuP',
                    'Qq',
                    'mvZ',
                    'AvU',
                    'bq',
                    '`k',
                    'GMvi',
                    'evi',
                    '‡Zi',
                    '‡PŠÏ',
                    'c‡bi',
                    '‡lvj',
                    'm‡Zi',
                    'AvVvi',
                    'Ewbk',
                    'wek',
                    'GKyk',
                    'evBk',
                    '‡ZBk',
                    'PweŸk',
                    'cuwPk',
                    'QvweŸk',
                    'mvZvk',
                    'AvVvk',
                    'EbwÎk',
                    'wÎk',
                    'GKwÎk',
                    'ewÎk',
                    '‡ZwÎk',
                    '‡PŠwÎk',
                    'cuh়wÎk',
                    'QwÎk',
                    'mvuBwÎk',
                    'AvUwÎk',
                    'EbPwjøk',
                    'Pwjøk',
                    'GKPwjøk',
                    'weqvwjøk',
                    '‡ZZvwjøk',
                    'Pyqvwjøk',
                    'cuqZvwjøk',
                    '‡QPwjøk',
                    'mvZPwjøk',
                    'AvUPwjøk',
                    'EbcÂvk',
                    'cÂvk',
                    'GKvbœ',
                    'evqvbœ',
                    'wZàvbœ',
                    'Pyqvbœ',
                    'cÂvbœ',
                    'Qvàvbœ',
                    'mvZvbœ',
                    'AvUvbœ',
                    'EblvU',
                    'lvU',
                    'GKlwÆ',
                    'evlwÆ',
                    '‡ZlwÆ',
                    '‡PŠlwÆ',
                    'cuqlwÆ',
                    '‡QlwÆ',
                    'mvZlwÆ',
                    'AvUlwÆ',
                    'EbmËi',
                    'mËi',
                    'GKvËi',
                    'evnvËi',
                    'wZqvËi',
                    'PyqvËi',
                    'cuPvËi',
                    'wQqvËi',
                    'mvZvËi',
                    'AvUvËi',
                    'EbAvwk',
                    'Avwk',
                    'GKvwk',
                    'weivwk',
                    'wZivwk',
                    'Pyivwk',
                    'cuPvwk',
                    'wQqvwk',
                    'mvZvwk',
                    'AvUvwk',
                    'EbbeŸB',
                    'beŸB',
                    'GKvbeŸB',
                    'weivbeŸB',
                    'wZivbeŸB',
                    'PyivbeŸB',
                    'cuPvbeŸB',
                    'wQqvbeŸB',
                    'mvZvbeŸB',
                    'AvUvbeŸB',
                    'wbivbeŸB'
                ];

                let num = parseInt(number);
                //00,00,20,000
                let n = "000000000000" + num.toString();
                let n1 = n.substring((n.length - 9), n.length);
                let n2 = n1.toString();
                let n3 = n2.split("");

                let c1 = parseInt(n3[0] + n3[1]);
                let c2 = parseInt(n3[2] + n3[3]);
                let c3 = parseInt(n3[4] + n3[5]);
                let c4 = parseInt(n3[6]);
                let c5 = parseInt(n3[7] + n3[8]);

                let st1 = "";
                let st2 = "";
                let st3 = "";
                let st4 = "";
                let st5 = "";

                if (c1 === 0) {
                    st1 = "";
                } else {
                    st1 = num_to_bd[c1] + " †KvwU ";
                }

                if (c2 === 0) {
                    st2 = "";
                } else {
                    st2 = num_to_bd[c2] + " j¶ ";
                }

                if (c3 === 0) {
                    st3 = "";
                } else {
                    st3 = num_to_bd[c3] + " nvRvi ";
                }


                if (c4 === 0) {
                    st4 = "";
                } else {
                    st4 = num_to_bd[c4] + " kZ ";
                }

                if (c5 === 0) {
                    st5 = "";
                } else {
                    st5 = num_to_bd[c5];
                }

                if (number.length > 9) {
                    return "Amxg";
                } else {
                    return st1 + st2 + st3 + st4 + st5;
                }
            }
        },
        landarea: {
            sft(area, opt) {
                let sft = 0;
                let expr = opt;
                switch (expr) {
                    case "sf":
                        return (parseFloat(area) * 1);
                        break;
                    case "sm":
                        return (parseFloat(area) * 10.7639);
                        break;
                    case "sc":
                        return (parseFloat(area) * 4356);
                        break;
                    case "ojutangsho":
                        return (parseFloat(area) * 4.356);
                        break;
                    case "shotok":
                        return (parseFloat(area) * 435.6);
                        break;
                    case "katha":
                        return (parseFloat(area) * 720);
                        break;
                    case "bigha":
                        return (parseFloat(area) * 14400);
                        break;
                    case "kani":
                        return (parseFloat(area) * 17280);
                        break;
                    case "acre":
                        return (parseFloat(area) * 43560);
                        break;
                    case "hectare":
                        return (parseFloat(area) * 107639);
                        break;
                    case "gonda":
                        return (parseFloat(area) * 864);
                        break;
                    case "kora":
                        return (parseFloat(area) * 653.4);
                        break;
                    case "kranti":
                        return (parseFloat(area) * 72);
                        break;
                    case "til":
                        return (parseFloat(area) * 3.6);
                        break;
                    case "slink":
                        return (parseFloat(area) * 0.4356);
                        break;
                    default:
                        console.log(`Sorry, we are out of ${expr}.`);
                }
                return sft;
            },
            result(area, opt) {
                let x = this.sft(area, opt);
                let obj = {
                    sft: x.toFixed(3),
                    sm: (x / 10.7639).toFixed(3),
                    sc: (x / 4356).toFixed(3),
                    ojutangsho: (x / 4.356).toFixed(3),
                    shotok: (x / 435.6).toFixed(3),
                    katha: (x / 720).toFixed(3),
                    bigha: (x / 14400).toFixed(3),
                    kani: (x / 17280).toFixed(3),
                    acre: (x / 43560).toFixed(3),
                    hectare: (x / 107639).toFixed(3),
                    gonda: (x / 864).toFixed(3),
                    kora: (x / 653.4).toFixed(3),
                    kranti: (x / 72).toFixed(3),
                    til: (x / 3.6).toFixed(3),
                    link: (x / 0.4356).toFixed(3)
                }
                return obj
            }
        }
    },
    cmes: {
        format: {
            leave({ doc }) {
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(24);

                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, 20, null, null, "center");
                doc.text("QywUi dig", 105, 30, null, null, "center");
                doc.setFontSize(14);
                doc.text("ZvwiL: ..........................", (210 - 12), 40, null, null, "right");
                doc.text("bvg: ..................................................... c`ex:............... wefvM/DBs:................ cÖ‡R±:...................", 20, 50, null, null, "left");
                doc.text("QywUi KviY/weeiY: .......................................................................................................................", (20), 60, null, null, "left");
                doc.text("cÖv_©xZ QzwUi mgqKvj: ........................ ZvwiL †_‡K ....................... ZvwiL ch©šÍ ........... w`b........... N›Uv", (20), 70, null, null, "left");

                doc.text("eivei", (20), 85, null, null, "left");
                doc.text("wbe©vnx cwiPvjK", 20, 92, null, null, "left");
                doc.text("wmGgBGm, XvKv", 20, 99, null, null, "left");
                doc.text("wcÖq g‡nv`q,", 20, 106, null, null, "left");


                doc.text("webxZ wb‡e`K                    ", 198, 200, null, null, "right");
                doc.text("¯^v¶i:                             ", 198, 210, null, null, "right");  // sakhkhor


                doc.text("PjwZ eQ‡i †fvMK…Z QzwUi cÖK…wZ:", 20, 223, null, null, "left");
                doc.text("QywUi Z_¨:                         ", 198, 223, null, null, "right");

                doc.line(20, 219, 198, 219) // horizontal line

                doc.text("‰bwgwËK QzwU (    )= ........ w`b", 20, 230, null, null, "left");
                doc.text("1g, 2q, 3q I 4_© †KvqvU©v‡i cÖvc¨ QywU =........w`b             ", 198, 230, null, null, "right");


                doc.text("AwR©Z QzwU (    )=  .......... w`b", 20, 237, null, null, "left");
                doc.text("BwZc~‡e© †fvMK…Z QzwU =........w`b             ", 198, 237, null, null, "right");

                doc.setFont('courier', 'normal');
                doc.text("CL", 42, 230, null, null, "left");
                doc.text("EL", 39, 237, null, null, "left");

                doc.setFont("SutonnyMJ", "normal");
                doc.text("Av‡e`bK…Z QzwU = ............ w`b......... N›Uv", 20, 244, null, null, "left");
                doc.text("Av‡e`bK…Z QzwU = ........w`b....... N›Uv", 198, 244, null, null, "right");
                doc.line(20, 245, 93, 245) // horizontal line
                doc.line(125, 245, 198, 245) // horizontal line

                doc.text("†gvU QywU = ..................... w`b......... N›Uv", 20, 252, null, null, "left");
                doc.text("Aewkó/AwZwi³ QywU =.........w`b....... N›Uv", 198, 252, null, null, "right");


                doc.text("Aby‡gv`bKvixi ¯^v¶i: ", 20, 277, null, null, "left");
                doc.text("¯^v¶i:                          ", 198, 277, null, null, "right");

                doc.text("wbe©vnx cwiPvjK", 20, 284, null, null, "left");
                doc.text("cÖkvmb DBs.....................", 198, 284, null, null, "right");
            },
            localTaUp({ doc }) {
                let tm = 18;
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(20);

                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, tm, null, null, "center");
                doc.text("¯’vbxq ågY fvZv wej", 105, tm + 7, null, null, "center");

                doc.setFontSize(14);
                doc.text("ågYKvixi bvg I c`ex t....................................................................", 12, tm + 19, null, null, "left");
                doc.text("ZvwiL t................................", 199, tm + 18, null, null, "right");
                doc.text("åg‡Yi D‡Ïk¨ t...............................................................................", 12, tm + 27, null, null, "left");
                doc.text("Ae¯’vb t...............................", 199, tm + 27, null, null, "right");

                doc.line(12, tm + 31, 199, tm + 31); // horizontal line
                doc.line(12, tm + 37, 199, tm + 37); // horizontal line
                doc.line(12, tm + 43, 199, tm + 43); // horizontal line
                doc.line(12, tm + 91, 199, tm + 91); // horizontal line
                doc.line(12, tm + 97, 199, tm + 97); // horizontal line

                doc.line(12, tm + 31, 12, tm + 97); // vertical line
                doc.line(42, tm + 37, 42, tm + 91); // vertical line
                doc.line(55, tm + 31, 55, tm + 91); // vertical line
                doc.line(84, tm + 37, 84, tm + 91); // vertical line
                doc.line(99, tm + 31, 99, tm + 91); // vertical line
                doc.line(114, tm + 37, 114, tm + 91); // vertical line
                doc.line(144, tm + 37, 144, tm + 91); // vertical line
                doc.line(157, tm + 37, 157, tm + 97); // vertical line
                doc.line(176, tm + 31, 176, tm + 97); // vertical line
                doc.line(199, tm + 31, 199, tm + 97); // vertical line

                //-------------------------------------
                doc.line(0, 148.5, 5, 148.5);
                doc.line(102.5, 148.5, 107.5, 148.5);
                doc.line(205, 148.5, 210, 148.5);
                //-------------------------------------

                doc.text("cÖ¯’vb", 32, tm + 35.5, null, null, "center"); // prosthan
                doc.text("Dcw¯’Z", 78, tm + 35.5, null, null, "center");  // uposthit
                doc.text("hvbevnb I fvZv (UvKv)", 137, tm + 35.5, null, null, "center");  // janbahon o vata taka
                doc.text("†gvU UvKv", 188, tm + 35.5, null, null, "center");  // mote taka

                doc.text("¯’vb", 27, tm + 41.5, null, null, "center"); // sthan
                doc.text("mgq", 48, tm + 41.5, null, null, "center"); // somoy
                doc.text("¯’vb", 69, tm + 41.5, null, null, "center"); // sthan
                doc.text("mgq", 92, tm + 41.5, null, null, "center"); // somoy
                doc.text("evm", 107, tm + 41.5, null, null, "center"); // bas
                doc.text("wmGbwR", 130, tm + 41.5, null, null, "center"); // cng 
                doc.text("wi·v", 151.5, tm + 41.5, null, null, "center"); // autorikshaw 
                doc.text("Ab¨vb¨", 167, tm + 41.5, null, null, "center"); // onnaono

                doc.text("UvKv (K_vq)t", 24, tm + 95.5, null, null, "center"); //  taka kothay
                doc.text("†gvU UvKv", 166, tm + 95.5, null, null, "center"); // mote taka

                doc.text("ågYKvixi ¯^vÿi", 12, tm + 116.5, null, null, "left"); // vromonkarir sakkhor
                doc.text("cÖwZ ¯^vÿi", 78, tm + 116.5, null, null, "center"); // proti sakkhor
                doc.text("wefvMxq cÖavb/mwPe", 135, tm + 116.5, null, null, "center"); // bivagio prodhan/ sochib
                doc.text("wnmve wefvM", 199, tm + 116.5, null, null, "right"); // hisab bivag

                doc.line(12, tm + 111.5, 38, tm + 111.5); // horizontal line 
                doc.line(68, tm + 111.5, 88, tm + 111.5); // horizontal line   
                doc.line(119, tm + 111.5, 150.5, tm + 111.5); // horizontal line  
                doc.line(179, tm + 111.5, 199, tm + 111.5); // horizontal line  
            },
            localTaDn({ doc }) {
                let tm = 18;

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(20);

                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, tm + 148, null, null, "center");
                doc.text("¯’vbxq ågY fvZv wej", 105, tm + 7 + 148, null, null, "center");

                doc.setFontSize(14);
                doc.text("ågYKvixi bvg I c`ex t....................................................................", 12, tm + 19 + 148, null, null, "left");
                doc.text("ZvwiL t................................", 199, tm + 18 + 148, null, null, "right");
                doc.text("åg‡Yi D‡Ïk¨ t...............................................................................", 12, tm + 27 + 148, null, null, "left");
                doc.text("Ae¯’vb t...............................", 199, tm + 27 + 148, null, null, "right");

                doc.line(12, tm + 31 + 148, 199, tm + 31 + 148); // horizontal line
                doc.line(12, tm + 37 + 148, 199, tm + 37 + 148); // horizontal line
                doc.line(12, tm + 43 + 148, 199, tm + 43 + 148); // horizontal line
                doc.line(12, tm + 91 + 148, 199, tm + 91 + 148); // horizontal line
                doc.line(12, tm + 97 + 148, 199, tm + 97 + 148); // horizontal line

                doc.line(12, tm + 31 + 148, 12, tm + 97 + 148); // vertical line    
                doc.line(42, tm + 37 + 148, 42, tm + 91 + 148); // vertical line
                doc.line(55, tm + 31 + 148, 55, tm + 91 + 148); // vertical line
                doc.line(84, tm + 37 + 148, 84, tm + 91 + 148); // vertical line
                doc.line(99, tm + 31 + 148, 99, tm + 91 + 148); // vertical line
                doc.line(114, tm + 37 + 148, 114, tm + 91 + 148); // vertical line
                doc.line(144, tm + 37 + 148, 144, tm + 91 + 148); // vertical line
                doc.line(157, tm + 37 + 148, 157, tm + 97 + 148); // vertical line
                doc.line(176, tm + 31 + 148, 176, tm + 97 + 148); // vertical line
                doc.line(199, tm + 31 + 148, 199, tm + 97 + 148); // vertical line

                doc.text("cÖ¯’vb", 32, tm + 35.5 + 148, null, null, "center"); // prosthan
                doc.text("Dcw¯’Z", 78, tm + 35.5 + 148, null, null, "center");  // uposthit
                doc.text("hvbevnb I fvZv (UvKv)", 137, tm + 35.5 + 148, null, null, "center");  // janbahon o vata taka
                doc.text("†gvU UvKv", 188, tm + 35.5 + 148, null, null, "center");  // mote taka

                doc.text("¯’vb", 27, tm + 41.5 + 148, null, null, "center"); // sthan
                doc.text("mgq", 48, tm + 41.5 + 148, null, null, "center"); // somoy
                doc.text("¯’vb", 69, tm + 41.5 + 148, null, null, "center"); // sthan
                doc.text("mgq", 92, tm + 41.5 + 148, null, null, "center"); // somoy
                doc.text("evm", 107, tm + 41.5 + 148, null, null, "center"); // bas
                doc.text("wmGbwR", 130, tm + 41.5 + 148, null, null, "center"); // cng 
                doc.text("wi·v", 151.5, tm + 41.5 + 148, null, null, "center"); // autorikshaw 
                doc.text("Ab¨vb¨", 167, tm + 41.5 + 148, null, null, "center"); // onnaono

                doc.text("UvKv (K_vq)t", 24, tm + 95.5 + 148, null, null, "center"); //  taka kothay
                doc.text("†gvU UvKv", 166, tm + 95.5 + 148, null, null, "center"); // mote taka

                doc.text("ågYKvixi ¯^vÿi", 12, tm + 116.5 + 148, null, null, "left"); // vromonkarir sakkhor
                doc.text("cÖwZ ¯^vÿi", 78, tm + 116.5 + 148, null, null, "center"); // proti sakkhor
                doc.text("wefvMxq cÖavb/mwPe", 135, tm + 116.5 + 148, null, null, "center"); // bivagio prodhan/ sochib
                doc.text("wnmve wefvM", 199, tm + 116.5 + 148, null, null, "right"); // hisab bivag

                doc.line(12, tm + 111.5 + 148, 38, tm + 111.5 + 148); // horizontal line 
                doc.line(68, tm + 111.5 + 148, 88, tm + 111.5 + 148); // horizontal line   
                doc.line(119, tm + 111.5 + 148, 150.5, tm + 111.5 + 148); // horizontal line  
                doc.line(179, tm + 111.5 + 148, 199, tm + 111.5 + 148); // horizontal line

            },
            localtaDbl({ doc }) {
                this.localTaUp({ doc });
                this.localTaDn({ doc });
            },
            taBill({ doc }) {
                let tm = 25;
                //doc.addImage("/images/format/TA BILL.png", "PNG", 0, 0, 210, 297);

                doc.addImage("/images/cmes_logo/cmes.png", "PNG", 25, 15, 10, 15);

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(26.5);

                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 112, tm, null, null, "center");
                doc.setFontSize(16);
                doc.text("evwo bs- 5/4, eøK - Gd, jvjgvwUqv, XvKv- 1207", 112, tm + 8, null, null, "center");
                doc.setFontSize(26.5);
                doc.text("hvZvqvZ wej", 105, tm + 28, null, null, "center");

                doc.setFontSize(14);
                doc.text("ågYKvixi bvg t......................................................................", 12, tm + 45, null, null, "left");
                doc.text("c`ex t................................", 199, tm + 45, null, null, "right");
                doc.text("Ae¯’vbt mv‡m/BDwbU t..............................................................", 12, tm + 53, null, null, "left");
                doc.text("cÖKí t................................", 199, tm + 53, null, null, "right");

                doc.line(12, tm + 62.5, 202, tm + 62.5); // horizontal line
                doc.line(12, tm + 69.5, 202, tm + 69.5); // horizontal line
                doc.line(12, tm + 198, 202, tm + 198); // horizontal line
                doc.line(12, tm + 205, 202, tm + 205); // horizontal line
                doc.line(12, tm + 212, 202, tm + 212); // horizontal line

                doc.line(12, tm + 62.5, 12, tm + 212); // vertical line
                doc.line(25, tm + 62.5, 25, tm + 205); // vertical line
                doc.line(45, tm + 62.5, 45, tm + 198); // vertical line
                doc.line(57, tm + 62.5, 57, tm + 198); // vertical line
                doc.line(77, tm + 62.5, 77, tm + 198); // vertical line
                doc.line(90, tm + 62.5, 90, tm + 198); // vertical line
                doc.line(150, tm + 62.5, 150, tm + 198); // vertical line
                doc.line(163, tm + 62.5, 163, tm + 198); // vertical line
                doc.line(183, tm + 62.5, 183, tm + 198); // vertical line
                doc.line(202, tm + 62.5, 202, tm + 212); // vertical line

                doc.text("ZvwiL", 18, tm + 68, null, null, "center");
                doc.text("†Kv_v n‡Z", 34, tm + 68, null, null, "center");
                doc.text("mgq", 51, tm + 68, null, null, "center");
                doc.text("†Kvb ch©šÍ", 66.5, tm + 68, null, null, "center");
                doc.text("mgq", 83, tm + 68, null, null, "center");
                doc.text("D‡Ïk¨", 116, tm + 68, null, null, "center");
                doc.text("evnb", 156, tm + 68, null, null, "center");
                doc.text("UvKv", 173, tm + 68, null, null, "center");
                doc.text("gšÍe¨", 194, tm + 68, null, null, "center");

                doc.text("wW.G.c~Y©w`b/ Aa©w`b t", 44, tm + 203, null, null, "center");
                doc.text("†gvU UvKv (K_vq) t", 30, tm + 210, null, null, "center");

                doc.text("wnmve wefvM", 12, tm + 240, null, null, "left");
                doc.text("ågYKvixi ¯^vÿi t   ", 199, tm + 240, null, null, "right");
                doc.text("ZvwiL t................", 199, tm + 247, null, null, "right");
            },
            bayprostab({ doc }) {
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(20);
                doc.text('wmGgBGm', 105, 20.5, null, null, "center");
                doc.setFontSize(16);
                doc.text('†K›`ªxq e¨q', 105, 26, null, null, "center");
                doc.text('cÖ‡R±:', 178.438, 26, null, null, "left");

                let lnt = 34;
                let lng = 6.5;

                doc.setFontSize(14);
                doc.text('e¨q cÖ¯Íve', 13, (lnt + (lng * 0)), null, null, "left");
                doc.text('e¨q cÖ¯ÍveKvixi bvgt', 13, (lnt + (lng * 1)), null, null, "left");
                doc.text('LvZt', 13, (lnt + (lng * 2)), null, null, "left");
                doc.text('welqt', 13, (lnt + (lng * 3)), null, null, "left");


                doc.text('ZvwiLt ', 133, (lnt + (lng * 0)), null, null, "left");
                doc.text('e¨qcÖ¯Íve bs t', 133, (lnt + (lng * 1)), null, null, "left");
                doc.text('BwZg‡a¨ m¤úvw`Z e¨q t  ', 133, (lnt + (lng * 4)), null, null, "left");

                doc.text('cwiKíbv m~Î (bs mn)', 13, (lnt + (lng * 5)), null, null, "left");
                doc.text('cÖv°wjZ e¨q', 13, (lnt + (lng * 6)), null, null, "left");
                doc.text('(cÖvmw½K KvMRcÎ ms‡hvwhZ Kiæb)', 105, (lnt + (lng * 6)), null, null, "center");

                doc.line(13, (lnt + 2 + (lng * 6)), 200, (lnt + 2 + (lng * 6))) // horizontal line
                doc.line(13, (lnt + 21 + (lng * 6)), 200, (lnt + 21 + (lng * 6))) // horizontal line
                doc.line(13, (lnt + 140 + (lng * 6)), 200, (lnt + 140 + (lng * 6))) // horizontal line
                doc.line(13, (lnt + 147 + (lng * 6)), 200, (lnt + 147 + (lng * 6))) // horizontal line


                doc.line(69.681, (lnt + 2 + (lng * 6)), 69.681, (lnt + 147 + (lng * 6))) // vertical line
                doc.line(13, (lnt + 2 + (lng * 6)), 13, (lnt + 147 + (lng * 6))) // vertical line
                doc.line(92.099, (lnt + 2 + (lng * 6)), 92.099, (lnt + 147 + (lng * 6))) // vertical line
                doc.line(111.661, (lnt + 2 + (lng * 6)), 111.661, (lnt + 147 + (lng * 6))) // vertical line
                doc.line(133.222, (lnt + 2 + (lng * 6)), 133.222, (lnt + 147 + (lng * 6))) // vertical line
                doc.line(149.499, (lnt + 2 + (lng * 6)), 149.499, (lnt + 147 + (lng * 6))) // vertical line
                doc.line(200, (lnt + 2 + (lng * 6)), 200, (lnt + 147 + (lng * 6))) // vertical line


                doc.text('`ªe¨/mvwf©m', 42.071, 83.781, null, null, "center");
                doc.text('BDwbU', 81.246, 83.781, null, null, "center");
                doc.text('BDwbU', 101.641, 83.781, null, null, "center");
                doc.text('†gvU', 122.844, 83.781, null, null, "center");
                doc.text('cÖ¯ÍvweZ', 141.321, 83.781, null, null, "center");
                doc.text('mieivnkZ©/‡Kv‡Ukb/b¨vh¨-', 174.347, 83.781, null, null, "center");

                doc.text('(†¯úwmwd‡Kkb)', 42.071, 87.618, null, null, "center");
                doc.text('g~j¨', 81.246, 87.618, null, null, "center");
                doc.text('msL¨v', 101.641, 87.618, null, null, "center");
                doc.text('g~j¨', 122.844, 87.618, null, null, "center");
                doc.text('mieivn', 141.321, 87.618, null, null, "center");
                doc.text('g~j¨ wbwðZKiY mieivn c×wZ', 174.347, 87.618, null, null, "center");
                doc.text('Drm', 141.321, 91.657, null, null, "center");

                doc.text('†gvU', 42.071, 218, null, null, "center");
                doc.text('†gvU cÖv°wjZ e¨q (K_vq)t', 13, 226.144, null, null, "left");

                doc.text('g‡bvbxZ µq m¤úv`‡Ki bvg t', 110.930, 237.957, null, null, "left");
                doc.text('mnvqZvKvix t', 110.930, 244.217, null, null, "left");
                doc.text('cÖ¯ÍveKvix t', 110.930, 250.073, null, null, "left");

                doc.text('†Pqvig¨vb', 13.930, 280.767, null, null, "left");
                doc.text('¯^vÿi', 105, 276.728, null, null, "center");
                doc.text('KwgwU m`m¨MY/mgš^qKvix', 105, 280.767, null, null, "center");


                //************************************************************************** */
                doc.addPage("a4", "p");

                doc.text('cÖ‡R±:', 178.438, 26, null, null, "left");
                doc.setFontSize(14);
                doc.setFont("SutonnyMJ", "bold");
                doc.text('e¨q cÖ¯Íve m¤úv`b', 13, 32, null, null, "left");
                doc.setFont("SutonnyMJ", "normal");
                doc.text('µq m¤úv`Kt ................................................', 13, 38, null, null, "left");
                doc.text('µq mnvqZvKvix (hw` _v‡K) ......................................', 105, 38, null, null, "left");
                doc.text('AwMÖ‡gi cwigvbt .............................', 13, 46, null, null, "left");
                doc.text('AwMÖg MÖn‡bi ZvwiL t ................................................', 105, 46, null, null, "left");
                doc.text('m¤úvw`Z e¨qt    .............................', 13, 54, null, null, "left");
                doc.line(40, 55, 80, 55) // horizontal line
                doc.text('†diZ t            .............................', 13, 62, null, null, "left");


                doc.text('(cÖvmw½K KvMRcÎ ms‡hvwhZ Kiæb)', 105, 70, null, null, "center");
                // 78.084   80.911
                doc.line(13, 72, 200, 72) // horizontal line
                doc.line(13, 92, 200, 92) // horizontal line
                doc.line(13, 230, 200, 230) // horizontal line
                doc.line(13, 237, 200, 237) // horizontal line

                doc.line(13, 72, 13, 237) // vertical line
                doc.line(69.300, 72, 69.300, 237) // vertical line
                doc.line(92.321, 72, 92.321, 237) // vertical line
                doc.line(111.302, 72, 111.302, 237) // vertical line
                doc.line(133.919, 72, 133.919, 237) // vertical line
                doc.line(150, 72, 150, 237) // vertical line
                doc.line(200, 72, 200, 237) // vertical line

                doc.text('`ªe¨/mvwf©m', 40.727, 84, null, null, "center");
                doc.text('(†¯úwmwd‡Kkb)', 40.727, 90, null, null, "center");

                doc.text('BDwbU', 81.012, 84, null, null, "center");
                doc.text('g~j¨', 81.012, 90, null, null, "center");

                doc.text('BDwbU', 101.408, 84, null, null, "center");
                doc.text('msL¨v', 101.408, 90, null, null, "center");

                doc.text('†gvU', 122.207, 84, null, null, "center");
                doc.text('g~j¨', 122.207, 90, null, null, "center");


                doc.text('cÖ¯ÍvweZ', 141.5, 78, null, null, "center");
                doc.text('mieivn', 141.5, 84, null, null, "center");
                doc.text('Drm', 141.5, 90, null, null, "center");


                doc.text('gšÍe¨ (cÖvwß, †KvqvwjwU,', 175, 78, null, null, "center");
                doc.text('g~‡j¨I b¨vh¨Zv) ms¯’vcb', 175, 84, null, null, "center");
                doc.text('I wn‡me wefvM', 175, 90, null, null, "center");


                // †gvU 226.803

                // ok 
                doc.text('†gvU', 42.544, 235, null, null, "center");
                doc.text('†gvU e¨q (K_vq)t', 13, 241, null, null, "left");
                doc.text('e¨q cÖ¯ÍveKvixi gšÍe¨ I ¯^vÿi t', 130.991, 248, null, null, "left");
                doc.text('AwMÖg mgš^q Ki‡Yi ZvwiLt', 13, 248, null, null, "left");

                // ok
                doc.text('¯^vÿi', 105, 271.729, null, null, "center");
                doc.text('wbe©vnx cwiPvjK', 13, 277.729, null, null, "left");
                doc.text('wnmve Kg©KZ©v', 105, 277.729, null, null, "center");
                doc.text('µq m¤úv`K', 200, 277.729, null, null, "right");


                /***************************************************************************** */
                doc.addPage("a4", "p");

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(20);
                doc.text('wmGgBGm', 105, 20.583, null, null, "center");
                doc.setFontSize(16);
                doc.text('m¤ú~Y© Kg© e¨q cwiKíbv', 105, 27.357, null, null, "center");
                doc.text('cÖ‡R±:', 160, 27.357, null, null, "left");

                doc.setFontSize(14);
                doc.text('cwiKíbvKvix t', 13, 35.173, null, null, "left");
                doc.text('ZvwiLt', 160, 35.173, null, null, "left");
                doc.text('(KwgwU I g~L¨ `wqZ¡ cÖvß Kg©KZ©v)', 13, 41.736, null, null, "left");
                doc.text('LvZt', 13, 47.188, null, null, "left");
                doc.text('welqt', 13, 53.246, null, null, "left");
                doc.text('m¤úv`‡bi Kvjt', 13, 59.304, null, null, "left");
                doc.text('ZvwiL ‡_‡Kt', 110.293, 59.304, null, null, "center");
                doc.text('ZvwiL', 185.210, 59.304, null, null, "left");
                doc.text('AvbygvwbK e¨q (h_vm¤¢e we¯ÍvwiZ)', 13, 72.026, null, null, "left");
                doc.text('cÖv°wjZ e¨q', 13, 78.084, null, null, "left");
                doc.text('(cÖvmw½K KvMRcÎ ms‡hvwhZ Kiæb)', 105, 78.084, null, null, "center");

                doc.line(13, 80.911, 200, 80.911) // horizontal line
                doc.line(13, 100.297, 200, 100.2971) // horizontal line
                doc.line(13, 222.063, 200, 222.063) // horizontal line
                doc.line(13, 229.063, 200, 229.063) // horizontal line

                doc.line(13, 80.911, 13, 229.063) // vertical line
                doc.line(69.300, 80.911, 69.300, 229.063) // vertical line
                doc.line(92.321, 80.911, 92.321, 229.063) // vertical line
                doc.line(111.302, 80.911, 111.302, 229.063) // vertical line
                doc.line(133.919, 80.911, 133.919, 229.063) // vertical line
                doc.line(200, 80.911, 200, 229.063) // vertical line

                doc.text('BDwbU', 81.012, 90.402, null, null, "center");
                doc.text('BDwbU', 101.408, 90.402, null, null, "center");
                doc.text('†gvU', 122.207, 90.402, null, null, "center");
                doc.text('m¤¢ve¨ mieivn Drm I g~j¨ Abygv‡bi', 169.459, 90.402, null, null, "center");

                doc.text('AvB‡Ug', 40.727, 94.845, null, null, "center");
                doc.text('g~j¨', 81.012, 94.845, null, null, "center");
                doc.text('msL¨v', 101.408, 94.845, null, null, "center");
                doc.text('g~j¨', 122.207, 94.845, null, null, "center");
                doc.text('wfwË‡Z', 169.459, 94.845, null, null, "center");

                doc.text('†gvU', 42.544, 226.803, null, null, "center");
                doc.text('AvbygvwbK †gvU cÖv°wjZ e¨q ev †gvU g~j¨t', 13, 233.765, null, null, "left");
                doc.text('wnmve Kg©KZ©vi ev‡RU', 130.991, 233.765, null, null, "left");

                doc.text('UvKv (K_vq)t', 130.991, 239.429, null, null, "left");
                doc.text('gšÍe¨ I ¯^vÿi', 13, 239.429, null, null, "left");


                doc.text('¯^vÿi', 105, 271.729, null, null, "center");
                doc.text('†Pqvig¨vb', 13, 277.729, null, null, "left");
                doc.text('KwgwU m`m¨MY/mgš^qKvix', 105, 277.729, null, null, "center");
                doc.text('g~L¨ cwiKíbvKvix', 200, 277.729, null, null, "right");
            },
            go({ doc }) {
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(20);
                doc.text('†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)', 105, 20.583, null, null, "center");
                doc.setFontSize(16);
                doc.text('evwo bs- 5/4, eøK- Gd, jvjgvwUqv, XvKv  1207', 105, 27.357, null, null, "center");

                doc.setFontSize(22);
                doc.text('     †_‡K Li‡Pi PvU©', 105, 35, null, null, "center");
                doc.setFontSize(20);
                doc.setFont("times", "normal");
                doc.text('GO', 78, 35, null, null, "left");

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(16);
                doc.text("ZvwiLt  ", 160, 42, null, null, "left");

                doc.line(13, 47, 200, 47) // horizontal line
                doc.line(13, 62, 200, 62) // horizontal line

                doc.line(13, 180, 200, 180) // horizontal line
                doc.line(13, 190, 200, 190) // horizontal line

                doc.line(13, 47, 13, 190) // vertical line
                doc.line(25, 47, 25, 190) // vertical line
                doc.line(98, 47, 98, 190) // vertical line
                doc.line(125, 47, 125, 190) // vertical line
                doc.line(165, 47, 165, 190) // vertical line
                doc.line(200, 47, 200, 190) // vertical line


                doc.setFont("SutonnyMJ", "bold");
                doc.text('µg.', 15, 54, null, null, "left");
                doc.text('cÖ¯ÍvweZ Li‡Pi KviY', 63, 54, null, null, "center");
                doc.text('UvKvi cwigvb', 112, 54, null, null, "center");
                doc.text('Li‡Pi LvZ', 145, 54, null, null, "center");
                doc.text('e¨q cÖ¯ÍveKvix', 180, 54, null, null, "center");
                doc.text('wefvM/ Kg©KZ©v', 180, 60, null, null, "center");
                doc.text('†gvU:', 30, 187, null, null, "left");
                doc.setFont("SutonnyMJ", "normal");
                doc.text('†gvU UvKv (K_vq) :', 16, 196, null, null, "left");


                doc.setFont("SutonnyMJ", "bold");
                doc.text('wmGm KwgwUi mycvwik:', 16, 220, null, null, "left");
                doc.setFont("SutonnyMJ", "normal");
                doc.text('Rbve †gv. Igi dviæK nvq`vi - - - - - - - - - - - - - - - - - - - - - - - ', 16, 228, null, null, "left");
                doc.text('   "    Ac~e© ivq - - - - - -  - - - - - - - - - - - - - - - - - - - -- - - - - ', 16, 238, null, null, "left");

                doc.text('†Pqvig¨vb', 16, 280, null, null, "left");
            },
            bearer({ doc }) {

                doc.setFont("times", "normal");
                doc.setFontSize(18);
                doc.text('Centre for Mass Education in Science (CMES)', 105, 19.5, null, null, "center");
                doc.setFontSize(13);
                doc.text('House# 5/4, Block# F, Lalmatia, Dhaka - 1207', 105, 26, null, null, "center");
                doc.setFont("times", "bold");
                doc.setFontSize(18);
                doc.text('Request for Bearer Cheque', 105, 33, null, null, "center");
                doc.setFont("times", "normal");
                doc.setFontSize(13);
                doc.text('Project: .................', 105, 42, null, null, "center");
                doc.text('To', 20, 50, null, null, "left");
                doc.text('Date: ........................', 190, 50, null, null, "right");
                doc.text('The Chairman', 20, 56, null, null, "left");
                doc.text('CMES', 20, 62, null, null, "left");

                doc.text('Subject:', 20, 72, null, null, "left");
                doc.setFont("times", "bold");
                doc.text('               Request for the approval of Bearer Cheque', 20, 72, null, null, "left");


                doc.setFont("times", "normal");
                doc.text('Dear Sir,', 20, 82, null, null, "left");

                let splText = doc.splitTextToSize("We would like to request you to give an approval for issuing a Bearer Cheque in the name of Mr./Ms................................................................................. nominated by Executive Director. The reason for this request is given below:", 170);
                doc.text(splText, 20, 88, null, null, "left");

                doc.line(20, 106, 190, 106) // horizontal line
                doc.line(20, 114, 190, 114) // horizontal line

                doc.line(20, 242, 190, 242) // horizontal line
                doc.line(20, 250, 190, 250) // horizontal line  

                doc.line(20, 106, 20, 250) // vertical line
                doc.line(30, 106, 30, 250) // vertical line
                doc.line(105, 106, 105, 250) // vertical line
                doc.line(135, 106, 135, 250) // vertical line


                doc.line(190, 106, 190, 250) // vertical line


                doc.setFont("times", "normal");

                doc.text('SL', 25, 112, null, null, "center");
                doc.text('Reasons for Bearer Cheque', 67.5, 112, null, null, "center");
                doc.text('Amount/Taka', 120, 112, null, null, "center");
                doc.text('Head of Accounts', 162.5, 112, null, null, "center");
                doc.setFont("times", "bold");
                doc.text('Total', 35, 248, null, null, "left");
                doc.setFont("times", "normal");
                doc.text('Inword:', 20, 255, null, null, "left");

                doc.text('Chairman', 20, 287, null, null, "left");
                doc.text('Executive Director', 90, 287, null, null, "center");

                doc.text('Date:.................', 145, 287, null, null, "left");
                doc.text('Signature:', 145, 281, null, null, "left");
                doc.text('Name:', 145, 275, null, null, "left");
                doc.text('Requester', 145, 269, null, null, "left");

            },
            tourPlan({ doc }) {
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);
                doc.text('dig -2', 195, 12, null, null, "right"); // cmes
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(16);
                doc.text('wmGgBGm', 105, 20.5, null, null, "center"); // cmes
                doc.setFont("SutonnyMJ", "bold");
                doc.setFontSize(20);
                doc.text('ågY cwiKíbv QK', 105, 27.5, null, null, "center");
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(12);
                doc.text('(GB QK cÖ¯ÍveK Kg©KZ©vi mnvqZvq ågYKvix wb‡R c~iY Ki‡eb)', 105, 32, null, null, "center"); // cmes
                doc.setFontSize(14);

                doc.text('cÖ‡R‡±i bvgt...............................................................', 17, 42, null, null, "left");
                doc.text('1. ågYKvixi bvgt........................................................ c`ext .........................................', 17, 52, null, null, "left");
                doc.text('2. BDwbU ev BDwbU mg~nt..............................................................................................................', 17, 62, null, null, "left");
                doc.text('3. c~Y© ågY Kvjt.........................................................†_‡K................................................. ch©šÍ', 17, 72, null, null, "left");
                doc.text('4. åg‡Yi D‡Ïk¨t', 17, 82, null, null, "left");
                doc.setFontSize(12);
                doc.text('†Kvb wel‡q we‡kl Ae‡jvKb (hw` _v‡K)', 105, 95, null, null, "left");
                doc.text('(me åg‡Yi m‡½B mvaviY Ae‡jvKb AšÍf‚©³ _vK‡e)', 105, 102, null, null, "left");

                doc.setFontSize(14);
                let lnt = 80;
                let lng = 6.5;

                doc.setFontSize(14);
                doc.text('5. cÖ¯ÍvweZ ågY m~Pxt', 17, 110, null, null, "left");

                doc.setFont("SutonnyMJ", "bold");
                doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                   Kvh© m¤úv`b', 22, 120, null, null, "left");

                doc.line(17, 114, 195, 114) // horizontal line
                doc.line(17, 122, 195, 122) // horizontal line
                doc.line(17, 275, 195, 275) // horizontal line

                doc.line(17, 114, 17, 275) // vertical line
                doc.line(35, 114, 35, 275) // vertical line
                doc.line(60, 114, 60, 275) // vertical line
                doc.line(78, 114, 78, 275) // vertical line
                doc.line(110, 114, 110, 275) // vertical line
                doc.line(127, 114, 127, 275) // vertical line
                doc.line(195, 114, 195, 275) // vertical line



                doc.addPage("a4", "p");

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);
                doc.text('dig -2', 195, 12, null, null, "right"); // cmes

                doc.setFont("SutonnyMJ", "bold");
                doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                   Kvh© m¤úv`b', 22, 26, null, null, "left");

                doc.line(17, 20, 195, 20) // horizontal line
                doc.line(17, 28, 195, 28) // horizontal line
                doc.line(17, 82, 195, 82) // horizontal line

                doc.line(17, 20, 17, 82) // vertical line
                doc.line(35, 20, 35, 82) // vertical line
                doc.line(60, 20, 60, 82) // vertical line
                doc.line(78, 20, 78, 82) // vertical line
                doc.line(110, 20, 110, 82) // vertical line
                doc.line(127, 20, 127, 82) // vertical line
                doc.line(195, 20, 195, 82) // vertical line

                doc.setFont("SutonnyMJ", "normal");
                doc.text('6. Aby‡gv`bt', 17, 98, null, null, "left");
                doc.text('Aby‡gv`bKvix                                              bvg                              ¯^vÿi           gšÍe¨ (hw` _v‡K)', 17, 110, null, null, "left");
                doc.text('K) cÖ¯ÍveK Kg©KZ©v', 17, 122, null, null, "left");
                doc.text('(ågYKvix wb‡RI n‡Z cv‡i)', 17, 128, null, null, "left");
                doc.text('L) ågYKvix mswkøó', 17, 140, null, null, "left");
                doc.text('wefvMxq Kg©KZ©v', 17, 146, null, null, "left");
                doc.text('(wcGg ev wcI)', 17, 152, null, null, "left");
                doc.text('M) cÖ‡R± †Kv-AwW©‡bUi', 17, 164, null, null, "left");
                doc.text('N) wbe©vnx cwiPvjK', 17, 176, null, null, "left");
                doc.text('* cÖ‡R± †Kv-AwW©‡bUi, †WcywU cÖ‡R± †Kv-AwW©‡bUi I †cÖvMÖvg g¨v‡bRvi‡`i †ÿ‡Î ïay wbe©vnx cwiPvj‡Ki Aby‡gv`b', 17, 188, { charSpace: '-0.02' });
                doc.text('cÖ‡qvRb n‡e|', 17, 194, null, null, "left");
                doc.text('* Ab¨vb¨‡`i †ÿ‡Î me¸‡jv Aby‡gv`b cÖ‡qvRb n‡e, Z‡e Riæix †ÿ‡Î (K) I(L) wb‡q P‡j hvIqv hv‡e | (K) I (L)', 17, 200, { charSpace: '-0.05' });
                doc.text('  Aby‡gv`bKvixi cÖ_g my‡hv‡MB (M) I (N) Aby‡gv`‡bi Rb¨ AewnZ Ki‡eb|', 17, 206, null, null, "left");
                // doc.text('* K, L Ges M Aby‡gv`b nevi ci cwiKíbv cÖkvm‡b Rgv w`‡Z n‡e| cÖkvm‡b cÖ‡qvRbxq Z_¨ w`‡q wb/c Aby‡gv`‡bi', 17, 212, null, null, "left");
                doc.text('* K, L Ges M Aby‡gv`b nevi ci cwiKíbv cÖkvm‡b Rgv w`‡Z n‡e| cÖkvm‡b cÖ‡qvRbxq Z_¨ w`‡q wb/c', 17, 212, { charSpace: '0.15' });

                doc.text(' Aby‡gv`‡bi Rb¨ †cÖiY  Ki‡eb|', 17, 218, null, null, "left");


                doc.text('`ªóe¨t GB Q‡Ki Kwc åg‡Y hvÎv Kivi Av‡MB ågYKvix‡K mswkøó wefvMxq Kg©KZ©v, wbe©vnx cwiPvjK, wnmve Kg©KZ©v', 17, 232, { charSpace: '-0.04' });
                doc.text('I cÖ‡R± †Kv-AwW©‡bU‡ii Kv‡Q w`‡Z n‡e| cÖ‡R± †Kv-AwW©‡bUi me åg‡Yi LwZqvb iÿv Ki‡ebG QK c‡i mswkøó', 17, 238, null, null, "left");
                doc.text('ågY m¤úv`b Q‡Ki m‡½ hy³ n‡e| åg‡Y hvÎvi Av‡M ågYKvix Aek¨B ågY cwiKíbv QK, m¤úv`b Ges BDwbU', 17, 244, { charSpace: '0.01' });
                doc.text('Ae‡jvKb QK I Z_¨ †Rbv‡ij Awdm I †m‡µUvwi‡qU gwbUwis Awdm †_‡K msMÖn Ki‡eb Ges Zv e¨envi Ki‡eb|', 17, 250, { charSpace: '-0.01' });
                doc.text('ågY cwiKíbv I m¤úv`b wZb Kwc K‡i wnmve Ges †m‡µUvwi‡qU gwbUwis Awd‡m GK Kwc Rgv w`‡q wb‡Ri wbKU', 17, 256, { charSpace: '-0.01' });
                doc.text('GK Kwc ivL‡eb|', 17, 262, null, null, "left");

            },
            tourExecution({ doc }) {
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);
                doc.text('dig -3', 195, 12, null, null, "right"); // cmes
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(16);
                doc.text('wmGgBGm', 105, 20.5, null, null, "center"); // cmes
                doc.setFont("SutonnyMJ", "bold");
                doc.setFontSize(20);
                doc.text('ågY m¤úv`b QK', 105, 27.5, null, null, "center");
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(12);
                doc.text('(GB QK ågY †k‡l ågYKvix c~iY Ki‡eb)', 105, 32, null, null, "center"); // cmes
                doc.setFontSize(14);

                doc.text('cÖ‡R‡±i bvgt...............................................................', 17, 42, null, null, "left");
                doc.text('1. ågYKvixi bvgt........................................................ c`ext .........................................', 17, 52, null, null, "left");
                doc.text('2. BDwbU ev BDwbU mg~nt..............................................................................................................', 17, 62, null, null, "left");
                doc.text('3. c~Y© ågY Kvjt.........................................................†_‡K................................................. ch©šÍ', 17, 72, null, null, "left");
                doc.text('4. ågYm~Px I m¤úvw`Z KvRt', 17, 82, null, null, "left");

                doc.setFont("SutonnyMJ", "bold");
                doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                m¤úvw`Z KvR (ms‡ÿ‡c)', 22, 90, null, null, "left");

                doc.line(17, 85, 195, 85) // horizontal line
                doc.line(17, 92, 195, 92) // horizontal line
                doc.line(17, 275, 195, 275) // horizontal line

                doc.line(17, 85, 17, 275) // vertical line
                doc.line(35, 85, 35, 275) // vertical line
                doc.line(60, 85, 60, 275) // vertical line
                doc.line(78, 85, 78, 275) // vertical line
                doc.line(110, 85, 110, 275) // vertical line
                doc.line(127, 85, 127, 275) // vertical line
                doc.line(195, 85, 195, 275) // vertical line



                doc.addPage("a4", "p");

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);
                doc.text('dig -3', 195, 12, null, null, "right"); // cmes

                doc.setFont("SutonnyMJ", "bold");
                doc.text('ZvwiL       †Kv_v n‡Z       mgq      †Kvb ch©šÍ (¯’vb)    mgq                 m¤úvw`Z KvR (ms‡ÿ‡c)', 22, 26, null, null, "left");

                doc.line(17, 20, 195, 20) // horizontal line
                doc.line(17, 28, 195, 28) // horizontal line
                doc.line(17, 82, 195, 82) // horizontal line

                doc.line(17, 20, 17, 82) // vertical line
                doc.line(35, 20, 35, 82) // vertical line
                doc.line(60, 20, 60, 82) // vertical line
                doc.line(78, 20, 78, 82) // vertical line
                doc.line(110, 20, 110, 82) // vertical line
                doc.line(127, 20, 127, 82) // vertical line
                doc.line(195, 20, 195, 82) // vertical line

                doc.setFont("SutonnyMJ", "normal");
                doc.text('5. ågY cwiKíbvi m‡½ Awgj n‡j Zvi KviYt', 17, 98, null, null, "left");
                doc.text('6. GB ågY m¤ú‡K© gšÍe¨ I mycvwik (hw` _v‡K)', 17, 140, null, null, "left");


                doc.text('¯^vÿi', 120, 186, null, null, "left");
                doc.text('ZvwiL', 120, 198, null, null, "left");



                doc.text('`ªóe¨t GB Q‡Ki Kwc ågY †k‡l ågYKvix‡K  †m‡µUvwi‡qU Awdm I GKvD›U wefvM‡K w`‡Z n‡e| GB Kwc mswkøó', 17, 232, { charSpace: '0.01' });
                doc.text('ågY cwiKíbv Q‡Ki m‡½ mshy³ n‡e| ågY m¤úv`b QK I BDwbU Ae‡jvKb QK †divi ciciB †m‡µUvwi‡qU', 17, 238, { charSpace: '0.09' });
                doc.text('gwbUwis Awd‡m Rgv w`‡Z n‡e| ågY m¤úv`b Q‡Ki Dci Ae‡jvKb QK Rgv †`qv n‡q‡Q GB g‡g©  cÖ‡R±', 17, 244, { charSpace: '0.17' });
                doc.text('†Kv-AwW©‡bUi I †m‡µUvwi‡qU gwbUwis Awdm wefv‡Mi cÖZ¨qb †c‡j Z‡eB wnmve wefvM wUG/wWG wej MÖnY Ki‡eb |', 17, 250, { charSpace: '-0.04' });
                doc.text('GK Kwc K‡i wUG/wWG we‡ji m‡½ wej K‡i wb‡Z n‡e|', 17, 256, { charSpace: '-0.01' });
            },
            localMovement({ doc }) {

                doc.addImage("/images/cmes_logo/cmes.png", "PNG", 12, 12, 10, 15);
                doc.addImage("/images/cmes_logo/cmes.png", "PNG", 159.95, 12, 10, 15);

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(16);
                doc.text('†m›Uvi di g¨vm GWz‡Kkb Bb mv‡qÝ (wmGgBGm)', 74.25, 20.5, null, null, "center"); // cmes
                doc.text('†m›Uvi di g¨vm GWz‡Kkb Bb mv‡qÝ (wmGgBGm)', 222.75, 20.5, null, null, "center"); // cmes
                doc.setFont("SutonnyMJ", "bold");
                doc.setFontSize(16);
                doc.text('mvwf©m †m›Uvi ågY welqK QK', 74.25, 27.5, null, null, "center");
                doc.text('mvwf©m †m›Uvi ågY welqK QK', 222.75, 27.5, null, null, "center");
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);
                doc.text('ZvwiL: .........................', 12, 40, null, null, "left");
                doc.text('ZvwiL: .........................', 160.5, 40, null, null, "left");

                doc.text('eivei,', 12, 50, null, null, "left");
                doc.text('eivei,', 160.5, 50, null, null, "left");
                doc.text('wbe©vnx cwiPvjK', 12, 56, null, null, "left");
                doc.text('wbe©vnx cwiPvjK', 160.5, 56, null, null, "left");
                doc.text('wmGgBGm', 12, 62, null, null, "left");
                doc.text('wmGgBGm', 160.5, 62, null, null, "left");



                doc.text('welq: wgwUs /†Uªwbs /IqvK©kc /†mwgbvi /µqmsµvšÍ / Ab¨vb¨.................Kv‡R', 12, 72, null, null, "left");
                doc.text('        hvevi ZvrÿwYK Aby‡gv`b I AewnZKiY cÖm‡½|', 12, 78, null, null, "left");

                doc.text('welq: wgwUs /†Uªwbs /IqvK©kc /†mwgbvi /µqmsµvšÍ / Ab¨vb¨.................Kv‡R', 160.5, 72, null, null, "left");
                doc.text('        hvevi ZvrÿwYK Aby‡gv`b I AewnZKiY cÖm‡½|', 160.5, 78, null, null, "left");


                doc.text('Kv‡Ri ¯’vb:', 15, 95, null, null, "left");
                doc.text('wVKvbv:', 15, 105, null, null, "left");
                doc.text('D‡Ïk¨ :', 15, 115, null, null, "left");
                doc.text('mgqmxgv:', 15, 125, null, null, "left");

                doc.text('Kv‡Ri ¯’vb:', 163.5, 95, null, null, "left");
                doc.text('wVKvbv:', 163.5, 105, null, null, "left");
                doc.text('D‡Ïk¨ :', 163.5, 115, null, null, "left");
                doc.text('mgqmxgv:', 163.5, 125, null, null, "left");

                doc.line(12, 88, 136.5, 88) // vertical line
                doc.line(12, 98, 136.5, 98) // vertical line
                doc.line(12, 108, 136.5, 108) // vertical line
                doc.line(12, 118, 136.5, 118) // vertical line
                doc.line(12, 128, 136.5, 128) // vertical line


                doc.line(160.5, 88, 285, 88) // vertical line
                doc.line(160.5, 98, 285, 98) // vertical line
                doc.line(160.5, 108, 285, 108) // vertical line
                doc.line(160.5, 118, 285, 118) // vertical line
                doc.line(160.5, 128, 285, 128) // vertical line


                doc.line(12, 88, 12, 128) // vertical line
                doc.line(40, 88, 40, 128) // vertical line
                doc.line(136.5, 88, 136.5, 128) // vertical line

                doc.line(160.5, 88, 160.5, 128) // vertical line
                doc.line(188.5, 88, 188.5, 128) // vertical line
                doc.line(285, 88, 285, 128) // vertical line


                doc.text('webxZ,', 12, 154, null, null, "left");
                doc.text('¯^vÿi:.........................................................', 12, 171, null, null, "left");
                doc.text('bvg:...........................................................', 12, 178, null, null, "left");
                doc.text('wefvM/DBs:..................................................', 12, 185, null, null, "left");

                doc.text('Aby‡gv`bKvix', 136.5, 185, null, null, "right");


                doc.text('webxZ,', 160.5, 154, null, null, "left");
                doc.text('¯^vÿi:.........................................................', 160.5, 171, null, null, "left");
                doc.text('bvg:...........................................................', 160.5, 178, null, null, "left");
                doc.text('wefvM/DBs:..................................................', 160.5, 185, null, null, "left");

                doc.text('Aby‡gv`bKvix', 285, 185, null, null, "right");


                doc.line(148.5, 0, 148.5, 5) // vertical line  
                doc.line(148.5, 102.5, 148.5, 107.5) // vertical line
                doc.line(148.5, 205, 148.5, 210) // vertical line
            },
            gatePass({ doc }) {
                doc.addImage("/images/cmes_logo/cmes.png", "PNG", 38, 13, 10, 15);

                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(16);

                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, 20, null, null, "center");
                doc.setFontSize(13);
                doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207,†dvbt 02-223310143", 105, 26, null,
                    null, "center");
                doc.setFont("SutonnyMJ", "bold");
                doc.setFontSize(24);
                doc.text("†MU cvk", 105, 35, null, null, "center");
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);

                doc.text("ZvwiLt.................", 13, 46, null, null, "left");
                doc.text("cÖavb Kvh©vjq", 197, 46, null, null, "right");
                doc.line(13, 48, 197, 48);
                doc.line(13, 75, 197, 75);
                doc.line(13, 48, 13, 118);
                doc.line(26, 48, 26, 118);
                doc.line(100, 48, 100, 118);
                doc.line(140, 48, 140, 118);
                doc.line(197, 48, 197, 118);
                doc.line(13, 118, 197, 118);
                doc.text("µwgK", 15, 54, null, null, "left");
                doc.text("bs", 17, 61, null, null, "left");
                doc.text("gvjvgv‡ji weeiY", 45, 54, null, null, "left");
                doc.text("wK D‡Ï‡k¨ †bIqv", 105, 54, null, null, "left");
                doc.text("gvjvgvj c~Yivq †dir Avbv|", 168, 54, null, null, "center");
                doc.text("fvj Ae¯’vq ey‡S †cj wKbv Zv", 168, 60, null, null, "center");
                doc.text("Zv mv‡mi MÖnYKvix gšÍe¨ mn", 168, 66, null, null, "center");
                doc.text("¯^vÿi Ki‡eb", 168, 72, null, null, "center");
                doc.text("gvjvgvj MÖnYKvixi", 28, 139, null, null, "center");
                doc.text("bvg I ¯^vÿi", 28, 144, null, null, "center");
                doc.text("gvjvgvj mieivnKvixi", 107, 139, null, null, "center");
                doc.text("bvg I ¯^vÿi", 107, 144, null, null, "center");
                doc.text("Aby‡gv`bKvixi", 185, 139, null, null, "center");
                doc.text("bvg I ¯^vÿi", 185, 144, null, null, "center");


                //-------------------------------------
                doc.line(0, 148.5, 5, 148.5);
                doc.line(102.5, 148.5, 107.5, 148.5);
                doc.line(205, 148.5, 210, 148.5);
                //-------------------------------------

                doc.addImage("/images/cmes_logo/cmes.png", "PNG", 38, 161.5, 10, 15);
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(16);

                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, 168.5, null, null, "center");

                doc.setFontSize(13);
                doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207, †dvbt 02-223310143", 105, 174.5, null,
                    null, "center");
                doc.setFont("SutonnyMJ", "bold");
                doc.setFontSize(24);
                doc.text("†MU cvk", 105, 183.5, null, null, "center");
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(14);

                doc.text("ZvwiLt.................", 13, 194.5, null, null, "left");
                doc.text("cÖavb Kvh©vjq", 197, 194.5, null, null, "right");
                doc.line(13, 196.5, 197, 196.5);
                doc.line(13, 223.5, 197, 223.5);
                doc.line(13, 196.5, 13, 266.5);
                doc.line(26, 196.5, 26, 266.5);
                doc.line(100, 196.5, 100, 266.5);
                doc.line(140, 196.5, 140, 266.5);
                doc.line(197, 196.5, 197, 266.5);
                doc.line(13, 266.5, 197, 266.5);
                doc.text("µwgK", 15, 202.5, null, null, "left");
                doc.text("bs", 17, 61, null, null, "left");
                doc.text("gvjvgv‡ji weeiY", 45, 202.5, null, null, "left");
                doc.text("wK D‡Ï‡k¨ †bIqv", 105, 202.5, null, null, "left");
                doc.text("gvjvgvj c~Yivq †dir Avbv|", 168, 202.5, null, null, "center");
                doc.text("fvj Ae¯’vq ey‡S †cj wKbv Zv", 168, 208.6, null, null, "center");
                doc.text("Zv mv‡mi MÖnYKvix gšÍe¨ mn", 168, 214.5, null, null, "center");
                doc.text("¯^vÿi Ki‡eb", 168, 220.5, null, null, "center");
                doc.text("gvjvgvj MÖnYKvixi", 28, 287.5, null, null, "center");
                doc.text("bvg I ¯^vÿi", 28, 292.5, null, null, "center");
                doc.text("gvjvgvj mieivnKvixi", 107, 287.5, null, null, "center");
                doc.text("bvg I ¯^vÿi", 107, 292.5, null, null, "center");
                doc.text("Aby‡gv`bKvixi", 185, 287.5, null, null, "center");
                doc.text("bvg I ¯^vÿi", 185, 292.5, null, null, "center");
            },
            chalan({ doc }) {
                doc.addImage("/images/cmes_logo/cmes.png", "PNG", 10, 5, 10, 15);
                doc.setFont("SutonnyMJ", "bold");
                doc.text("Pvjvb / K¨vk †g‡gv", 74.25, 10, null, null, "center");
                doc.setFontSize(16);
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(21);
                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 80, 18, null, null, "center");

                doc.setFontSize(14);
                doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207, †dvbt 02-223310143", 80, 24, null, null, "center");

                doc.text("bs............", 10, 35, null, null, "left");
                doc.text("ZvwiLt.........................", 138.5, 35, null, null, "right");
                doc.text("bvgt..................................................................................................", 10, 45, null, null, "left");
                doc.text("wVKvbvt...............................................................................................", 10, 53, null, null, "left");

                doc.line(10, 58, 138.5, 58); // hr
                doc.line(10, 66, 138.5, 66); // hr
                doc.line(10, 175, 138.5, 175); // hr
                doc.line(10, 181, 138.5, 181); // hr

                doc.line(10, 58, 10, 181); // vr
                doc.line(22, 58, 22, 181); // vr
                doc.line(83, 58, 83, 181); // vr
                doc.line(99, 58, 99, 181); // vr
                doc.line(115, 58, 115, 181); // vr
                doc.line(138.5, 58, 138.5, 181); // vr


                doc.text("µt bs", 11, 64, null, null, "left");
                doc.text("weeiY", 45, 64, null, null, "left");
                doc.text("cwigvb", 85, 64, null, null, "left");
                doc.text("`i", 105, 64, null, null, "left");
                doc.text("UvKv", 122, 64, null, null, "left");
                doc.setFont("SutonnyMJ", "bold");
                doc.text("†gvU UvKv", 45, 180, null, null, "left");
                doc.setFont("SutonnyMJ", "normal");

                doc.text("†gvU UvKv K_vqt...................................................................................", 10, 188, null, null, "left");
                doc.text("MÖnbKvixi ¯^vÿi", 10, 205, null, null, "left");
                doc.text("wmGgBGm c‡ÿ ¯^vÿi", 138.5, 205, null, null, "right");


                //*******************************
                doc.line(148.5, 0, 148.5, 5);
                doc.line(148.5, 102.5, 148.5, 107.5);
                doc.line(148.5, 205, 148.5, 210);
                //------------------------------------

                doc.addImage("/images/cmes_logo/cmes.png", "PNG", 158.5, 5, 10, 15);
                doc.setFont("SutonnyMJ", "bold");
                doc.text("Pvjvb / K¨vk †g‡gv", 222.75, 10, null, null, "center");  /// Center
                doc.setFontSize(16);
                doc.setFont("SutonnyMJ", "normal");
                doc.setFontSize(21);
                doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 228.5, 18, null, null, "center");

                doc.setFontSize(14);
                doc.text("evwo-5/4, eøK-Gd, jvjgvwUqv, XvKv-1207, †dvbt 02-223310143", 228.5, 24, null, null, "center");

                doc.text("bs............", 158.5, 35, null, null, "left"); /// Left

                doc.text("ZvwiLt.........................", 287, 35, null, null, "right");
                doc.text("bvgt..................................................................................................", 158.5, 45, null, null, "left");
                doc.text("wVKvbvt...............................................................................................", 158.5, 53, null, null, "left");

                doc.line(158.5, 58, 287, 58); // hr
                doc.line(158.5, 66, 287, 66); // hr
                doc.line(158.5, 175, 287, 175); // hr
                doc.line(158.5, 181, 287, 181); // hr

                doc.line(158.5, 58, 158.5, 181); // vr
                doc.line(170.5, 58, 170.5, 181); // vr
                doc.line(231.5, 58, 231.5, 181); // vr
                doc.line(247.5, 58, 247.5, 181); // vr
                doc.line(263.5, 58, 263.5, 181); // vr
                doc.line(287, 58, 287, 181); // vr

                doc.text("µt bs", 159.5, 64, null, null, "left");
                doc.text("weeiY", 193.5, 64, null, null, "left");
                doc.text("cwigvb", 233.5, 64, null, null, "left");
                doc.text("`i", 253.5, 64, null, null, "left");
                doc.text("UvKv", 270.5, 64, null, null, "left");

                doc.setFont("SutonnyMJ", "bold");
                doc.text("†gvU UvKv", 193.5, 180, null, null, "left");
                doc.setFont("SutonnyMJ", "normal");
                doc.text("†gvU UvKv K_vqt...................................................................................", 158.5, 188, null, null, "left");
                doc.text("MÖnbKvixi ¯^vÿi", 158.5, 205, null, null, "left");
                doc.text("wmGgBGm c‡ÿ ¯^vÿi", 287, 205, null, null, "right");
            }
        },
        staff: {
            sc: [
                {
                    nm_un: "মোঃ মফিজুল হক",
                    nm_en: "Md. Mofigul Huq",
                    nm_bn: "†gvt gwdRyj nK",
                    deg_en: "PM",
                    deg_bn: "†cÖvMÖvg g¨v‡bRvi",
                    dt: "1997-09-08",
                    sal: "26250",
                    prj: "CORE"
                },
                {
                    nm_un: "আসলাম জামান",
                    nm_en: "Aslam Zaman",
                    nm_bn: "Avmjvg Rvgvb",
                    deg_en: "SPO",
                    deg_bn: "wmwbqi †cÖvMÖvg AM©vbvBRvi",
                    dt: "1993-05-01",
                    sal: "37289",
                    prj: "CORE"
                },
                {
                    nm_un: "মোঃ সাইফুল আলম",
                    nm_en: "Md. Saiful Alam",
                    nm_bn: "†gvt mvBdzj Avjg",
                    deg_en: "PO",
                    deg_bn: "†cÖvMÖvg AM©vbvBRvi (wnmve)",
                    dt: "2008-06-08",
                    sal: "26250",
                    prj: "CORE"
                },
                {
                    nm_un: "অমিত কুমার মহুরী",
                    nm_en: "Amit Kumare Mohury",
                    nm_bn: "AwgZ Kzgvi gûix",
                    deg_en: "PO",
                    deg_bn: "†cÖvMÖvg AM©vbvBRvi (wnmve)",
                    dt: "2008-02-09",
                    sal: "12331",
                    prj: "CORE"
                },
                {
                    nm_un: "মো: আব্দুর রহমান",
                    nm_en: "Md. Abdur Rahman",
                    nm_bn: "†gv: Avãyi ingvb",
                    deg_en: "PO(Inc)",
                    deg_bn: "wcI (BbPvR©)",
                    dt: "2002-07-21",
                    sal: "28147",
                    prj: "CORE"
                },
                {
                    nm_un: "মোহাম্মদ রেজাউল করিম",
                    nm_en: "Mohammad Rejaul Karim",
                    nm_bn: "†gvnv¤§` †iRvDj Kwig",
                    deg_en: "PO(Inc)",
                    deg_bn: "wcI (BbPvR©)",
                    dt: "2002-07-21",
                    sal: "30765",
                    prj: "CORE"
                },
                {
                    nm_un: "মো: জামাল উদ্দিন",
                    nm_en: "Md. Jamal Uddin",
                    nm_bn: "†gv: Rvgvj DwÏb",
                    deg_en: "DRIVER",
                    deg_bn: "Mvox PvjK",
                    dt: "2015-10-21",
                    sal: "25527",
                    prj: "CORE"
                },
                {
                    nm_un: "মো: লিটন পাটোয়ারী",
                    nm_en: "Md. Liton Patuary",
                    nm_bn: "†gv: wjUb cv‡Uvqvix",
                    deg_en: "GA",
                    deg_bn: "mvavib mnKvix",
                    dt: "1992-08-01",
                    sal: "19845",
                    prj: "CORE"
                },
                {
                    nm_un: "মোছা: মর্জিনা খাতুন",
                    nm_en: "Ms. Marzina Khatun",
                    nm_bn: "†gvQv: gwR©bv LvZzb",
                    deg_en: "CLEANER",
                    deg_bn: "cwi”QbœZv Kg©©x",
                    dt: "2022-06-01",
                    sal: "4500",
                    prj: "CORE"
                },



                {
                    nm_un: "অপূর্ব রায়",
                    nm_en: "Apurbo Roy",
                    nm_bn: "Ac~e© ivq",
                    deg_en: "DPC",
                    deg_bn: "†WcywU cÖ‡R± †Kv-AwW©‡bUi",
                    dt: "1997-08-06",
                    sal: "66487",
                    prj: "MC"
                },
                {
                    nm_un: "শেখ সামছুজ্জামান",
                    nm_en: "Sk. Shamsuzzaman",
                    nm_bn: "†kL mvgQz¾vgvb",
                    deg_en: "SPM",
                    deg_bn: "wmwbqi †cÖvMÖvg g¨v‡bRvi",
                    dt: "2012-07-01",
                    sal: "40793",
                    prj: "MC"
                },
                {
                    nm_un: "মো: আবুল কাসেম",
                    nm_en: "Md. Abul Kashem",
                    nm_bn: "†gv: Aveyj Kv‡mg",
                    deg_en: "SPO",
                    deg_bn: "wmwbqi †cÖvMÖvg AM©vbvBRvi",
                    dt: "2002-06-01",
                    sal: "34460",
                    prj: "MC"
                },
                {
                    nm_un: "দেওয়ান ইমরুল কায়েস",
                    nm_en: "Dewan Emrul Kayes",
                    nm_bn: "†`Iqvb Bgiæj Kv‡qm",
                    deg_en: "SPO",
                    deg_bn: "wmwbqi †cÖvMÖvg AM©vbvBRvi",
                    dt: "2008-02-01",
                    sal: "31973",
                    prj: "MC"
                },
                {
                    nm_un: "গীতা মিত্র",
                    nm_en: "Gita Mitra",
                    nm_bn: "MxZv wgÎ",
                    deg_en: "SPO",
                    deg_bn: "wmwbqi †cÖvMÖvg AM©vbvBRvi",
                    dt: "2004-07-01",
                    sal: "34926",
                    prj: "MC"
                },




                {
                    nm_un: "মো: ওমর ফারুক হায়দার",
                    nm_en: "Md. Omar Faruque Haider",
                    nm_bn: "†gv: Igi dviæK nvq`vi",
                    deg_en: "ED",
                    deg_bn: "wbe©vnx cwiPvjK",
                    dt: "2000-12-01",
                    sal: "66487",
                    prj: "IDCOL"
                },
                {
                    nm_un: "মো: হুমায়ুন কবির",
                    nm_en: "Md. Humaun Kabir",
                    nm_bn: "†gv: ûgvqyb Kwei",
                    deg_en: "PO",
                    deg_bn: "†cÖvMÖvg AM©vbvBRvi (†mvjvi)",
                    dt: "2008-01-01",
                    sal: "30996",
                    prj: "IDCOL"
                },
                {
                    nm_un: "আল আমিন  হোসেন ",
                    nm_en: "Al Amin Hossain",
                    nm_bn: "Avj Avwgb †nv‡mb",
                    deg_en: "PA",
                    deg_bn: "†cÖvMÖvg G¨vwm÷¨v›U (†mvjvi)",
                    dt: "2013-06-23",
                    sal: "24311",
                    prj: "IDCOL"
                },
                {
                    nm_un: "মো: তুহিন আক্তার",
                    nm_en: "Md. Tuhin Akter",
                    nm_bn: "†gv: Zzwnb Av³vi",
                    deg_en: "PA",
                    deg_bn: "†cÖvMÖvg G¨vwm÷¨v›U (†mvjvi)",
                    dt: "2014-10-16",
                    sal: "20056",
                    prj: "IDCOL"
                },
                {
                    nm_un: "মো: আবুল বাশার",
                    nm_en: "Md. Abul Bashar",
                    nm_bn: "†gv: Aveyj evkvi",
                    deg_en: "DRIVER",
                    deg_bn: "Mvox PvjK",
                    dt: "2004-07-05",
                    sal: "26866",
                    prj: "IDCOL"
                },
                {
                    nm_un: "মো: জসিম উদ্দিন",
                    nm_en: "Md. Jasim Uddin",
                    nm_bn: "†gv: Rwmg DwÏb",
                    deg_en: "GA",
                    deg_bn: "mvavib mnKvix",
                    dt: "2016-08-01",
                    sal: "17535",
                    prj: "IDCOL"
                },
                {
                    nm_un: "মোহাম্মদ আফজাল হোসেন",
                    nm_en: "Mohammad Afzal Hossain",
                    nm_bn: "†gvnv¤§` AvdRvj †nv‡mb",
                    deg_en: "PM",
                    deg_bn: "†cÖvMÖvg g¨v‡bRvi",
                    dt: "2022-10-31",
                    sal: "42000",
                    prj: "COL"
                },
                {
                    nm_un: "মোঃ জহুরুল হক",
                    nm_en: "Md. Zohurul Haque",
                    nm_bn: "†gvt Rûiæj nK",
                    deg_en: "SPO",
                    deg_bn: "wmwbqi †cÖvMÖvg AM©vbvBRvi",
                    dt: "2022-10-31",
                    sal: "40000",
                    prj: "COL"
                },
                {
                    nm_un: "জাকিয়া আক্তার",
                    nm_en: "Zakia Akter",
                    nm_bn: "RvwKqv Av³vi",
                    deg_en: "PO",
                    deg_bn: "†cÖvMÖvg AM©vbvBRvi",
                    dt: "2022-10-31",
                    sal: "340000",
                    prj: "COL"
                }


            ],
            field: {

            }
        },
        project: [
            {
                id: 1,
                name: "GO",
            },
            {
                id: 2,
                name: "CORE",
            },
            {
                id: 3,
                name: "IDCOL",
            },
            {
                id: 4,
                name: "MC",
            },
            {
                id: 5,
                name: "Catering",
            },
            {
                id: 6,
                name: "MOWCA",
            }
        ],
        unit: {
            bn: [
                {
                    id: 1,
                    name: "AvjxbMi"
                },
                {
                    id: 2,
                    name: "AvgZjx"
                },
                {
                    id: 3,
                    name: "Avgyqv"
                },
                {
                    id: 4,
                    name: "eKwkMÄ"
                },
                {
                    id: 5,
                    name: "`vgKzov"
                },
                {
                    id: 6,
                    name: "†`DwZ"
                },
                {
                    id: 7,
                    name: "GjvBcyi"
                },
                {
                    id: 8,
                    name: "dzjevwo"
                },
                {
                    id: 9,
                    name: "N›UvNi"
                },
                {
                    id: 10,
                    name: "†MveivZjv"
                },
                {
                    id: 11,
                    name: "nvjyqvNvU"
                },
                {
                    id: 12,
                    name: "RjXvKv"
                },
                {
                    id: 13,
                    name: "‰RšÍvcyi"
                },
                {
                    id: 14,
                    name: "Kv‡qZcvov"
                },
                {
                    id: 15,
                    name: "Lv‡minvU"
                },
                {
                    id: 16,
                    name: "Kzwocvov"
                },
                {
                    id: 17,
                    name: "gvjMvov"
                },
                {
                    id: 18,
                    name: "bvwjZvevwo"
                },
                {
                    id: 19,
                    name: "bqvw`qvwo"
                },
                {
                    id: 20,
                    name: "cv_iNvUv"
                },
                {
                    id: 21,
                    name: "ivbxie›`i"
                },
                {
                    id: 22,
                    name: "mvZevwoqv"
                },
                {
                    id: 23,
                    name: "mwLcyi"
                },
                {
                    id: 24,
                    name: "myiæR"
                },
                {
                    id: 25,
                    name: "Dwjcyi"
                },
                {
                    id: 26,
                    name: "fvUcvov"
                },
                {
                    id: 27,
                    name: "m¨vK"
                }
            ],
            en: [
                {
                    id: 1,
                    name: "Alinagar"
                },
                {
                    id: 2,
                    name: "Amtoli"
                },
                {
                    id: 3,
                    name: "Amua"
                },
                {
                    id: 4,
                    name: "Bakshiganj"
                },
                {
                    id: 5,
                    name: "Damkura"
                },
                {
                    id: 6,
                    name: "Deuty"
                },
                {
                    id: 7,
                    name: "Elaipur"
                },
                {
                    id: 8,
                    name: "Fulbari"
                },
                {
                    id: 9,
                    name: "Ghontaghar"
                },
                {
                    id: 10,
                    name: "Gobratola"
                },
                {
                    id: 11,
                    name: "Haluaghat"
                },
                {
                    id: 12,
                    name: "Jaldhaka"
                },
                {
                    id: 13,
                    name: "Jointiapur"
                },
                {
                    id: 14,
                    name: "Kayetpara"
                },
                {
                    id: 15,
                    name: "Khasherhat"
                },
                {
                    id: 16,
                    name: "Kuripara"
                },
                {
                    id: 17,
                    name: "Malgara"
                },
                {
                    id: 18,
                    name: "Nalitabari"
                },
                {
                    id: 19,
                    name: "Noyadiary"
                },
                {
                    id: 20,
                    name: "Patharghata"
                },
                {
                    id: 21,
                    name: "Ranirbandor"
                },
                {
                    id: 22,
                    name: "Satbaria"
                },
                {
                    id: 23,
                    name: "Shokhipur"
                },
                {
                    id: 24,
                    name: "Suruj"
                },
                {
                    id: 25,
                    name: "Ulipur"
                },
                {
                    id: 26,
                    name: "Vatpara"
                },
                {
                    id: 27,
                    name: "SAC"
                },
                {
                    id: 28,
                    name: "SC"
                }
            ]
        },
        honda: [
            {
                "id": 1,
                "registration": "DHAKA METRO-HA-29-6340",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47554",
                "engine": "HA10EA89E66781",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Alinagar",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-09-18",
                        "name": "Md .Mominul Islam",
                        "desig": "CM",
                        "mobile": "01736680174",
                        "location": "Alinagar",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/ckEk7Qu.jpg,https://i.imgur.com/sjVc1Bd.jpg,https://i.imgur.com/eC8Gvj1.jpg,https://i.imgur.com/GxgEuDz.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2020-02-08",
                        "name": "Md .Mominul Islam",
                        "desig": "CM",
                        "mobile": "01736680174",
                        "location": "Alinagar",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/4tmJxth.jpg,https://i.imgur.com/qx7ANEQ.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 2,
                "registration": "DHAKA METRO-HA-29-6334",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47539",
                "engine": "HA10EA89E67432",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "-",
                "unit": "Amtoli",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2011-01-12",
                        "name": "Md. Shohidul Islam",
                        "desig": "Solar At",
                        "mobile": "00",
                        "location": "Amtoli",
                        "project": "SDC & SIDA",
                        "doc_pic_link": "https://i.imgur.com/9sKzQ6q.jpg,https://i.imgur.com/hx2L48K.jpg,https://i.imgur.com/6tb6TE6.jpg",
                        "remarks": "Lost"
                    },
                    {
                        "id": 2,
                        "dt": "2014-10-28",
                        "name": "Md Zahidul Islam",
                        "desig": "UO",
                        "mobile": "01736399702",
                        "location": "Amtoli",
                        "project": "SDC & SIDA",
                        "doc_pic_link": "https://i.imgur.com/RAuQtJ9.jpg",
                        "remarks": "Lose"
                    }
                ]
            },
            {
                "id": 3,
                "registration": "DHAKA METRO-HA-29-6333",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47632",
                "engine": "HA10EA89E47632",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Amua",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2020-08-10",
                        "name": "Sameer Ranjan Sil",
                        "desig": "CM",
                        "mobile": "01724497018",
                        "location": "Amua",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/BKXAAwo.jpg,https://i.imgur.com/Cp0IDvH.jpg,https://i.imgur.com/sGv27uY.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 4,
                "registration": "DHAKA METRO-HA-41-1638",
                "reg_dt": "2011-10-20",
                "chassis": "MBLAHA10EYB9G00161",
                "engine": "HA10EFB9G00698",
                "cc": 100,
                "seat": 2,
                "made_year": 2011,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Bakshiganj",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2011-10-20",
                        "name": "Rabiul",
                        "desig": "Computer Traineer",
                        "mobile": "01727936912",
                        "location": "Bakshiganj",
                        "project": "SDC & SIDA",
                        "doc_pic_link": "https://i.imgur.com/OKsvtUc.jpg,https://i.imgur.com/Rfvzwif.jpg,https://i.imgur.com/EUyIhZK.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 5,
                "registration": "DHAKA METRO-HA-29-6336",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47596",
                "engine": "HA10EA89E66555",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Damkura",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-11-15",
                        "name": "Md. Shoriful Alam",
                        "desig": "RM",
                        "mobile": "1",
                        "location": "Damkura",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/DBTo7OH.jpg,https://i.imgur.com/dFYky0v.jpg,https://i.imgur.com/TwguiU1.jpg,https://i.imgur.com/wixowWL.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2020-01-22",
                        "name": "Md. Shoriful Alam",
                        "desig": "RM",
                        "mobile": "1",
                        "location": "Rajshahi Region",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/48HInX8.jpg,https://i.imgur.com/RULvA3C.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 6,
                "registration": "DHAKA METRO-HA-29-6328",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47511",
                "engine": "HA10EA89E67311",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Deuty",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-09-23",
                        "name": "Md. Mairur Islam",
                        "desig": "CM",
                        "mobile": "0",
                        "location": "Deuty",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/EJER9Iz.jpg,https://i.imgur.com/vNaEZMq.jpg,https://i.imgur.com/2N74B5t.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2020-02-01",
                        "name": "Md. Belal Hossain",
                        "desig": "LW",
                        "mobile": "1",
                        "location": "Jhaldhaka",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/VAXz21j.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 7,
                "registration": "DHAKA METRO-HA-29-6341",
                "reg_dt": "2008-06-29",
                "chassis": "MLHA10EE89E47535",
                "engine": "HA10EAB9E67418",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Elaipur",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-11-08",
                        "name": "Kishor Kumar Nandi",
                        "desig": "CM",
                        "mobile": "01715139073",
                        "location": "Elipur",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/XkLEoxa.jpg,https://i.imgur.com/iTwoOOV.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2020-02-08",
                        "name": "Kishor Kumar Nandi",
                        "desig": "CM",
                        "mobile": "01715139073",
                        "location": "Elipur",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/5wV7xAQ.jpg,https://i.imgur.com/dWNxqDb.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 8,
                "registration": "DHAKA METRO-HA-29-6342",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47578",
                "engine": "HA10EA89E66601",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Fulbari",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2020-02-23",
                        "name": "Md. Habubur Rahman",
                        "desig": "Computer Traineer",
                        "mobile": "01719857204",
                        "location": "Fulbari",
                        "project": "Commonwealth",
                        "doc_pic_link": "https://i.imgur.com/53ffaBS.jpg,https://i.imgur.com/50UE7gV.jpg,https://i.imgur.com/r98hi0c.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 9,
                "registration": "DHAKA METRO-HA-33-9090",
                "reg_dt": "2010-01-10",
                "chassis": "MBLHA10EE99L01834",
                "engine": "HA10EA99L16493",
                "cc": 100,
                "seat": 2,
                "made_year": 2009,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Ghontaghar",
                "project": "EDM",
                "location": [
                    {
                        "id": 1,
                        "dt": "2019-11-08",
                        "name": "Md. Moazzem Hossain",
                        "desig": "Technical Traineer- Fashion Garments",
                        "mobile": "01302474729",
                        "location": "Ghontaghar",
                        "project": "Commonwealth",
                        "doc_pic_link": "https://i.imgur.com/KmMlzqQ.jpg,https://i.imgur.com/ZprSKlD.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 10,
                "registration": "DHAKA METRO-HA-29-6338",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47503",
                "engine": "HA10EA89E67105",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Gobratola",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-10-04",
                        "name": "Md. Babul Mia",
                        "desig": "CM",
                        "mobile": "0",
                        "location": "Gobratola",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/NhIt4Mo.jpg,https://i.imgur.com/voY0amh.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2020-01-21",
                        "name": "Md. Jamal Uddin",
                        "desig": "ACM",
                        "mobile": "01799557771",
                        "location": "Gobratola",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/bNK2ETd.jpg,https://i.imgur.com/2tlinKq.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 11,
                "registration": "MYMENSINGH-HA-12-7798",
                "reg_dt": "2014-06-02",
                "chassis": "MBLHA10EZC9F00538",
                "engine": "HA10EFC9F00536",
                "cc": 100,
                "seat": 2,
                "made_year": 2014,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "GOOD",
                "unit": "Haluaghat",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-11-15",
                        "name": "Nikhil Chandra Acharjya",
                        "desig": "CM",
                        "mobile": "01736218711",
                        "location": "Alipur",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/hbDFTth.jpg,https://i.imgur.com/OjBNA4R.jpg",
                        "remarks": "Taxtoken not avilable"
                    },
                    {
                        "id": 2,
                        "dt": "2020-03-05",
                        "name": "Md. Zahidul Islam",
                        "desig": "RM",
                        "mobile": "01736399702",
                        "location": "Khaserhat",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/OzFQTVw.jpg,https://i.imgur.com/A1EOiOF.jpg,https://i.imgur.com/j8SdqDA.jpg",
                        "remarks": "https://i.imgur.com/OzFQTVw.jpg"
                    }
                ]
            },
            {
                "id": 12,
                "registration": "DHAKA METRO-HA-33-9091",
                "reg_dt": "2010-01-10",
                "chassis": "MBLHA10EE99L06093",
                "engine": "HA10EA99L15247",
                "cc": 100,
                "seat": 2,
                "made_year": 2009,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Jaldhaka",
                "project": "YSES",
                "location": [
                    {
                        "id": 1,
                        "dt": "2015-12-03",
                        "name": "Md. Akkas Ali",
                        "desig": "ACM",
                        "mobile": "1",
                        "location": "Jhaldhaka",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/g49vqOj.jpg,https://i.imgur.com/0Dj0GuA.jpg,https://i.imgur.com/uGZPIEn.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2017-12-18",
                        "name": "Bibekanando Roy",
                        "desig": "CM",
                        "mobile": "01728720799",
                        "location": "Jhaldhaka",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/lzLMNVN.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 13,
                "registration": "SYLHET-HA-13-6511",
                "reg_dt": "2013-09-05",
                "chassis": "MBLHA10EYD9B00196",
                "engine": "HA10EFD9B00449",
                "cc": 100,
                "seat": 2,
                "made_year": 2012,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "GOOD",
                "unit": "Jointiapur",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-08-18",
                        "name": "Md. Aynul Haque",
                        "desig": "CM",
                        "mobile": "01722540731",
                        "location": "Rajabari",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/qwiLCFR.jpg,https://i.imgur.com/1N74YdI.jpg,https://i.imgur.com/fTcAnzH.jpg,https://i.imgur.com/K531vr1.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 14,
                "registration": "DHAKA METRO HA-29-6326",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE59F02120",
                "engine": "HA10EA89F05072",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "GOOD",
                "unit": "Kayetpara",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2011-01-10",
                        "name": "Md. Ilias Hosen",
                        "desig": "Solar Organizer",
                        "mobile": "1",
                        "location": "Kayetpara",
                        "project": "SDC & SIDA",
                        "doc_pic_link": "https://i.imgur.com/sgqFNgX.jpg,https://i.imgur.com/pB6WC4E.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2017-01-14",
                        "name": "Md. Moinul Hosen",
                        "desig": "AC",
                        "mobile": "1",
                        "location": "Kayetpara",
                        "project": "SDC & SIDA",
                        "doc_pic_link": "https://i.imgur.com/aGQgdxY.jpg",
                        "remarks": "Lose"
                    },
                    {
                        "id": 3,
                        "dt": "2020-09-02",
                        "name": "Md. Anwar Hossain",
                        "desig": "CM",
                        "mobile": "01737208672",
                        "location": "Kayetpara",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/RwMzPrn.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 15,
                "registration": "DHAKA METRO-HA-29-6332",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47502",
                "engine": "HA10EA89E66628",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Khasherhat",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2018-03-01",
                        "name": "Md. Mizanur Rahman",
                        "desig": "CM",
                        "mobile": "1",
                        "location": "Khaserhat",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/rMjs7tI.jpg,https://i.imgur.com/18lwbWp.jpg,https://i.imgur.com/iNKZerM.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 16,
                "registration": "DHAKA METRO-HA-29-6331",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47547",
                "engine": "HA10EA89E67638",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Kuripara",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-10-04",
                        "name": "Md. Harun Ar Rashid",
                        "desig": "CM",
                        "mobile": "1",
                        "location": "Kuripara",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/D9563Vs.jpg,https://i.imgur.com/X8dNtH9.jpg,https://i.imgur.com/UOONR7G.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2017-12-31",
                        "name": "Md. Bellal Hossain",
                        "desig": "CM",
                        "mobile": "01710798105",
                        "location": "Kuripara",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/OgCH2yI.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 17,
                "registration": "DHAKA METRO-HA-33-9089",
                "reg_dt": "2010-01-10",
                "chassis": "MBLHA10EE99L06105",
                "engine": "HA10EA99L15164",
                "cc": 100,
                "seat": 2,
                "made_year": 2009,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Malgara",
                "project": "YSES",
                "location": [
                    {
                        "id": 1,
                        "dt": "2018-08-30",
                        "name": "Md. Saiful Alam",
                        "desig": "RM",
                        "mobile": "01718673426",
                        "location": "Deuty",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/2Dg3iMA.jpg,https://i.imgur.com/JhpNFo1.jpg,https://i.imgur.com/zMSiv1l.jpg,https://i.imgur.com/jZYtl6Y.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2018-12-09",
                        "name": "Md. Rashidul Islam ***",
                        "desig": "Upazila Coordinator",
                        "mobile": "1",
                        "location": "Kalapara",
                        "project": "Kishori Abhijan",
                        "doc_pic_link": "https://i.imgur.com/Q7R5mWV.jpg,https://i.imgur.com/Nijz771.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 3,
                        "dt": "2020-04-18",
                        "name": "Md. Harun Ar Rashid",
                        "desig": "CM",
                        "mobile": "01753736550",
                        "location": "Amtoli Unit",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/irJkDBs.jpg",
                        "remarks": "Take from Al Nahian Kalapara Unit K/A"
                    }

                ]
            },
            {
                "id": 18,
                "registration": "SHERPUR-HA-11-2628",
                "reg_dt": "2012-05-22",
                "chassis": "MBLHA10EYB9G-00547",
                "engine": "HA10EFB9G-02901",
                "cc": 100,
                "seat": 2,
                "made_year": 2011,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Nalitabari",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-09-28",
                        "name": "Sheikh Shahidul Islam",
                        "desig": "CM",
                        "mobile": "1",
                        "location": "Amtoli",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/fFMMFP9.jpg,https://i.imgur.com/rlXCXBb.jpg",
                        "remarks": "Good"
                    },
                    {
                        "id": 2,
                        "dt": "2020-03-24",
                        "name": "Md. Harun-or-Rashid",
                        "desig": "CM",
                        "mobile": "01753736550",
                        "location": "Amtoli",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/fgvJOdS.jpg,https://i.imgur.com/SRjBZFF.jpg,https://i.imgur.com/0OXfX43.jpg,https://i.imgur.com/9nwFhdj.jpg,https://i.imgur.com/OpT1gbr.jpg,https://i.imgur.com/Lu6kzSw.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 19,
                "registration": "DHAKA METRO-HA-29-6339",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47588",
                "engine": "HA10EA89E67442",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Noyadiary",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-11-08",
                        "name": "Md. Rejaul Karim",
                        "desig": "CM",
                        "mobile": "01734235615",
                        "location": "Noyadiari",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/VVnG5fF.jpg,https://i.imgur.com/xdgv6mH.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2020-02-04",
                        "name": "Md. Rejaul Karim",
                        "desig": "CM",
                        "mobile": "01734235615",
                        "location": "Noyadiari",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/QEEEhSo.jpg,https://i.imgur.com/yPh0nzK.jpg,https://i.imgur.com/1v6bhgm.jpg,https://i.imgur.com/2fDRufH.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 20,
                "registration": "DHAKA METRO-HA-29-6335",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47608",
                "engine": "HA10EA89E67454",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Patharghata",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-07-01",
                        "name": "Md. Shahinur Rahman",
                        "desig": "CM",
                        "mobile": "01770802838",
                        "location": "Patharghata",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/wJCGpRC.jpg,https://i.imgur.com/tOijRe0.jpg,https://i.imgur.com/MQgie6R.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 21,
                "registration": "DHAKA METRO-HA-29-6330",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47518",
                "engine": "HA10EA89E67393",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Ranirbandor",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-11-09",
                        "name": "Sudhangshu Shekhor Hawlader",
                        "desig": "CM",
                        "mobile": "1",
                        "location": "Ghontaghar",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/ZnYMXuw.jpg,https://i.imgur.com/5N7sw1Y.jpg,https://i.imgur.com/DBE5WXp.jpg,https://i.imgur.com/UzSTMHg.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2019-10-31",
                        "name": "Md. Rafiqul Islam",
                        "desig": "CM",
                        "mobile": "01718025949",
                        "location": "Ghontaghar",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/0C7qvkU.jpg,https://i.imgur.com/t1O5Y55.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 22,
                "registration": "DHAKA METRO-HA-29-6327",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47514",
                "engine": "HA10EA89E66976",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Diary",
                "unit": "Satbaria",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-11-13",
                        "name": "Md. Moniruzzaman",
                        "desig": "CM",
                        "mobile": "01784689409",
                        "location": "Satbaria",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/PKaxoCO.jpg,https://i.imgur.com/LcwP5Kg.jpg,https://i.imgur.com/yClEQzl.jpg,https://i.imgur.com/Oik00fp.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 23,
                "registration": "DHAKA METRO-HA-29-6329",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47525",
                "engine": "HA10EA89E67374",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Shokhipur",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-10-05",
                        "name": "Md. Rafiqul Islam",
                        "desig": "CM",
                        "mobile": "01785948241",
                        "location": "Shokhipur",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/mRwqfLz.jpg,https://i.imgur.com/cfuHsN3.jpg,https://i.imgur.com/V3jnQMv.jpg,https://i.imgur.com/dw0WzYU.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 24,
                "registration": "DHAKA METRO-HA-29-6325",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89F02111",
                "engine": "HA10EA89F05962",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Suruj",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2020-07-26",
                        "name": "Liton Mollik",
                        "desig": "Unit Incharge",
                        "mobile": "01740624531",
                        "location": "Suruj",
                        "project": "SDC & SIDA",
                        "doc_pic_link": "https://i.imgur.com/ZiP9vFU.jpg,https://i.imgur.com/1aSkdcy.jpg,https://i.imgur.com/PUbRp7b.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 25,
                "registration": "DHAKA METRO-HA-29-6343",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE59E47611",
                "engine": "HA10EA99E67303",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Loss",
                "unit": "Ulipur",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2011-09-12",
                        "name": "Md. Zakir Hosen",
                        "desig": "Solar Organizer",
                        "mobile": "1",
                        "location": "Deuty",
                        "project": "SDC & SIDA",
                        "doc_pic_link": "https://i.imgur.com/enPzdy7.jpg,https://i.imgur.com/XnXmmGa.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2014-02-08",
                        "name": "Bimol Chandra Roy",
                        "desig": "UO",
                        "mobile": "01717727293",
                        "location": "Ulipur",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/ytCy4C6.jpg",
                        "remarks": "Lose"
                    }
                ]
            },
            {
                "id": 26,
                "registration": "DHAKA METRO-HA-29-6337",
                "reg_dt": "2008-06-29",
                "chassis": "MBLHA10EE89E47594",
                "engine": "HA10EA89E66815",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "Original",
                "unit": "Vatpara",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2020-01-21",
                        "name": "Md. Motiur Rahman",
                        "desig": "CM",
                        "mobile": "1",
                        "location": "Damkura",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/mgx2KPf.jpg,https://i.imgur.com/ezUGj34.jpg,https://i.imgur.com/CCVeqrE.jpg,https://i.imgur.com/IQO3vOf.jpg",
                        "remarks": ""
                    },
                    {
                        "id": 2,
                        "dt": "2020-01-26",
                        "name": "Md. Nazmul Huda",
                        "desig": "LW",
                        "mobile": "1",
                        "location": "Vatpara",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/VGrvmgp.jpg",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 27,
                "registration": "RANGPUR-HA-12-9827",
                "reg_dt": "2020-02-04",
                "chassis": "",
                "engine": "",
                "cc": 97,
                "seat": 2,
                "made_year": 2008,
                "company": "MOTOR CYCLE HERO HONDA MOTOR CO.",
                "status": "OK",
                "unit": "Ulipur",
                "project": "SDC & SIDA",
                "location": [
                    {
                        "id": 1,
                        "dt": "2017-09-16",
                        "name": "Md. Kamruzzaman",
                        "desig": "CM",
                        "mobile": "01725874030",
                        "location": "Ulipur",
                        "project": "Microcredit",
                        "doc_pic_link": "https://i.imgur.com/apcul4W.jpg",
                        "remarks": "Smart card has gotten"
                    }
                ]
            }
        ],
        land: [
            {
                "id": 1,
                "unit": "Alinagar",
                "school": [
                    {
                        "school": "Bangabari",
                        "qty": "8.00",
                        "reg_dt": "2012-01-03",
                        "donors": "nill",
                        "remarks": "nill"
                    },
                    {
                        "school": "RTC",
                        "qty": "65.00",
                        "reg_dt": "1994-02-01",
                        "donors": "Hazi Jillur (50=01.02.1994, 15= 13.02.1994)",
                        "remarks": ""
                    },
                    {
                        "school": "Brojnathpur",
                        "qty": "10.00",
                        "reg_dt": "1999-02-04",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 2,
                "unit": "Amtoli",
                "school": [
                    {
                        "school": "Patakata",
                        "qty": "8.00",
                        "reg_dt": "1998-03-18",
                        "donors": "",
                        "remarks": "Mouja: Patakata"
                    },
                    {
                        "school": "Krishnanagar",
                        "qty": "15.00",
                        "reg_dt": "1999-03-01",
                        "donors": "",
                        "remarks": "Mouja: Krishnonagar"
                    },
                    {
                        "school": "RTC",
                        "qty": "76.00",
                        "reg_dt": "1992-11-08",
                        "donors": "Md Abdul Mazid Miah",
                        "remarks": "Mouja: Ghotkhali"
                    },
                    {
                        "school": "Chandra",
                        "qty": "10.00",
                        "reg_dt": "1998-11-23",
                        "donors": "",
                        "remarks": "Mouja: Chandra"
                    },
                    {
                        "school": "Raoga",
                        "qty": "24.00",
                        "reg_dt": "1999-08-31",
                        "donors": "",
                        "remarks": "Mouja: Uttarb Baria"
                    }
                ]
            },
            {
                "id": 3,
                "unit": "Amua",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "76.00",
                        "reg_dt": "1991-09-16",
                        "donors": "1. Abdul Mazed Mollah, 2. Md. Fazlul Haque Mollah, 3. Md. Abdul Sattar Mollah",
                        "remarks": "CMES buy 7 decimal, Donation 69 decimal"
                    },
                    {
                        "school": "Amua",
                        "qty": "16.00",
                        "reg_dt": "1999-03-09",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Jhorkhali",
                        "qty": "15.00",
                        "reg_dt": "1998-08-13",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Lakshipur",
                        "qty": "8.50",
                        "reg_dt": "1997-07-31",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Morichbunia",
                        "qty": "20.00",
                        "reg_dt": "1999-03-01",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 4,
                "unit": "Bakshiganj",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "45.00",
                        "reg_dt": "2011-07-10",
                        "donors": "Md. Yakub Ali, Zarina Begum",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 5,
                "unit": "Damkura",
                "school": [
                    {
                        "school": "Fulbari",
                        "qty": "12.00",
                        "reg_dt": "1999-01-31",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "85.00",
                        "reg_dt": "1991-10-19",
                        "donors": "Md. Moslem Uddin",
                        "remarks": "Land: Damkkura hat bohumukhi high school"
                    },
                    {
                        "school": "Horisardying",
                        "qty": "8.00",
                        "reg_dt": "1997-08-10",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 6,
                "unit": "Deuty",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "50.00",
                        "reg_dt": "1988-04-24",
                        "donors": "1. Md. Mozammel Hossen, 2. Md. Mahfuzar Rahman, 3. Mostafizar Rahman, 4. Mokhlesar Rahman",
                        "remarks": ""
                    },
                    {
                        "school": "Nagdah",
                        "qty": "10.00",
                        "reg_dt": "1997-08-20",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Sayedpur",
                        "qty": "10.00",
                        "reg_dt": "1999-03-11",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Sharifsadar",
                        "qty": "10.00",
                        "reg_dt": "1999-03-24",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Parul",
                        "qty": "10.00",
                        "reg_dt": "1998-11-05",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 7,
                "unit": "Elaipur",
                "school": [
                    {
                        "school": "Kendobona",
                        "qty": "10.00",
                        "reg_dt": "1998-01-12",
                        "donors": "",
                        "remarks": "Contact"
                    },
                    {
                        "school": "RTC",
                        "qty": "66.00",
                        "reg_dt": "1994-02-01",
                        "donors": "Batasu Mandal",
                        "remarks": ""
                    },
                    {
                        "school": "Mundikhoir",
                        "qty": "10.00",
                        "reg_dt": "1998-11-15",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 8,
                "unit": "Fulbari",
                "school": [
                    {
                        "school": "Charshimulbari",
                        "qty": "27.00",
                        "reg_dt": "2008-04-13",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Grokmondol",
                        "qty": "20.00",
                        "reg_dt": "2008-06-29",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "98.00",
                        "reg_dt": "2007-12-02",
                        "donors": "Mis. Nurzahan Beoa",
                        "remarks": ""
                    },
                    {
                        "school": "Chandrakhana",
                        "qty": "20.00",
                        "reg_dt": "2008-07-25",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 9,
                "unit": "Ghontaghar",
                "school": [
                    {
                        "school": "Laldighi",
                        "qty": "20.00",
                        "reg_dt": "2000-11-02",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "30.00",
                        "reg_dt": "2000-11-01",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Kushalpur",
                        "qty": "30.00",
                        "reg_dt": "2001-11-18",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 10,
                "unit": "Gobratola",
                "school": [
                    {
                        "school": "Diardhainagar",
                        "qty": "9.00",
                        "reg_dt": "1991-04-24",
                        "donors": "",
                        "remarks": "Conditional"
                    },
                    {
                        "school": "RTC",
                        "qty": "94.00",
                        "reg_dt": "1991-04-24",
                        "donors": "Md. Ansar Ali",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 11,
                "unit": "Haluaghat",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "30.00",
                        "reg_dt": "2014-03-31",
                        "donors": "Faruque Ahmed",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 12,
                "unit": "Jaldhaka",
                "school": [
                    {
                        "school": "Rotherbazar",
                        "qty": "24.00",
                        "reg_dt": "2000-11-08",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Noljhuri",
                        "qty": "20.00",
                        "reg_dt": "2000-10-19",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "65.00",
                        "reg_dt": "2002-02-13",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 13,
                "unit": "Jointiapur",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "43.55",
                        "reg_dt": "2013-03-14",
                        "donors": "Md. Rahel Ahmed,Md. Ebadur Rahman, Md. Joynal Uddin",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 14,
                "unit": "Kayetpara",
                "school": [
                    {
                        "school": "Vitipara",
                        "qty": "14.00",
                        "reg_dt": "1997-08-31",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Vitipara (Rajabari)",
                        "qty": "13.00",
                        "reg_dt": "2002-01-01",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Kuriadi",
                        "qty": "21.00",
                        "reg_dt": "1998-11-01",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "50.00",
                        "reg_dt": "1984-02-13",
                        "donors": "Mohammad Chan Mia",
                        "remarks": ""
                    },
                    {
                        "school": "Rajabari (Noagaon)",
                        "qty": "35.00",
                        "reg_dt": "2001-01-29",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Proholadpur (Rajabari)",
                        "qty": "20.00",
                        "reg_dt": "2000-12-03",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Palaid",
                        "qty": "15.00",
                        "reg_dt": "1999-06-01",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 15,
                "unit": "Khasherhat",
                "school": [
                    {
                        "school": "Morichbunia ",
                        "qty": "15.00",
                        "reg_dt": "2001-01-24",
                        "donors": "",
                        "remarks": "(Non Construction)"
                    },
                    {
                        "school": "Keoabunia",
                        "qty": "20.00",
                        "reg_dt": "1998-09-20",
                        "donors": "",
                        "remarks": "Mouja: Poschim Keoabunia"
                    },
                    {
                        "school": "Bashtola",
                        "qty": "18.00",
                        "reg_dt": "1998-11-30",
                        "donors": "",
                        "remarks": "Mouja: Hortokibaria"
                    },
                    {
                        "school": "Bazarghona",
                        "qty": "22.50",
                        "reg_dt": "1999-02-07",
                        "donors": "",
                        "remarks": "Mouja: Bazarghona"
                    },
                    {
                        "school": "Gochkhali",
                        "qty": "18.00",
                        "reg_dt": "1997-06-19",
                        "donors": "",
                        "remarks": "Mouja: Kolagachia"
                    },
                    {
                        "school": "RTC",
                        "qty": "85.00",
                        "reg_dt": "1990-09-16",
                        "donors": "1. Abdul Sottar Pada, 2. Abdul Zabbar Pada, 3. Abdul Kasem Haoladar, 4. Md. Nazes Haoladar, 5. Md. Azimuddin Haoladar.",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 16,
                "unit": "Kuripara",
                "school": [
                    {
                        "school": "Kalikapur",
                        "qty": "10.00",
                        "reg_dt": "1998-11-30",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Charbetgari",
                        "qty": "10.00",
                        "reg_dt": "1999-03-25",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Beripotol",
                        "qty": "10.00",
                        "reg_dt": "1999-05-13",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Kuralia",
                        "qty": "10.00",
                        "reg_dt": "2001-01-28",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Mohisamura",
                        "qty": "10.00",
                        "reg_dt": "1998-09-15",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "89.00",
                        "reg_dt": "1990-01-15",
                        "donors": "Mis. Jamila Khatun Beoa, Golam Abu Abedin,",
                        "remarks": "Buy: by CMES 39 decimal and donation 50 decimal, Total 89 decimal"
                    }
                ]
            },
            {
                "id": 17,
                "unit": "Malgara",
                "school": [
                    {
                        "school": "Chandrapur",
                        "qty": "25.00",
                        "reg_dt": "2009-04-13",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Paikartary",
                        "qty": "18.00",
                        "reg_dt": "2006-06-04",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Harikhoa",
                        "qty": "20.00",
                        "reg_dt": "2006-04-09",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "70.00",
                        "reg_dt": "2006-02-06",
                        "donors": "A. K. M. Sirazul Islam",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 18,
                "unit": "Nalitabari",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "39.00",
                        "reg_dt": "2012-02-23",
                        "donors": "Md. Abdul Hamid",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 19,
                "unit": "Noyadiary",
                "school": [
                    {
                        "school": "Ranibari",
                        "qty": "10.00",
                        "reg_dt": "1999-03-24",
                        "donors": "",
                        "remarks": "Conditional"
                    },
                    {
                        "school": "Salalpur",
                        "qty": "10.00",
                        "reg_dt": "1999-03-24",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "66.00",
                        "reg_dt": "1991-12-24",
                        "donors": "1. Md. Kasem Udditn, 2. Md Aaesh Uddin , 3.Md. Abdul Kalam Azad, 4.Md.  Humayun Reja, 5. Md. Ala Uddin, 6. Md. Jalal Uddin, 7. Md. Jamal Uddin, 8. Md.",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 20,
                "unit": "Patharghata",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "100.00",
                        "reg_dt": "1992-03-25",
                        "donors": "Md. Ayub Ali Mallik",
                        "remarks": ""
                    },
                    {
                        "school": "Ruhita",
                        "qty": "25.00",
                        "reg_dt": "1999-04-04",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Motherkhal",
                        "qty": "20.00",
                        "reg_dt": "1999-03-22",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Gohorpur",
                        "qty": "25.00",
                        "reg_dt": "1999-03-16",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Haritana",
                        "qty": "23.00",
                        "reg_dt": "1999-01-01",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Purbaghutabacha",
                        "qty": "15.00",
                        "reg_dt": "1998-02-15",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Macherkhal",
                        "qty": "10.00",
                        "reg_dt": "1997-12-28",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 21,
                "unit": "Ranirbandor",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "52.00",
                        "reg_dt": "1990-08-16",
                        "donors": "1. Md Wali Ullah, 2. Md. Sohidullah, 3. Md. Ahsan Ullah",
                        "remarks": "CMES buy 2 decimal and donation 50 decimal"
                    },
                    {
                        "school": "Alokdihi",
                        "qty": "10.00",
                        "reg_dt": "1999-10-14",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Goaldihi",
                        "qty": "15.00",
                        "reg_dt": "1998-12-07",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Nashratpur",
                        "qty": "10.00",
                        "reg_dt": "1999-11-22",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Gochahar",
                        "qty": "10.00",
                        "reg_dt": "1999-03-11",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Hasimpur",
                        "qty": "6.00",
                        "reg_dt": "1997-07-28",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 22,
                "unit": "Satbaria",
                "school": [
                    {
                        "school": "RTC",
                        "qty": "50.00",
                        "reg_dt": "1985-08-07",
                        "donors": "1. Choudhury Md. Nurul Haque, 2. Advocate- Sirajul Haque,  3. Maolana Ahmod, Ullah, 4. Joynal Abedin, 5. Ashab Uddin,",
                        "remarks": ""
                    },
                    {
                        "school": "Hasondandi",
                        "qty": "12.00",
                        "reg_dt": "1998-11-02",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Boiltoli",
                        "qty": "16.00",
                        "reg_dt": "1998-09-19",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 23,
                "unit": "Shokhipur",
                "school": [
                    {
                        "school": "Solaprotima",
                        "qty": "10.00",
                        "reg_dt": "1998-11-18",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Gorgobindipur",
                        "qty": "12.00",
                        "reg_dt": "1997-12-08",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Baromousha ",
                        "qty": "12.00",
                        "reg_dt": "1999-11-11",
                        "donors": "",
                        "remarks": "No infrastructure"
                    },
                    {
                        "school": "RTC",
                        "qty": "85.00",
                        "reg_dt": "1990-01-08",
                        "donors": "1. Md. Usuf Ali, 2. Abdul Jalil Miah, 3. Md. Khalilur Rahman, 4. Md. Eshak Ali, 5. Md. Ejmot Ali, 6. Md. Ashmot Ali, 7. Md. Jobed Ali.",
                        "remarks": ""
                    },
                    {
                        "school": "SAC",
                        "qty": "150.00",
                        "reg_dt": "2006-05-14",
                        "donors": "Owned property purchased by CMES",
                        "remarks": "Forestry Land"
                    }
                ]
            },
            {
                "id": 24,
                "unit": "Suruj",
                "school": [
                    {
                        "school": "PSP (2nd Campus)",
                        "qty": "30.00",
                        "reg_dt": "1994-07-14",
                        "donors": "Sreemoti Jotsna Rani",
                        "remarks": ""
                    },
                    {
                        "school": "Atapara",
                        "qty": "24.00",
                        "reg_dt": "1998-10-21",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Vukta",
                        "qty": "20.00",
                        "reg_dt": "1999-03-26",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Joshihati",
                        "qty": "10.00",
                        "reg_dt": "1998-01-04",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "55.00",
                        "reg_dt": "1981-02-12",
                        "donors": "Syed Ahammad Hossen.",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 25,
                "unit": "Ulipur",
                "school": [
                    {
                        "school": "Bazra",
                        "qty": "15.00",
                        "reg_dt": "2011-07-17",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Gunaigach",
                        "qty": "20.00",
                        "reg_dt": "2008-06-05",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Mojaidanga",
                        "qty": "15.00",
                        "reg_dt": "2008-08-13",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "90.00",
                        "reg_dt": "2008-04-24",
                        "donors": "Alhaz Md. Abdul Hai Sarkar, Doctor Md. Maudud Hossen, Md. Khairul Islam ",
                        "remarks": ""
                    }
                ]
            },
            {
                "id": 26,
                "unit": "Vatpara",
                "school": [
                    {
                        "school": "Solua",
                        "qty": "10.00",
                        "reg_dt": "1999-01-05",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "RTC",
                        "qty": "144.00",
                        "reg_dt": "1991-11-10",
                        "donors": "Md. Mofiz Uddin Sarkar, Md. Mohsin Ali",
                        "remarks": "Land: Vatpara Masjid, Madrasa and Eidghah. Donors are the member of that committee."
                    },
                    {
                        "school": "Nimpara",
                        "qty": "10.00",
                        "reg_dt": "1998-05-15",
                        "donors": "",
                        "remarks": ""
                    },
                    {
                        "school": "Chaknimpara",
                        "qty": "10.00",
                        "reg_dt": "1999-01-10",
                        "donors": "",
                        "remarks": ""
                    }
                ]
            }
        ]
    }
}
