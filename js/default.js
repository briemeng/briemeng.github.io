/*!
  * Copyright 2018 Briem Engineering
  */
  
  
/* include HTML from w3schools.com */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

$(document).ready(function() {
  $('#contact_form').bootstrapValidator({
  // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    first_name: {
      validators: {
        stringLength: {
          min: 2,
        },
        notEmpty: {
        message: 'Please supply your first name'
        }
      }
    },
    last_name: {
      validators: {
        stringLength: {
          min: 2,
        },
          notEmpty: {
            message: 'Please supply your last name'
          }
      }
    },
    email: {
      validators: {
        notEmpty: {
          message: 'Please supply your email address'
          },
          emailAddress: {
            message: 'Please supply a valid email address'
          }
      }
    },
    phone: {
      validators: {
          notEmpty: {
            message: 'Please supply your phone number'
          },
          phone: {
            country: 'US',
            message: 'Please supply a vaild phone number with area code'
          }
      }
    },
    address: {
      validators: {
        stringLength: {
          min: 8,
        },
        notEmpty: {
          message: 'Please supply your street address'
        }
      }
    },
    city: {
      validators: {
        stringLength: {
          min: 4,
        },
        notEmpty: {
          message: 'Please supply your city'
        }
      }
    },
    state: {
      validators: {
        notEmpty: {
          message: 'Please select your state'
        }
      }
    },
    zip: {
      validators: {
        notEmpty: {
          message: 'Please supply your zip code'
        },
        zipCode: {
          country: 'US',
          message: 'Please supply a vaild zip code'
        }
      }
    },
    comment: {
      validators: {
        stringLength: {
          min: 10,
          max: 200,
          message:'Please enter at least 10 characters and no more than 200'
        },
        notEmpty: {
          message: 'Please supply a description of your project'
        }
      }
    }
  }
})
.on('success.form.bv', function(e) {
      $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
          $('#contact_form').data('bootstrapValidator').resetForm();

      // Prevent form submission
      e.preventDefault();

      // Get the form instance
      var $form = $(e.target);

      // Get the BootstrapValidator instance
      var bv = $form.data('bootstrapValidator');

      // Use Ajax to submit form data
      $.post($form.attr('action'), $form.serialize(), function(result) {
          console.log(result);
      }, 'json');
  });
});

