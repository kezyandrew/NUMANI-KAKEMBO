(function ($) {
    'use strict';

    var form = $('.contact__form'),
        message = $('.contact__msg'),
        formContainer = $('#form-container'),
        successContainer = $('#success-container'),
        form_data;

    // Reset function to show form again
    $('#send-another').on('click', function() {
        successContainer.hide();
        formContainer.show();
        form.find('input:not([type="submit"]), textarea').val('');
    });

    // Success function
    function done_func(response) {
        console.log('Success response:', response);
        // Show brief success message
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        
        // Hide the form and show the success container
        formContainer.hide();
        successContainer.fadeIn();
        
        // Reset form fields
        form.find('input:not([type="submit"]), textarea').val('');
        
        // Scroll to success message
        $('html, body').animate({
            scrollTop: successContainer.offset().top - 100
        }, 500);
    }

    // fail function
    function fail_func(data) {
        console.log('Error response:', data);
        message.fadeIn().removeClass('alert-success').addClass('alert-danger');
        message.text(data.responseText || 'Sorry, an error occurred. Please try again later.');
        setTimeout(function () {
            message.fadeOut();
        }, 5000); // Show message for 5 seconds
    }
    
    // Form submission with validation
    form.submit(function (e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Basic form validation
        var hasError = false;
        form.find('input[name="name"], input[name="email"], input[name="subject"], textarea[name="message"]').each(function() {
            if ($(this).val().trim() === '') {
                $(this).addClass('is-invalid');
                hasError = true;
                console.log('Validation error on field:', $(this).attr('name'));
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        // Email validation
        var emailInput = form.find('input[name="email"]');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.val().trim())) {
            emailInput.addClass('is-invalid');
            hasError = true;
            console.log('Email validation failed');
        }
        
        if (hasError) {
            message.fadeIn().removeClass('alert-success').addClass('alert-danger');
            message.text('Please fill in all required fields correctly.');
            setTimeout(function () {
                message.fadeOut();
            }, 5000);
            return;
        }
        
        // Remove invalid class on input focus
        form.find('input, textarea').on('focus', function() {
            $(this).removeClass('is-invalid');
        });
        
        // If validation passes, serialize and submit form
        form_data = $(this).serialize();
        console.log('Form data:', form_data);
        console.log('Submitting to:', form.attr('action'));
        
        // Show sending message
        var submitBtn = form.find('input[type="submit"]');
        var originalBtnText = submitBtn.val();
        submitBtn.val('Sending...').prop('disabled', true);
        
        // Show a loading indicator
        message.fadeIn().removeClass('alert-danger alert-success').addClass('alert-info');
        message.text('Sending your message, please wait...');
        
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data,
            dataType: 'text',
            success: function(response) {
                console.log('AJAX success:', response);
                done_func(response);
                submitBtn.val(originalBtnText).prop('disabled', false);
            },
            error: function(xhr, status, error) {
                console.log('AJAX error:', status, error);
                console.log('Response:', xhr.responseText);
                fail_func(xhr);
                submitBtn.val(originalBtnText).prop('disabled', false);
            },
            complete: function() {
                console.log('AJAX request completed');
            }
        });
    });
    
})(jQuery);