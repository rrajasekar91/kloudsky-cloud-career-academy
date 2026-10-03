/**
 * KloudSky Google Sheets lead + testimonial receiver.
 * 1) Create a Google Sheet.
 * 2) Extensions -> Apps Script.
 * 3) Paste this code.
 * 4) Set SHEET_ID below.
 * 5) Deploy -> New deployment -> Web app.
 * 6) Execute as: Me. Who has access: Anyone.
 * 7) Copy the Web App URL into assets/js/config.js.
 */
const SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';

function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const type = data.type || 'enquiry';
  const sheetName = type === 'testimonial' ? 'Testimonials' : 'Enquiries';
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) sheet = ss.insertSheet(sheetName);

  const headers = type === 'testimonial'
    ? ['Timestamp','Name','Program','Platform','Rating','Review','LinkedIn','Current Role','Consent','Status']
    : ['Timestamp','Name','Email','Phone','Experience','Current Role','Career Path','Platform','Learning Mode','Message','Status'];

  if (sheet.getLastRow() === 0) sheet.appendRow(headers);

  const row = type === 'testimonial'
    ? [new Date(), data.name||'', data.program||'', data.platform||'', data.rating||'', data.review||'', data.linkedin||'', data.currentRole||'', data.consent||'', 'Pending']
    : [new Date(), data.name||'', data.email||'', data.phone||'', data.experience||'', data.currentRole||'', data.careerPath||'', data.platform||'', data.learningMode||'', data.message||'', 'New'];

  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}

function setupHeaders() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  ['Enquiries','Testimonials'].forEach(name => {
    let sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sheet.getLastRow() === 0) {
      const headers = name === 'Testimonials'
        ? ['Timestamp','Name','Program','Platform','Rating','Review','LinkedIn','Current Role','Consent','Status']
        : ['Timestamp','Name','Email','Phone','Experience','Current Role','Career Path','Platform','Learning Mode','Message','Status'];
      sheet.appendRow(headers);
    }
  });
}
