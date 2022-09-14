
export const LocalTA = ({jsPDF}) => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16 // or "smart", default is 16
    });

    let tm = 18;
    //doc.addImage("/images/format/Local_TA_Bill.jpg", "JPEG", -5, 0, 210, 148.5);
    // doc.addImage("/images/format/Local_TA_Bill.jpg", "JPEG", -5, 148.5, 210, 148.5);

    doc.setFont("SutonnyMJ", "normal");
    doc.setFontSize(20);

    doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, tm, null, null, "center");
    doc.text("¯’vbxq ågY fvZv wej", 105, tm + 7, null, null, "center");

    doc.text("†m›Uvi di g¨vm GWy‡Kkb Bb mv‡qÝ (wmGgBGm)", 105, tm + 148, null, null, "center");
    doc.text("¯’vbxq ågY fvZv wej", 105, tm + 7 + 148, null, null, "center");

    doc.setFontSize(14);
    doc.text("ågYKvixi bvg I c`ex t....................................................................", 12, tm + 19, null, null, "left");
    doc.text("ZvwiL t................................", 199, tm + 18, null, null, "right");
    doc.text("åg‡Yi D‡Ïk¨ t...............................................................................", 12, tm + 27, null, null, "left");
    doc.text("Ae¯’vb t...............................", 199, tm + 27, null, null, "right");

    doc.text("ågYKvixi bvg I c`ex t....................................................................", 12, tm + 19 + 148, null, null, "left");
    doc.text("ZvwiL t................................", 199, tm + 18 + 148, null, null, "right");
    doc.text("åg‡Yi D‡Ïk¨ t...............................................................................", 12, tm + 27 + 148, null, null, "left");
    doc.text("Ae¯’vb t...............................", 199, tm + 27 + 148, null, null, "right");


    doc.line(12, tm + 31, 199, tm + 31); // horizontal line
    doc.line(12, tm + 37, 199, tm + 37); // horizontal line
    doc.line(12, tm + 43, 199, tm + 43); // horizontal line
    doc.line(12, tm + 91, 199, tm + 91); // horizontal line
    doc.line(12, tm + 97, 199, tm + 97); // horizontal line


    doc.line(12, tm + 31 + 148, 199, tm + 31 + 148); // horizontal line
    doc.line(12, tm + 37 + 148, 199, tm + 37 + 148); // horizontal line
    doc.line(12, tm + 43 + 148, 199, tm + 43 + 148); // horizontal line
    doc.line(12, tm + 91 + 148, 199, tm + 91 + 148); // horizontal line
    doc.line(12, tm + 97 + 148, 199, tm + 97 + 148); // horizontal line

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


    doc.text("cÖ¯’vb", 32, tm + 35.5, null, null, "center"); // prosthan
    doc.text("Dcw¯’Z", 78, tm + 35.5, null, null, "center");  // uposthit
    doc.text("hvbevnb I fvZv (UvKv)", 137, tm + 35.5, null, null, "center");  // janbahon o vata taka
    doc.text("†gvU UvKv", 188, tm + 35.5, null, null, "center");  // mote taka

    doc.text("cÖ¯’vb", 32, tm + 35.5 + 148, null, null, "center"); // prosthan
    doc.text("Dcw¯’Z", 78, tm + 35.5 + 148, null, null, "center");  // uposthit
    doc.text("hvbevnb I fvZv (UvKv)", 137, tm + 35.5 + 148, null, null, "center");  // janbahon o vata taka
    doc.text("†gvU UvKv", 188, tm + 35.5 + 148, null, null, "center");  // mote taka


    doc.text("¯’vb", 27, tm + 41.5, null, null, "center"); // sthan
    doc.text("mgq", 48, tm + 41.5, null, null, "center"); // somoy
    doc.text("¯’vb", 69, tm + 41.5, null, null, "center"); // sthan
    doc.text("mgq", 92, tm + 41.5, null, null, "center"); // somoy
    doc.text("evm", 107, tm + 41.5, null, null, "center"); // bas
    doc.text("wmGbwR", 130, tm + 41.5, null, null, "center"); // cng 
    doc.text("wi·v", 151.5, tm + 41.5, null, null, "center"); // autorikshaw 
    doc.text("Ab¨vb¨", 167, tm + 41.5, null, null, "center"); // onnaono

    doc.text("¯’vb", 27, tm + 41.5 + 148, null, null, "center"); // sthan
    doc.text("mgq", 48, tm + 41.5 + 148, null, null, "center"); // somoy
    doc.text("¯’vb", 69, tm + 41.5 + 148, null, null, "center"); // sthan
    doc.text("mgq", 92, tm + 41.5 + 148, null, null, "center"); // somoy
    doc.text("evm", 107, tm + 41.5 + 148, null, null, "center"); // bas
    doc.text("wmGbwR", 130, tm + 41.5 + 148, null, null, "center"); // cng 
    doc.text("wi·v", 151.5, tm + 41.5 + 148, null, null, "center"); // autorikshaw 
    doc.text("Ab¨vb¨", 167, tm + 41.5 + 148, null, null, "center"); // onnaono


    doc.text("UvKv (K_vq)", 24, tm + 95.5, null, null, "center"); //  taka kothay
    doc.text("†gvU UvKv", 166, tm + 95.5, null, null, "center"); // mote taka

    doc.text("UvKv (K_vq)", 24, tm + 95.5 + 148, null, null, "center"); //  taka kothay
    doc.text("†gvU UvKv", 166, tm + 95.5 + 148, null, null, "center"); // mote taka


    doc.text("ågYKvixi ¯^vÿi", 12, tm + 116.5, null, null, "left"); // vromonkarir sakkhor
    doc.text("cÖwZ ¯^vÿi", 78, tm + 116.5, null, null, "center"); // proti sakkhor
    doc.text("wefvMxq cÖavb/mwPe", 135, tm + 116.5, null, null, "center"); // bivagio prodhan/ sochib
    doc.text("wnmve wefvM", 199, tm + 116.5, null, null, "right"); // hisab bivag

    doc.text("ågYKvixi ¯^vÿi", 12, tm + 116.5 + 148, null, null, "left"); // vromonkarir sakkhor
    doc.text("cÖwZ ¯^vÿi", 78, tm + 116.5 + 148, null, null, "center"); // proti sakkhor
    doc.text("wefvMxq cÖavb/mwPe", 135, tm + 116.5 + 148, null, null, "center"); // bivagio prodhan/ sochib
    doc.text("wnmve wefvM", 199, tm + 116.5 + 148, null, null, "right"); // hisab bivag


    doc.line(12, tm + 111.5, 38, tm + 111.5); // horizontal line 
    doc.line(68, tm + 111.5, 88, tm + 111.5); // horizontal line   
    doc.line(119, tm + 111.5, 150.5, tm + 111.5); // horizontal line  
    doc.line(179, tm + 111.5, 199, tm + 111.5); // horizontal line  

    doc.line(12, tm + 111.5 + 148, 38, tm + 111.5 + 148); // horizontal line 
    doc.line(68, tm + 111.5 + 148, 88, tm + 111.5 + 148); // horizontal line   
    doc.line(119, tm + 111.5 + 148, 150.5, tm + 111.5 + 148); // horizontal line  
    doc.line(179, tm + 111.5 + 148, 199, tm + 111.5 + 148); // horizontal line


    doc.save("1.pdf");
  }
