function TaoSoPhan(MauDuocChon) {
  $('#dvXemHinh').css("display", "block");
  $('#dvTaoDuLieu').css("display", "block");
  let SOPhan = $('#txtSoPhan').val();

  URLIMAGE = "img/AnhVongQuay/" + MauDuocChon + "/" + MauDuocChon + "_" + SOPhan + ".png";
  drawagainimage(URLIMAGE);
  drawimage(URLIMAGE);

  var AnhNutQuay = "img/AnhVongQuay/" + MauDuocChon + "/" + MauDuocChon + "_NutQuay.png";
  var htmlAnhNutQuay = "<div style='text-align:center;margin-top: 20px;'><img style='width: 70px;' src='" + AnhNutQuay + "'/></div>";
  htmlAnhNutQuay += "<div style='text-align:center;margin-top: 10px;'><a class='buttondv' href='" + AnhNutQuay + "' download>Tải Ảnh</a></div>"
  $('#dvAnhNutQuay').html(htmlAnhNutQuay);

  //alert($("#fileVQMM").val());
  //if ($("#fileVQMM").val())
  {

    if (parseInt(SOPhan) > 1) {

      let html = "";
      var DoXoayCoBan = (Math.PI * 2) / (parseInt(SOPhan));
      html += "<div>";
      html += "<div class='dong' style='margin-top: 10px; justify-content: left;'>";
      html += "<select id='dongfontchu' style='' onchange='XuatDuLieuVaoHinh()' >";
      html += "<option value='Times New Roman' selected='selected'>Times New Roman</option>";
      html += "<option value='Arial'>Arial</option>";
      html += "<option value='Sans-Serif'>Sans-Serif</option>";
      html += "</select>";
      html += "<select id='dongkieuchu' style='' onchange='XuatDuLieuVaoHinh()'>";
      html += "<option value='bold' selected='selected'>In đậm</option>";
      html += "<option value='italic' >In nghiêng</option>";
      //html += "<option value='underlined' >Gạch chân</option>";
      html += "<option value='oblique' >oblique</option>";
      html += "<option value='normal' >Thường</option>";
      html += "</select>";
      //html += "<input type='text' id='cochu' placeholder='Cỡ chữ' value='" + CoChuCoBan + "' style='width:100px' />";
      html += "<input oninput='XuatDuLieuVaoHinh()' type='text' id='cochu' placeholder='Cỡ chữ' value='90px' style='width:100px' />";
      html += "</div>";
      html += "</div>";

      //html += "<table>";
      for (let i = 0; i <= parseInt(SOPhan); i++) {
        let DoXoay;
        //DoXoay = DoXoayCoBan * ((2 * parseInt(i) + 1) / 2);
        DoXoay = DoXoayCoBan * (parseInt(i));

        if (i < parseInt(SOPhan)) {
          html += "<div>";
          html += "<div class='dong' style='background: #eeeeee;border-radius: 3px;padding: 3px;'>";
          html += "<p style='padding-right: 3px;text-align: center;'>Phần " + (parseInt(i) + 1) + "</p>";
          html += "<input oninput='XuatDuLieuVaoHinh()' type='text' placeholder='Text hàng 1' value='' style='width:80%' />";
          html += "<input oninput='XuatDuLieuVaoHinh()' type='text' placeholder='Text hàng 2' value='' style='width:80%' />";

          html += "<input oninput='XuatDuLieuVaoHinh()' type='text' placeholder='Tọa độ X' value='" + (ToaDoTrungTamX * (1 + (Math.cos(Math.PI / 2 - 3 * DoXoayCoBan / 4 - DoXoay) * 0.15))) + "' style='width:100px; display:none' />";
          html += "<input oninput='XuatDuLieuVaoHinh()' type='text' placeholder='Tọa độ Y' value='" + (ToaDoTrungTamY * (1 - (Math.sin(Math.PI / 2 - 3 * DoXoayCoBan / 4 - DoXoay) * 0.15))) + "' style='width:100px; display:none' />";

          html += "<input oninput='XuatDuLieuVaoHinh()' type='text' placeholder='Độ xoay' value='" + (Math.PI / 2 - DoXoayCoBan / 2 - DoXoay) + "'  style='width:100px; display:none' />"; //Math.PI * 2 / (i * 6)
          html += "<input oninput='XuatDuLieuVaoHinh()' type='color' placeholder='Màu' value='#3399FF' style='width:120px' data-jscolor='{}' />";
          html += "</div>";
          html += "</div>";
        }
      }
      //html += "</table>";

      //html += "<div>";
      //html += "<div style='text-align:center'>";
      //html += "<a class='buttondv' onclick='XuatDuLieuVaoHinh()'>Tạo Vòng Quay</a>";
      //html += "</div>";
      //html += "</div>";
      $("#dvTaoDuLieu").html(html);

      jscolor.install();
    }
  }
}

