document.addEventListener("DOMContentLoaded", function() {
  window.process = {
	  argv: ["cryptoverif", "cryptoverif", "-lib", "/static/default.cvl", "/static/signedDH-DDH.cv"],
	  stdout: { write: function(txt) { document.getElementById("output").innerHTML += txt; console.log(txt); } }
  };
  setTimeout(function(){cryptoverif(window);}, 100);
});

