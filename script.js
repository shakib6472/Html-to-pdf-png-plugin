jQuery(document).ready(function ($) {

    // js code for the transcript
    console.log('Certificate Plugin Working 1.1.2');
    // Get and validate session storage data
    var rawCourseInfo = sessionStorage.getItem('course_info');
    console.log(rawCourseInfo);
    var courseInfo;
    try {
        courseInfo = JSON.parse(rawCourseInfo);
        if (!courseInfo || typeof courseInfo !== 'object') {
            throw new Error('Invalid courseInfo format');
        }
    } catch (e) {
        console.log('Error retrieving or parsing courseInfo:');
        // Provide default values or handle the error as needed
        courseInfo = { data: {} };
    }

    var courseTitle = sessionStorage.getItem('course_title');
    var moduleTitles = sessionStorage.getItem('module_titles');
    var courseDescription = sessionStorage.getItem('course_description');

    // Extract required fields
    var studentName = courseInfo.data.student_name || '';
    var courseName = courseInfo.data.course_name || '';
    var courseId = courseInfo.data.course_id || '';

    // Prepare data to send to PHP script
    var data = {
        action: 'insert_transcript_data',
        certificate_url: sessionStorage.getItem('certificate_url') || '',
        certificate_number: sessionStorage.getItem('certificate_number') || '',
        student_name: studentName,
        course_name: courseName,
        course_id: courseId,
        course_title: courseTitle || '',
        module_titles: moduleTitles || '',
        course_description: courseDescription || ''
    };

    // Send AJAX request

    $.ajax({
        type: 'POST',
        data,
        dataType: 'json',
        success: function (response) {
            // Handle success response
            console.log(response);
            // Reload the window
            // location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {
            // Handle error
            console.log('Error:');
        }
    });

    // Custom JS CSS
    // HTML PDF CHECK
    /* =====================================
     * Certificate 
     * =====================================*/

    // const containerClass = '.transcript_container_css';
    const containerClass = '.certificate_container_css';
    // const downloadButton = $('.download_transcript_css');
    const downloadButton = $('.download_certificate_css');
    // const downloadButtonPdf = $('.download_transcript_pdf_css');
    const downloadButtonPdf = $('.download_certificate_pdf_css');

    const desktopWidth = 1650; // Set the desired desktop width for the image

    // Function to ensure all images within the container are fully loaded
    function ensureImagesLoaded(container, callback) {
        const images = container.find('img');
        const totalImages = images.length;
        let imagesLoaded = 0;

        if (totalImages === 0) {
            callback();
            return;
        }

        images.each(function () {
            if (this.complete) {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    callback();
                }
            } else {
                $(this).on('load', function () {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        callback();
                    }
                }).on('error', function () {
                    imagesLoaded++;
                    if (imagesLoaded === totalImages) {
                        callback();
                    }
                });
            }
        });
    }

    // Function to temporarily apply desktop styles for the download
    function applyDesktopStyles(container, width) {
        container.css({
            width: width + 'px',
            maxWidth: width + 'px',
            margin: "0 auto"
        });
    }

    // Function to revert back to the original styles
    function revertStyles(container) {
        container.css({
            width: '',
            maxWidth: '',
            margin: ''
        });
    }

    // Function to create an image and trigger download
    function createImageAndDownload() {
        const container = $(containerClass);

        if (container.length) {
            applyDesktopStyles(container, desktopWidth);

            ensureImagesLoaded(container, function () {
                html2canvas(container[0], {
                    scale: window.devicePixelRatio,
                    width: container[0].scrollWidth,
                }).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');

                    const link = $('<a></a>')
                        .attr('href', imgData)
                        .attr('download', 'certificate.png');
                    link[0].click();

                    revertStyles(container);
                }).catch(error => {
                    console.error('Error creating image:', error);
                    revertStyles(container);
                });
            });
        } else {
            console.error('Container not found.');
        }
    }

    // Function to create a PDF and trigger download
    function createPDFAndDownload() {
        const container = $('.certificate_container_css');

        if (container.length) {
            applyDesktopStyles(container, desktopWidth);

            ensureImagesLoaded(container, function () {
                // Setting a scale factor for high resolution
                const scaleFactor = 3; // You can adjust this value (2 or 3) for higher resolution
                const containerWidth = container[0].scrollWidth * scaleFactor;
                const containerHeight = container[0].offsetHeight * scaleFactor;

                // Use html2canvas with the specified scale
                html2canvas(container[0], { scale: scaleFactor }).then(function (canvas) {
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF('landscape', 'px', [containerWidth, containerHeight]);
                    const imgData = canvas.toDataURL('image/png');
                    // Adjust the position and size of the image on the PDF
                    doc.addImage(imgData, 'PNG', 0, 0, containerWidth, containerHeight);
                    doc.save('Certificate.pdf');

                    revertStyles(container);
                });
            });
        } else {
            console.error('Container not found.');
        }
    }

    if (downloadButton.length) {
        downloadButton.on('click', createImageAndDownload);
    }

    if (downloadButtonPdf.length) {
        downloadButtonPdf.on('click', createPDFAndDownload);
    }

