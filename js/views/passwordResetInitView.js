var View = require("handlebones").View;
var template = require("../tmpl/passwordResetInitForm");
var serialize = require("../util/serialize");


module.exports = View.extend({
  name: "passwordResetInitForm",
  template: template,
  events: {
    "submit form": function(event){
      event.preventDefault();
      var urlPrefix = "https://pol.is/";
      if (-1 === document.domain.indexOf("pol.is")) {
          urlPrefix = "http://localhost:5000/";
      }
      serialize(this, function(attrs){
        if (!/.@./.test(attrs.email)) {
          alert("need email");
          return;
        }
        $.ajax({
          url: urlPrefix + "v3/auth/pwresettoken",
          type: "POST",
          dataType: "json",
          xhrFields: {
              withCredentials: true
          },
          // crossDomain: true,
          data: attrs
        }).then(function(message) {
          alert(message);
        }, function(errmessage) {
          alert(errmessage);
        });
      });
    },
    "invalid": function(errors){
      console.log("invalid form input" + errors[0].name);
      console.log(errors);
     //_.each(errors, function(err){
        $("input[name=\""+errors[0].name+"\"]").closest("label").append(errors[0].message); // relationship between each input and error name
      //})
    }
  },
  validateInput: function(attrs){
    var errors = [];
    if(attrs.email === ""){
      errors.push({name: "description",  message: "Please fill in your email address."});
    }
    return errors;
  }
});