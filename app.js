var g = G$('John', 'Doe');

/** 
 * Example 1:  console.log(g);
 * 
 * Prints:
 *  Greetr.init {
 *  firstName: "John"
 *  language: "en"
 *  lastName:"Doe"
 * }
*/

/**
 * We could call greet function twice since it is chainable
 * Example 2: g.greet().greet(true);
 * 
 * Print:
 * Hello John!
 * Greetings, John Doe
*/ 

/**
 * Error case (execution will stop after this)
 * Example 3: g.greet().setLang('fr').greet(true);
 * 
 * Prints:
 * Hola John!
 * Error: Uncaught Invalid language
 */

// Hello John!
// Saludos, John Doe
g.greet().setLang('es').greet(true);

// Provides jQuery support upon clicking the login button
$('#login').click(function() {

    // Created a new Greetr object
    // Harcoding the names in the first draft
    var loginGreetr = G$('John', 'Doe');

    // Hide the login UI
    $('#logindiv').hide();

    // Chainable functions
    loginGreetr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).getLogMessage();
})