/* =====================================
 * transcripts
 * =====================================*/

// const containerClassa = $('.transcript_container_css');
const downloadButtona = $('.download_transcript_css'); 
const downloadButtonPdfa = $('.download_transcript_pdf_css'); 

const desktopWidtha = 1200; // Set the desired desktop width for the image

// Function to ensure all images within the container are fully loaded
function ensureImagesLoadeda(container, callback) {
    const images = container.find('img');
    const totalImages = images.length;
    let imagesLoaded = 0;

    if (totalImages === 0) {
        callback();
        return;
    }

    images.each(function () {
        if (this.complete) {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                callback();
            }
        } else {
            $(this).on('load', function () {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    callback();
                }
            }).on('error', function () {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    callback();
                }
            });
        }
    });
}

// Function to temporarily apply desktop styles for the download
function applyDesktopStylesa(container, width) {
    container.css({
        width: width + 'px',
        maxWidth: width + 'px',
        margin: ""
    });
}

// Function to revert back to the original styles
function revertStylesa(container) {
    container.css({
        width: '',
        maxWidth: '',
        margin: ''
    });
}

// Function to create an image and trigger download
function createImageAndDownloada() {
    const container = $(containerClass);

    if (container.length) {
        applyDesktopStylesa(container, desktopWidtha);

        ensureImagesLoadeda(container, function () {
            html2canvas(container[0], {
                scale: window.devicePixelRatio,
                width: container[0].scrollWidth,
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');

                const link = $('<a></a>')
                    .attr('href', imgData)
                    .attr('download', 'transcript.png');
                link[0].click();

                revertStylesa(container);
            }).catch(error => {
                console.error('Error creating image:', error);
                revertStylesa(container);
            });
        });
    } else {
        console.error('Container not found.');
    }
}

// Function to create a PDF and trigger download
function createPDFAndDownloada() {
    const container = $('.transcript_container_css');

    if (container.length) {
        applyDesktopStylesa(container, desktopWidtha);

        ensureImagesLoadeda(container, function () {
            // Setting a scale factor for high resolution
            const scaleFactor = 4; // You can adjust this value (2 or 3) for higher resolution
            const containerWidth = container[0].scrollWidth * scaleFactor;
            const containerHeight = container[0].offsetHeight * scaleFactor;

            // Use html2canvas with the specified scale
            html2canvas(container[0], { scale: scaleFactor }).then(function (canvas) {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('portrait', 'px', [containerWidth, containerHeight]);
                const imgData = canvas.toDataURL('image/png');
                // Adjust the position and size of the image on the PDF
                doc.addImage(imgData, 'PNG', 0, 0, containerWidth, containerHeight);
                doc.save('transcript.pdf');

                revertStylesa(container);
            });
        });
    } else {
        console.error('Container not found.');
    }
}

if (downloadButtona.length) {
    downloadButtona.on('click', createImageAndDownloada);
}