function XuatDuLieuVaoHinh() {

  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  drawagainimage(URLIMAGE);

  $("#dvTaoDuLieu").find("input[placeholder='Text hàng 1']").map((i, e) => {

    let ToaDoX = $(e).parent().find("input[placeholder='Tọa độ X']").val();
    let ToaDoY = $(e).parent().find("input[placeholder='Tọa độ Y']").val();
    let CoChu = $('#cochu').val().replace("px", "");
    //let CoChu = $(e).parent().find("input[placeholder='Cỡ chữ']").val().replace("px", "");
    let DoXoay = $(e).parent().find("input[placeholder='Độ xoay']").val();
    let Mau = $(e).parent().find("input[placeholder='Màu']").val();
    let fontchu = $('#dongfontchu').val();
    let kieuchu = $('#dongkieuchu').val();
    let text1 = $(e).parent().find("input[placeholder='Text hàng 1']").val();
    let text2 = $(e).parent().find("input[placeholder='Text hàng 2']").val();
    //if ($(e).val().length > 10) {
    if (text1.trim() != "" && text2.trim() != "") {
      let tmp = $(e).val().substring(10, $(e).val().length);
      let vitrispace = tmp.indexOf(" ");

      //let text1 = $(e).val().substring(0, 12 + vitrispace);
      //let text2 = $(e).val().substring(12 + vitrispace, $(e).val().length);



      //console.log(text1,text2)
      // * (1 - Math.cos(DoXoay)) * (1 + Math.cos(DoXoay))
      // * (1 - Math.sin(DoXoay)) * (1 + Math.sin(DoXoay))
      DrawText(parseFloat(ToaDoX) - CoChu / 2 * (Math.sin(DoXoay)),
        (parseFloat(ToaDoY) - parseFloat(CoChu) / 2 * (Math.cos(DoXoay))),
        ctx,
        font = fontchu,
        size = CoChu + "px",
        text = text1,
        rotate = DoXoay,
        kieuchu = kieuchu,
        mau = Mau);
      // * (1 - Math.cos(DoXoay)) * (1 + Math.cos(DoXoay))
      //  * (1 - Math.sin(DoXoay)) * (1 + Math.sin(DoXoay))
      DrawText(parseFloat(ToaDoX) + CoChu / 2 * (Math.sin(DoXoay)),
        (parseFloat(ToaDoY) + parseFloat(CoChu) / 2 * (Math.cos(DoXoay))),
        ctx,
        font = fontchu,
        size = CoChu + "px",
        text = text2,
        rotate = DoXoay,
        kieuchu = kieuchu,
        mau = Mau);
    } else {
      if (text1.trim() != "" && text2.trim() == "") {
        DrawText(ToaDoX,
          ToaDoY,
          ctx,
          font = fontchu,
          size = CoChu + "px",
          text = $(e).val(),
          rotate = DoXoay,
          kieuchu = kieuchu,
          mau = Mau);
      }
    }
  })
}

function XuatPNG() {
  var dataURL = canvas.toDataURL({
    pixelRatio: 3
  });
  downloadURI(dataURL, 'VQMMExport.png');
}

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

function clearCanvas(cnv) {
  var ctx = cnv.getContext('2d'); // gets reference to canvas context
  ctx.beginPath(); // clear existing drawing paths
  ctx.save(); // store the current transformation matrix

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  ctx.restore(); // restore the transform
}

var canvas = document.getElementById('canvas');
var CoChuCoBan = "20px";
var ToaDoTrungTamX = "0";
var ToaDoTrungTamY = "0";
//canvas.dataMaxWidth = canvas.width;
//canvas.dataMaxHeight = canvas.height;
var ctx = document.getElementById('canvas').getContext('2d');

function LoadMauVongQuay() {
  $('#dvXemHinh').css("display", "none");
  $('#dvTaoDuLieu').css("display", "none");
  let SoPhan = $('#txtSoPhan').val();
  var htmlMauVongQuay = "";
  htmlMauVongQuay += "<div class='conMauVongQuay' onclick='TaoSoPhan(\"Mau1\")'>";
  htmlMauVongQuay += "   <div class='TenMau'>Mẫu 1</div>";
  htmlMauVongQuay += "   <div><img src='img/AnhVongQuay/Mau1/Mau1_" + SoPhan + ".png' style='width:100px' /></div>";
  htmlMauVongQuay += "</div>";
  htmlMauVongQuay += "<div class='conMauVongQuay' onclick='TaoSoPhan(\"Mau2\")'>";
  htmlMauVongQuay += "  <div class='TenMau'>Mẫu 2</div>";
  htmlMauVongQuay += "  <div><img src='img/AnhVongQuay/Mau2/Mau2_" + SoPhan + ".png' style='width:100px' /></div>";
  htmlMauVongQuay += "</div>";
  htmlMauVongQuay += "<div class='conMauVongQuay' onclick='TaoSoPhan(\"Mau3\")'>";
  htmlMauVongQuay += "  <div class='TenMau'>Mẫu 3</div>";
  htmlMauVongQuay += "  <div><img src='img/AnhVongQuay/Mau3/Mau3_" + SoPhan + ".png' style='width:100px' /></div>";
  htmlMauVongQuay += "</div>";
  htmlMauVongQuay += "<div class='conMauVongQuay' onclick='TaoSoPhan(\"Mau4\")'>";
  htmlMauVongQuay += "  <div class='TenMau'>Mẫu 4</div>";
  htmlMauVongQuay += "  <div><img src='img/AnhVongQuay/Mau4/Mau4_" + SoPhan + ".png' style='width:100px' /></div>";
  htmlMauVongQuay += "</div>";
  htmlMauVongQuay += "<div class='conMauVongQuay' onclick='TaoSoPhan(\"Mau5\")'>";
  htmlMauVongQuay += "  <div class='TenMau'>Mẫu 5</div>";
  htmlMauVongQuay += "  <div><img src='img/AnhVongQuay/Mau5/Mau5_" + SoPhan + ".png' style='width:100px' /></div>";
  htmlMauVongQuay += "</div>";
  $('#dvMauVongQuay').html(htmlMauVongQuay);
}

