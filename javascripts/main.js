$( document ).ready(function() {

	$('#version-selector').on("change", function(event) {
		  if(this.value === '3.3'){
		  	$('#31links').addClass('hidden');
		  	$('#33links').removeClass('hidden');
		  } else if(this.value === "3.1"){
		  	$('#33links').addClass('hidden');
		  	$('#31links').removeClass('hidden');
		  }
	});
});