if (downloadButtonPdfa.length) {
    downloadButtonPdfa.on('click', createPDFAndDownloada);
}



    /* =====================================
     * Data Shorten String JS
     * ====================================*/

    const heading = $('.date_of_award_css h2.elementor-heading-title.elementor-size-default');

    if (heading.length) {
        // Extract only the date part (the first 10 characters: YYYY-MM-DD)
        const originalText = heading.text().trim();
        const dateOnly = originalText.substring(0, 10);

        // Update the heading text to display only the date
        heading.text(dateOnly);
    }


    /* =====================================
     * disable right click using js
     * ====================================*/

    if ($('body').hasClass('page-id-26270')) {
        // Create the button
        var button = $('<button></button>', {
            text: 'Click to View Certificate',
            id: 'download-certificate-button',
            css: {
                display: 'block',
                margin: '-40px auto 20px auto',
                backgroundColor: '#024A59',
                color: '#FFFFFF',
                padding: '15px 30px',
                border: '2px solid #024A59',
                cursor: 'pointer',
                borderRadius: '5px',
                fontSize: '18px',
                transition: 'background-color 0.3s ease, color 0.3s ease'
            }
        });

        // Define the click event listener function
        function downloadCertificate() {
            // Retrieve the certificate number from session storage
            var certificateNumber = sessionStorage.getItem('certificate_numbers');

            $.ajax({
                type: 'POST',
                url: ajax_object.ajax_url, // WordPress AJAX URL provided via wp_localize_script
                data: {
                    action: 'get_count_checkout', // Action hook to handle the AJAX request in your functions.php
                },
                dataType: 'json',
                success: function (data) {
                    // Handle success response
                    console.log(data);

                    if (data.success) {
                        var countCheckout = data.data;
                        if (countCheckout === '1') {
                            // Redirect to the thank you page with the certificate number
                            window.location.href = ajax_object.home_url + '/thankyou-page/?certificate_number=' + certificateNumber;
                        } else {
                            // Redirect to the certificate page
                            window.location.href = ajax_object.home_url + 'product/certificate/';
                        }
                    } else {
                        console.error('Failed to retrieve count_checkout:', data.data);
                    }

                },
                error: function (xhr, textStatus, errorThrown) {
                    // Handle error
                    console.error('Error:', errorThrown);
                }
            });

            // Remove the click event listener after the first click
            button.off('click', downloadCertificate);
        }

        // Add the event listener to the button
        button.on('click', downloadCertificate);

        // Hover effect using jQuery
        button.on('mouseover', function () {
            button.css({
                backgroundColor: '#FFFFFF',
                color: '#024A59'
            });
        }).on('mouseout', function () {
            button.css({
                backgroundColor: '#024A59',
                color: '#FFFFFF'
            });
        });

        // Find the footer element and insert the button before the footer
        var footer = $('footer');
        if (footer.length) {
            footer.before(button);
        }
    }

    // Only execute if on the specific page
    if ($('body').hasClass('page-id-26270')) {
        // Retrieve certificate number when the button is clicked
        $('#download-certificate-button').on('click', function () {
            var certificateElement = $('.tutor-info-id-details');
            if (certificateElement.length) {
                var certificateNumberWithHash = certificateElement.text().trim();
                console.log('Original Certificate Number:', certificateNumberWithHash);

                // Remove the leading '#' and store the remaining part in a variable
                var certificateNumber = certificateNumberWithHash.startsWith('#') ? certificateNumberWithHash.substring(1) : certificateNumberWithHash;
                console.log('Processed Certificate Number:', certificateNumber);

                sessionStorage.setItem('certificate_numbers', certificateNumber);
            }
        });
    }

    // Check if on thank you page and modify URL
    if (window.location.pathname === '/thank-you-page') {
        const certificateNumber = sessionStorage.getItem('certificate_numbers');
        if (certificateNumber) {
            const url = new URL(window.location.href);
            url.searchParams.set('certificate_number', certificateNumber);
            window.history.replaceState({}, '', url);
        }
    }

    // Check if we are on the Thank You page
    if ($('body').hasClass('woocommerce-order-received')) {
        var certificateNumber = sessionStorage.getItem('certificate_numbers');
        console.log('On Thank You page:', $('body').hasClass('woocommerce-order-received'));
        console.log('Certificate Number:', certificateNumber);

        if (certificateNumber) {
            var thankYouPageUrl = 'http://localhost/iformat/thankyou-page/';
            var newUrl = thankYouPageUrl + '?certificate_number=' + encodeURIComponent(certificateNumber);

            // Use a flag to prevent repeated redirection
            if (!sessionStorage.getItem('redirected_' + certificateNumber)) {
                sessionStorage.setItem('redirected_' + certificateNumber, 'true');

                setTimeout(function () {
                    window.location.href = newUrl;
                }, 1000);
            } else {
                console.log('Redirection already handled for certificate number:', certificateNumber);
            }
        }
    }

    /* =====================================
  * convert module titles to proper bullets points
  * ====================================*/

    // Select the element containing the module titles
    const moduleTitlesElement = $('.module_titles_transcript_css .elementor-widget-container .elementor-shortcode');

    if (moduleTitlesElement.length) {
        // Get the text content inside the element (assumed to be a JSON array or comma-separated list)
        let rawModuleTitles = moduleTitlesElement.text().trim();

        if (rawModuleTitles) {
            // Attempt to parse the content as JSON, or split by commas if that fails
            let moduleTitlesArray;
            try {
                moduleTitlesArray = JSON.parse(rawModuleTitles);
            } catch (e) {
                moduleTitlesArray = rawModuleTitles.split(',');
            }

            // Function to remove special characters
            function removeSpecialCharacters(str) {
                return str.replace(/[^a-zA-Z0-9\s]/g, '');
            }

            // Filter and clean titles
            moduleTitlesArray = moduleTitlesArray
                .map(title => removeSpecialCharacters(title).trim()) // Remove special characters and trim whitespace
                .filter(title => title !== ""); // Remove any empty strings

            // Create an unordered list if there are valid items
            if (moduleTitlesArray.length > 0) {
                let bulletPointsHTML = '<ul>';
                moduleTitlesArray.forEach(title => {
                    bulletPointsHTML += `<li>${title}</li>`;
                });
                bulletPointsHTML += '</ul>';

                // Replace the content with the newly created bullet points
                moduleTitlesElement.html(bulletPointsHTML);
            } else {
                // If no valid titles remain, clear the content
                moduleTitlesElement.html('');
            }
        }
    }

    // Select the element containing the certificate text
    const certificateTextElement = $('.certificate_text_css .elementor-widget-container .elementor-shortcode');

    if (certificateTextElement.length) {
        // Get the text content inside the element
        let textContent = certificateTextElement.text().trim();

        if (textContent) {
            // Regex pattern to match time in formats HH:MM, HH:MM:SS, HH:MM AM/PM, or HH:MM:SS AM/PM
            const timePattern = /\b(?:[01]?\d|2[0-3]):[0-5]\d(?::[0-5]\d)?(?:\s?[APM]{2})?\b/g;

            // Remove time patterns from the text
            let cleanedText = textContent.replace(timePattern, '').trim();

            // Replace multiple spaces with a single space
            cleanedText = cleanedText.replace(/\s\s+/g, ' ');

            // Set the cleaned text back to the element
            certificateTextElement.text(cleanedText);
        }
    }
    /* =====================================
      * transcript table js
      * ====================================*/

    console.log("JavaScript file loaded.");

    var buttons = $(".tutor-btn-view-certificate");
    console.log("Found buttons:", buttons.length);

    buttons.each(function () {
        $(this).on("click", function (e) {
            e.preventDefault(); // Prevent default action to handle it manually

            var href = $(this).attr("href");
            var urlParams = new URLSearchParams(href.split('?')[1]);
            var hashId = urlParams.get('cert_hash');
            console.log("Button clicked. Hash ID:", hashId);

            // Store the href URL and hash ID in sessionStorage
            sessionStorage.setItem('certificate_url', href);
            sessionStorage.setItem('certificate_number', hashId);
            console.log("Certificate URL stored:", href);
            console.log("Certificate Number stored:", hashId);

            // Capture and store the course title
            var courseTitle = $('.tutor-course-details-title').text();
            sessionStorage.setItem('course_title', courseTitle);
            console.log("Course Title stored:", courseTitle);

            // Capture and store the course description, removing "About Course"
            var courseDescription = $('.tutor-course-details-content').text();
            courseDescription = courseDescription.replace('About Course', '').trim();
            sessionStorage.setItem('course_description', courseDescription);
            console.log("Course Description stored:", courseDescription);

            // Capture and store only the main module titles, excluding sub-elements
            var moduleTitles = [];
            $('.tutor-accordion .tutor-course-content-list-item-title').each(function () {
                var mainTitle = $(this).find('a').text().trim();
                if (!mainTitle.includes('Quiz')) {
                    moduleTitles.push(mainTitle);
                }
            });
            sessionStorage.setItem('module_titles', JSON.stringify(moduleTitles));
            console.log("Module Titles stored:", moduleTitles);

            if (!hashId) {
                console.log("No hash ID found in URL parameters.");
                return;
            }

            // Declare and define xhr for the AJAX request
            $.ajax({
                type: "POST",
                url: '/wp-admin/admin-ajax.php',
                data: { action: 'fetch_course_info', hash_id: encodeURIComponent(hashId) },
                success: function (response) {
                    console.log("AJAX request completed. Response:", response);
                    var data = JSON.parse(response);
                    if (data.error) {
                        console.error(data.error);
                    } else {
                        sessionStorage.setItem('course_info', response);

                        // Save transcript data
                        $.ajax({
                            type: "POST",
                            url: '/wp-admin/admin-ajax.php',
                            data: {
                                action: 'save_transcript_data',
                                course_id: encodeURIComponent(sessionStorage.getItem('course_id')),
                                course_name: encodeURIComponent(sessionStorage.getItem('course_name')),
                                course_description: encodeURIComponent(sessionStorage.getItem('course_description')),
                                module_titles: encodeURIComponent(sessionStorage.getItem('module_titles')),
                                certificate_url: encodeURIComponent(sessionStorage.getItem('certificate_url')),
                                certificate_number: encodeURIComponent(sessionStorage.getItem('certificate_number'))
                            },
                            success: function () {
                                console.log("Transcript data saved successfully.");
                                // Redirect to the certificate page after everything is saved
                                window.location.href = href;
                            },
                            error: function (xhr) {
                                console.log("Failed to save transcript data. Status:", xhr.status);
                                // Redirect anyway, even if the save fails
                                window.location.href = href;
                            }
                        });
                    }
                },
                error: function (xhr) {
                    console.log("AJAX request failed. Status:", xhr.status);
                    // Redirect even if the AJAX request fails
                    window.location.href = href;
                }
            });
        });
    });

    // Display course info on the test page
    var courseInfos = sessionStorage.getItem('course_info');
    if (courseInfos) {
        var info = JSON.parse(courseInfos);
        $(".student-name-placeholder").text(info.student_name);
        $(".course-id-placeholder").text(info.course_id);
        $(".course-name-placeholder").text(info.course_name);
    } else {
        console.log("No course info found in session storage.");
    }

    // Display the certificate URL on the test page
    var certificateUrl = sessionStorage.getItem('certificate_url');
    if (certificateUrl) {
        var urlContainer = $("#certificate-url");
        if (urlContainer.length) {
            urlContainer.html('<a href="' + certificateUrl + '" target="_blank" rel="noopener">' + certificateUrl + '</a>');
        } else {
            console.error("Element with ID 'certificate-url' not found.");
        }
    } else {
        console.log("No certificate URL found in session storage.");
    }

    // Display the certificate number on the test page
    var certificateNumber = sessionStorage.getItem('certificate_number');
    if (certificateNumber) {
        var numberContainer = $("#certificate-number");
        if (numberContainer.length) {
            numberContainer.text(certificateNumber);
        } else {
            console.error("Element with ID 'certificate-number' not found.");
        }
    } else {
        console.log("No certificate number found in session storage.");
    }

    // Display the course title on the test page


    // Display the course description on the test page
    var courseDescriptiona = sessionStorage.getItem('course_description');
    if (courseDescriptiona) {
        var descriptionContainer = $("#course-description");
        if (descriptionContainer.length) {
            descriptionContainer.text(courseDescriptiona);
        } else {
            console.error("Element with ID 'course-description' not found.");
        }
    } else {
        console.log("No course description found in session storage.");
    }

    // Display the module titles on the test page
    var moduleTitlesa = sessionStorage.getItem('module_titles');
    if (moduleTitlesa) {
        var modulesContainer = $("#module-titles");
        if (modulesContainer.length) {
            var modules = JSON.parse(moduleTitlesa);
            modulesContainer.html('<ul><li>' + modules.join('</li><li>') + '</li></ul>');
        } else {
            console.error("Element with ID 'module-titles' not found.");
        }
    } else {
        console.log("No module titles found in session storage.");
    }

});





