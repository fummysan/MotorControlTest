function doGet(e) {
  // スプレッドシートオブジェクトを取得
  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getActiveSheet();
  var flug_num = sheet.getRange('A1').getDisplayValue()


  var output = ContentService.createTextOutput(flug_num);
  output.setMimeType(ContentService.MimeType.TEXT);
  return output;
}

function setFlag(e) {
  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getActiveSheet();

  if(sheet.getRange('A1').getDisplayValue() == "-1"){
    sheet.getRange('A1').setValue("1")
  } else {
    sheet.getRange('A1').setValue("-1")
  }
}

function setStopFlag(e) {
  var ss = SpreadsheetApp.getActive()
  var sheet = ss.getActiveSheet();

  sheet.getRange('A1').setValue("0")
}
