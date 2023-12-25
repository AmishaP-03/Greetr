/** 
 * We want to create a new execution context for this library so that:
 * 1. All are created variablea are safe and we only expose the required ones at the global object level
 * 2. Can be reused
 * 
 * To achieve this, we wrap our code in an IIFE
 */

/**
 * Accepts:
 * 1. Global object (windows in case of browser)
 * 2. JQuery object ($)
 * 
 * Putting a ; at the beginning to make sure that any missed termination before the Greetr library is loaded is taken care of
 */
;(function (globalObject, $) {

    // Not exposed anywhere, not a part of the returned object (so that they cannot be manipulated)
    // However can be used while creating the object (below) due to:
    // 1. Scope chain, the object's lexical env is this whole function
    // 2. Closures, it'll close in this var with the function constructor even when this IIFE is done running
    var supportedLanguages = ['en', 'es'];

    // Informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    // Formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };

    // Login messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    }

    // We want to set up Greetr in a way that it generates object
    var Greetr = function(firstName, lastName, language) {
        // Returns an object created using the function constructor Greetr.init
        return new Greetr.init(firstName, lastName, language);
    };

    // Function constructor, lets us create an object with using the 'new' keyword each time
    Greetr.init = function(firstName, lastName, language) {
        var self = this;

        // These properities will be unique to each instance of objects created using this function constructor
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        // Validate the language when an object gets created
        self.languageValidator();
    };

    // Prototype property of the function constructor.
    // We can add methods to it, the methods that we want to use from inside the object returned by Greetr (say obj)
    // The _proto__ property of obj object will point to this prototype object
    Greetr.prototype = {
        // To save memory space, the methods that will be shared by all the objects generated from Greetr.init function constructor will be added here
        getFullName: function() {
            return this.firstName + " " + this.lastName;
        },

        languageValidator: function() {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        getGreeting: function() {
            return greetings[this.language] + " " + this.firstName + "!";
        },

        getFormalGreeting: function() {
            return formalGreetings[this.language] + ", " + this.getFullName();
        },

        getMessage: function(formal) {
            if (formal) {
                return this.getFormalGreeting();
            }
            return this.getGreeting();
        },

        // Wrap the formal/informal greeting functions
        greet: function(formal) {
            var mssg = this.getMessage(formal);

            // In some browsers like IE, console variable is not defined unless the console is open. So, as a far practice, it is better to always check for console before printing anything
            if (console) {
                console.log(mssg);
            }

            // this refers to the calling object at the execution time; makes this method chainable
            return this;
        },

        getLogMessage: function() {
            if (console) {
                console.log(logMessages[this.language] + ": " + this.getFullName());
            }
            return this;
        },

        setLang: function(lang) {
            this.language = lang;
            this.languageValidator();
            return this;
        },

        // Providing JQuery support; jQuery method
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw "jQuery not loaded";
            }
            if (!selector) {
                throw "Missing jQuery selector";
            }

            var mssg = this.getMessage(formal);
            $(selector).html(mssg);

            // makes it chainable
            return this;
        }
    };

    // Trick borrowed from jQuery so that we don't have to borrow the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // Expose the Greetr function to the global object and also assigning the alias G$ to it
    globalObject.Greetr = globalObject.G$ = Greetr;

}(window, jQuery));