var MauDuocChon = "Mau2";
var SoPhanQuay = 0;
var URLIMAGE = "img/AnhVongQuay/Mau1/Mau1_10.png";
//var URLIMAGE = "";


var URL = window.webkitURL || window.URL;


function drawagainimage(URLIMAGE) {
  debugger
  let img = new Image;
  img.src = URLIMAGE;
  //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.drawImage(img, 0, 0);
  console.log(URLIMAGE)
}

function drawimage(URLIMAGE) {
  //alert(URLIMAGE);
  debugger
  let img = new Image;
  img.onload = function () {
    let scaled = getScaledDim(img, ctx.canvas.dataMaxWidth, ctx.canvas.dataMaxHeight);
    // scale canvas to image
    ctx.canvas.width = scaled.width;
    ctx.canvas.height = scaled.height;

    //set basic
    CoChuCoBan = ctx.canvas.width / 100 * 4 + "px";
    ToaDoTrungTamX = ctx.canvas.width / 2;
    ToaDoTrungTamY = ctx.canvas.height / 2;
    //console.log(ToaDoTrungTamX, ToaDoTrungTamY)
    // draw image
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    $("#dvXemHinh").css("visibility", "")
  };
  img.src = URLIMAGE;
  console.log(URLIMAGE)
}

function handleFiles(e) {
  let reader = new FileReader();
  let file = e.target.files[0];
  // load to image to get it's width/height
  let img = new Image();
  img.onload = function () {
    // setup scaled dimensions
    let scaled = getScaledDim(img, ctx.canvas.dataMaxWidth, ctx.canvas.dataMaxHeight);
    // scale canvas to image
    ctx.canvas.width = scaled.width;
    ctx.canvas.height = scaled.height;

    //set basic
    CoChuCoBan = ctx.canvas.width / 100 * 4 + "px";
    ToaDoTrungTamX = ctx.canvas.width / 2;
    ToaDoTrungTamY = ctx.canvas.height / 2;
    //console.log(ToaDoTrungTamX, ToaDoTrungTamY)
    // draw image
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
    $("#dvXemHinh").css("visibility", "")
  }
  //
  // this is to setup loading the image
  reader.onloadend = function () {
    img.src = reader.result;
  }
  // this is to read the file
  reader.readAsDataURL(file);
}

// returns scaled dimensions object
function getScaledDim(img, maxWidth, maxHeight) {
  let scaled = {
    ratio: img.width / img.height,
    width: img.width,
    height: img.height
  }
  if (scaled.width > maxWidth) {
    scaled.width = maxWidth;
    scaled.height = scaled.width / scaled.ratio;
  }
  if (scaled.height > maxHeight) {
    scaled.height = maxHeight;
    scaled.width = scaled.height / scaled.ratio;
  }
  return scaled;
}

function DrawText(toadox, toadoy, ctx, font = "Times New Roman", size = "13px", text = "Hello World!", rotate = "0", kieuchu = "bold", mau = "black") {

  ctx.save();
  ctx.translate(toadox, toadoy);

  //ctx.shadowOffsetX = 10;
  //ctx.shadowOffsetY = 10;
  //ctx.shadowBlur = 4;
  //ctx.shadowColor="grey";

  ctx.font = kieuchu + " " + size + " " + font;
  //ctx.rotate(Math.PI * 2 / (i * 6));
  ctx.rotate(-rotate);
  //ctx.translate(x, y);
  ctx.fillStyle = mau;
  //ctx.fillText(text, toadox, toadoy);
  ctx.fillText(text, toadox * 0.15, 0);



  ctx.restore();
  //console.log("ok")
};

$(document).ready(function () {
  drawimage(URLIMAGE);
  LoadMauVongQuay();
  $('#dvXemHinh').css("display", "none");
  $('#dvTaoDuLieu').css("display", "none");
});