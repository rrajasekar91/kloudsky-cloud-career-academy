# KloudSky Cloud Career Academy — Website V2

This version repositions KloudSky as a training-first Cloud Career Academy focused on Azure, AWS and GCP.

## Site structure
- Home
- Career Programs
- Cloud Platforms
- How We Train
- Career & Placement Assistance
- Student Reviews
- Contact / Enroll

## Google Sheets integration
The enquiry and testimonial forms are prepared for Google Apps Script.

1. Create a Google Sheet.
2. Open Extensions -> Apps Script.
3. Copy `google-apps-script/Code.gs` into the Apps Script editor.
4. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with your spreadsheet ID.
5. Run `setupHeaders()` once and authorize it.
6. Deploy -> New deployment -> Web app.
7. Execute as yourself; allow access to anyone who can access the web app.
8. Copy the Web App URL into `assets/js/config.js`.
9. Publish the website on GitHub Pages.

### Important
- Test the forms after deployment.
- Testimonials are written to the `Testimonials` sheet with `Status = Pending`. Approve them before displaying them publicly.
- Do not collect unnecessary sensitive personal information.

## Hosting
The site is static HTML/CSS/JS and can be hosted on GitHub Pages.

## Next implementation step
Replace the temporary text K logo with the final KloudSky logo asset if you want to retain the existing brand mark.
