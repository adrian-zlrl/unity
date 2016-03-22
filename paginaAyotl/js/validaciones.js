



function  validarLetras(selector)
{
	
if($(selector).val().match(/^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ_\s]+$/))
	{return true; 
	}
else{
	return false;
		}
}


function  validarNumeros(selector)
{


if($(selector).val().match(/^[0-9]+$/))
	{	
		return true; 
	}
else{
	return false;
		}


}





$( "[name='formLoginPass']" ).submit(function( event ) {
  var  oldPassword= $("[name='oldPassword']").val();
var confirmPassword =$("[name='confirmPassword']").val();
var newConfirmPassword = $("[name='newConfirmPassword']").val();

   $("#errores").empty();


if (newConfirmPassword!=confirmPassword)
{
	  $("#errores").show();
  $("#errores").append("Contraseña nueva y verificar contraseña nuevas deben ser iguales");
  event.preventDefault();

}

if (oldPassword==confirmPassword)
{
 $("#errores").show();
 $("#errores").empty();
  $("#errores").append("  La contraseña actual y la nueva contraseña no pueden ser las mismas");
  event.preventDefault();

}


});

