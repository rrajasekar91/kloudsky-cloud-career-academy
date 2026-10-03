const btn = document.querySelector('.mobile-btn');

const links = document.querySelector('.nav-links');

if (btn) {
    btn.addEventListener('click', () => {
        links.classList.toggle('open');
    });
}

document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () =>
        links?.classList.remove('open')
    )
);

document.querySelectorAll('[data-year]').forEach(el =>
    el.textContent = new Date().getFullYear()
);


/* =========================================================
   KloudSky Google Apps Script Form Submission
   ========================================================= */

async function submitToAppsScript(form, endpoint, type) {

    const success = form.querySelector('.success');
    const error = form.querySelector('.error');
    const button = form.querySelector('button[type="submit"]');

    success?.classList.remove('show');
    error?.classList.remove('show');

    /*
     * Check Apps Script endpoint
     */
    if (!endpoint || endpoint.includes('PASTE_YOUR')) {

        if (error) {
            error.textContent =
                'The Google Sheets endpoint is not configured yet.';
            error.classList.add('show');
        }

        return false;
    }


    /*
     * Validate form
     */
    if (!form.reportValidity()) {
        return false;
    }


    /*
     * Disable button while submitting
     */
    if (button) {
        button.disabled = true;
        button.textContent = 'Submitting...';
    }


    /*
     * Convert form fields to URL-encoded form data.
     *
     * This is important because Google Apps Script
     * reads these values through e.parameter.
     */
    const data = new URLSearchParams(
        new FormData(form)
    );


    /*
     * Apps Script expects:
     *
     * action=enquiry
     *
     * or
     *
     * action=testimonial
     */
    data.set('action', type);

    /*
     * Honeypot field.
     *
     * Real users leave this empty.
     */
    if (!data.has('website')) {
        data.set('website', '');
    }


    try {

        await fetch(endpoint, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: data.toString()
        });


        /*
         * no-cors does not allow JavaScript
         * to read the response from Apps Script.
         *
         * Therefore a successful network submission
         * is treated as submitted.
         */

        form.reset();

        success?.classList.add('show');


    } catch (e) {

        if (error) {
            error.textContent =
                'We could not submit the form right now. Please try again or contact KloudSky directly.';

            error.classList.add('show');
        }

    } finally {

        if (button) {
            button.disabled = false;
            button.textContent = 'Submit Enquiry →';
        }

    }

    return false;
}


/*
 * Contact / Enquiry form
 *
 * Example:
 *
 * submitKloudSkyForm(form, 'enquiry')
 */
window.submitKloudSkyForm = function(form, type) {

    return submitToAppsScript(
        form,
        window.KLOUDSKY_APPS_SCRIPT_URL,
        type
    );

};