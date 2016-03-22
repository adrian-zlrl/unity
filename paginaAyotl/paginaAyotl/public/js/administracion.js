     

// para rellenar los campos de centros de trabajo a partir de la seleccion de un distrito en los select's


$("[name='usuarioSistema']").on('click', function(e) {

    // prevents the event from bubbling up the DOM tree
    // eg the modal from cancelling the event
    e.stopImmediatePropagation();

    var checked = (e.currentTarget.checked) ? false : true;
    e.currentTarget.checked=(checked) ? false : checked.toString();
});

 


   $("[name='extAgDistrito']").click(function() 
      {       
        var idDistrito = $("[name='extAgDistrito']").val();
        var destino ="[name='extAgCentro']";
        if(idDistrito!='default')
            {buscarAjax(idDistrito,destino);}
       });




   $("[name='extEdDistrito']").click(function() 
      {       
        var idDistrito = $("[name='extEdDistrito']").val();
        var destino ="[name='extEdCentro']";
         if(idDistrito!='default')
            {
   
              buscarAjax(idDistrito,destino);}
       });




    $("[name='personaAgDistrito']").click(function() 
      {       
        var idDistrito = $("[name='personaAgDistrito']").val();
        var destino ="[name='personaAgCentro']";
         if(idDistrito!='default')
            {
   
              buscarAjax(idDistrito,destino);}
     });




   $("[name='personaEdDistrito']").click(function() 
      {       
        var idDistrito = $("[name='personaEdDistrito']").val();
        var destino ="[name='personaEdCentro']";
         if(idDistrito!='default')
            {
   
              buscarAjax(idDistrito,destino);}
       });


//funcion ajax para centros de trabajo
 function buscarAjax(idDistrito,destino)  {
    $.ajax( '/centros',{type: 'GET',dataType: 'json',data:{id:idDistrito},success: function( data ) 
                                             {$(destino).empty().append('<option selected="selected" value="default">SELECCIONAR CENTRO</option>');
                                                var options = $(destino);$.each (data, function (i) {
                                                options.append($("<option />").val(data[i].idcentrotrabajo).text(data[i].centrotrabajo));
                                                 });   
                                                       },
                      error: function(  ){console.log( 'respuesta incorrecta ajax' );}});
   }


// para  rellenar los campos de personas y extensiones en base a la seleccion de un centro de trabajo


   $("[name='personaAgCentro']").click(function() 
      {       
        var idDistrito = $("[name='personaAgCentro']").val();
        var destino1 ="[name='personaAgExtension']";
        var destino2 ="[name='personaAgJefe']";
         if(idDistrito!='default')
            {   
              buscarAjaxExtension(idDistrito,destino1);
             buscarAjaxPersona(idDistrito,destino2);
            }
       });


   $("[name='personaEdCentro']").click(function() 
      {       
        var idDistrito = $("[name='personaEdCentro']").val();
        var destino1 ="[name='personaEdExtension']";
        var destino2 ="[name='personaEdJefe']";
         if(idDistrito!='default')
            {   
              buscarAjaxExtension(idDistrito,destino1);
             buscarAjaxPersona(idDistrito,destino2);
            }
       });


   //funcion ajax para buscar personas y extensiones por centro de trabajo
 function buscarAjaxExtension(idDistrito,destino)  {
    $.ajax( '/extensiones',{type: 'GET',dataType: 'json',data:{id:idDistrito},success: function( data ) 
                                             {$(destino).empty().append('<option selected="selected" value="default">SELECCIONAR EXTENSION</option>');
                                                var options = $(destino);$.each (data, function (i) {
                                                options.append($("<option />").val(data[i].idextension).text(data[i].descripcion));
                                                 });   
                                                       },
                      error: function(  ){console.log( 'respuesta incorrecta ajax' );}});
   }

    function buscarAjaxPersona(idDistrito,destino)  {
    $.ajax( '/personas',{type: 'GET',dataType: 'json',data:{id:idDistrito},success: function( data ) 
                                             {$(destino).empty().append('<option selected="selected" value="default">SELECCIONAR JEFE</option>');
                                                var options = $(destino);
                                                $.each (data, function (i) {
                                                options.append($("<option />").val(data[i].idpersona).text(
                                                    data[i].abreviatura+' '+data[i].nombre+' '+  data[i].apellidopaterno+' '+data[i].apellidomaterno   
                                                   ));
                                                 });   
                                                       },
                      error: function(  ){console.log( 'respuesta incorrecta ajax' );}});
   }


// para guardar por ajax  personas  en el submit del form

$("#agregarPersona").on("click", function(e) {
              e.preventDefault(); 
              var usuarioSistema =1;
              var isValid = true;
              $("[name='personaAgNombre'],[name='personaAgPaterno'],[name='personaAgMaterno']").each(function () {
              if ($.trim($(this).val()) == '') {
              isValid = false;
              $(this).css({
              "border": "1px solid red",
              "background": "#FFCECE"
              });
              }
              else {
              $(this).css({
              "border": "",
              "background": ""
              });
              }
              });
              $('#personaAgNombreError').hide();
              $('#personaAgPaternoError').hide();
              $('#personaAgMaternoError').hide();
              $('#personaAgProfesionError').hide();
              $('#personaAgPuestoError').hide();
              $('#personaAgDistritoError').hide();
              $('#personaAgCentroError').hide();
              $('#personaAgJefeError').hide();
              $('#personaAgExtensionError').hide();
              var nombre =  $("[name='personaAgNombre']").val();
              var paterno =  $("[name='personaAgPaterno']").val();
              var materno =  $("[name='personaAgMaterno']").val();
              var profesion =$("[name='personaAgProfesion']").val();
              var puesto=$("[name='personaAgPuesto']").val();
              var distrito=$("[name='personaAgDistrito']").val();
              var centro=$("[name='personaAgCentro']").val();
              var jefe=$("[name='personaAgJefe']").val();
              var extension=$("[name='personaAgExtension']").val();
              if( $("[name='usuarioSistema']").is(':checked') )
              {usuarioSistema=0;}    
              if( validarLetras("[name='personaAgNombre']")&&validarLetras("[name='personaAgPaterno']")&&nombre.trim().length>0 && paterno.trim().length>0 && profesion!='default'&& puesto!='default' && distrito!='default' && centro!='default' && jefe!='default' )
              {                  

            if(extension=='default')   {extension='1'}               

              $.ajax( '/savepersonas',{
              type: 'GET',
              dataType:'json',
              data:{nombre:nombre,paterno:paterno,materno:materno,profesion:profesion,puesto:puesto,distrito:distrito,centro:centro,jefe:jefe,extension:extension,usuariosistema:usuarioSistema},
              success: function( data ) 
              {                                                        
              $.each (data, function (i) {
              if(data[i])
              {
              alert('Exito al agregar persona');                                                                                               
              $('#personasModel').modal('hide');
              }else
              {
              alert(data[i]);
              $('#personasModel').modal('hide');
              }
              $("[name='personaAgNombre']").val('');
              $("[name='personaAgPaterno']").val('');
              $("[name='personaAgMaterno']").val('');
              $("[name='personaAgProfesion']").prop('selectedIndex',0);
              $("[name='personaAgPuesto']").prop('selectedIndex',0);
              $("[name='personaAgDistrito']").prop('selectedIndex',0);
              $("[name='personaAgCentro']").prop('selectedIndex',0);
              $("[name='personaAgJefe']").prop('selectedIndex',0);
              $("[name='personaAgExtension']").prop('selectedIndex',0);
              });
              },
              error: function()
              {
              console.log( 'respuesta incorrecta ajax' );
              }
              }
              );                           
              }else{
              if( nombre.trim().length==0){ $('#personaAgNombreError').show();}
              if( paterno.trim().length==0 ){ $('#personaAgPaternoError').show();}
             // if( materno.trim().length==0 ){ $('#personaAgMaternoError').show();}
              if( profesion=='default'){ $('#personaAgProfesionError').show();}
              if( puesto=='default'){ $('#personaAgPuestoError').show();}
              if( distrito=='default'){ $('#personaAgDistritoError').show();}
              if( centro=='default'){ $('#personaAgCentroError').show();}
              if( jefe=='default'){ $('#personaAgJefeError').show();}
             
              }
    });


//funciones para buscar personas en el modal edicion de personas

$("[name='buscarEdPersona']").keydown(function() {
      var persona =$("[name='buscarEdPersona']").val();
      var trHTML;
      if(persona.trim().length>1){
      $("#edicionUsuario").hide();
      $("#buscarUsuario").show();
      $.ajax( '/findpersona',{type: 'GET',dataType: 'json',data:{persona:persona},
      success: function( data ) 
      {      
      $("#contenedorUsuarios").empty();
      $.each(data, function (i)  {
           if(data[i].estatus=='0'){
      trHTML += '<tr><td><button onclick="editarUSuario('+data[i].idpersona +')">Editar</button></td><td width="40%">' +data[i].abreviatura+' '+data[i].nombre+' '+data[i].apellidopaterno+' '+data[i].apellidomaterno+'<td width="20%">'+data[i].rol+'</td>'+'<td width="20%">'+data[i].descripcion+'</td></tr>';
      }
      });
      $("#contenedorUsuarios").append(trHTML);},
      error: function(  ){console.log( 'respuesta incorrecta ajax' );}});}
});
    
//funcion ajax para buscar personas por ip
 function editarUSuario(idUsuario)
{
      
      var centrotrabajo;
       var nombre ;
      var paterno ;
      var materno; 
      var jefe;
      var profesion;
      var rol;
      var distrito;
      var extension;
      var idPersona;
        $.ajax( '/findpersonaid',{type: 'GET',dataType: 'json',data:{id:idUsuario},
                                  success: function( data ) 
                                                   {            
                                       
                                                 nombre =data[0].nombre;
                                                paterno=data[0].apellidopaterno ;
                                             materno=data[0].apellidomaterno;
                                                 centrotrabajo=data[0].idcentrotrabajo;
                                                jefe=data[0].idjefe;
                                              profesion=data[0].idprofesion;
                                                rol=data[0].idrol;
                                               distrito=data[0].iddistrito;
                                                extension=data[0].idextension;
                                                idPersona=data[0].idpersona;

                                                             },
                                   error: function(){console.log( 'respuesta incorrecta ajax' );},async:false});
                                                  

              $("[name='personaEdNombre']").val(nombre);
                $("[name='personaEdPaterno']").val(paterno);
                $("[name='personaEdMaterno']").val(materno);
              $('#personaEdId').val(idPersona);
                $("[name='personaEdProfesion'] option[value="+profesion+"]").attr('selected', 'selected');
                 $("[name='personaEdPuesto'] option[value="+rol+"]").attr('selected', 'selected');
                  $("[name='personaEdDistrito'] option[value="+distrito+"]").attr('selected', 'selected');

                    var idDistrito = distrito;
              var destino ="[name='personaEdCentro']";


        $.ajax( '/centros',{type: 'GET',dataType: 'json',data:{id:idDistrito},success: function( data ) 
                                                     {
                                                        var options = $(destino);$.each (data, function (i) {
                                                        options.append($("<option />").val(data[i].idcentrotrabajo).text(data[i].centrotrabajo));
                                                       
                                                         });   
                                                               },
                              error: function(  ){console.log( 'respuesta incorrecta ajax' );},
                              async:false});

          var destino1 ="[name='personaEdExtension']";
                var destino2 ="[name='personaEdJefe']";

        $.ajax( '/extensiones',{type: 'GET',dataType: 'json',data:{id:centrotrabajo},success: function( data ) 
                                                     {
                                                        var options = $(destino1);$.each (data, function (i) {
                                                        options.append($("<option />").val(data[i].idextension).text(data[i].descripcion));
                                                       
                                                         });   
                                                               },
                              error: function(  ){console.log( 'respuesta incorrecta ajax' );},
                             async:false});

        $.ajax( '/personas',{type: 'GET',dataType: 'json',data:{id:centrotrabajo},success: function( data ) 
                                                     {
                                                        var options = $(destino2);$.each (data, function (i) {
                                                                                                   options.append($("<option />").val(data[i].idpersona).text(
                                                            data[i].abreviatura+' '+data[i].nombre+' '+  data[i].apellidopaterno+' '+data[i].apellidomaterno   
                                                           ));
                                                         });   
                                                               },
                            error: function(  ){console.log( 'respuesta incorrecta ajax' );},  async:false});
                       $("[name='personaEdCentro'] option[value="+centrotrabajo+"]").attr('selected', 'selected');   
                       $("[name='personaEdJefe'] option[value="+jefe+"]").attr('selected', 'selected');
                       $("[name='personaEdExtension'] option[value="+extension+"]").attr('selected', 'selected');
                       $("#edicionUsuario").show();
                       $("#buscarUsuario").hide();
                         
      }


// para editar por ajax  personas  en el submit del form

$("#personaEdPersona").on("click", function(e) {
        e.preventDefault();


          var nombre =  $("[name='personaEdNombre']").val();
          var paterno =  $("[name='personaEdPaterno']").val();
          var materno =  $("[name='personaEdMaterno']").val();
          var profesion =$("[name='personaEdProfesion']").val();
          var puesto=$("[name='personaEdPuesto']").val();
          var distrito=$("[name='personaEdDistrito']").val();
          var centro=$("[name='personaEdCentro']").val();
          var jefe=$("[name='personaEdJefe']").val();
          var extension=$("[name='personaEdExtension']").val();
           var idpersona=$('#personaEdId').val();
        
           
               var isValid = true;
              $("[name='personaEdNombre'],[name='personaEdPaterno'],[name='personaEdMaterno']").each(function () {
              if ($.trim($(this).val()) == '') {
              isValid = false;
              $(this).css({
              "border": "1px solid red",
              "background": "#FFCECE"
              });
              }
              else {
              $(this).css({
              "border": "",
              "background": ""
              });
              }
              });
                 $('#personaEdNombreError').hide();
              $('#personaEdPaternoError').hide();
              $('#personaEdMaternoError').hide();
              $('#personaEdProfesionError').hide();
              $('#personaEdPuestoError').hide();
              $('#personaEdDistritoError').hide();
              $('#personaEdCentroError').hide();
              $('#personaEdJefeError').hide();
              $('#personaEdExtensionError').hide();

                      
                        if( validarLetras("[name='personaEdNombre']")&&validarLetras("[name='personaEdPaterno']")&&validarLetras("[name='personaEdMaterno']")&&nombre.trim().length>0 && paterno.trim().length>0 && materno.trim().length>0 && profesion!='default'&& puesto!='default'&& distrito!='default'  
                          && centro!='default'   && jefe!='default'  && extension!='default' )
                          {
                      

                             $.ajax( '/editpersonas',{
                              type: 'GET',
                              dataType:'json',
                              data:{idpersona:idpersona,nombre:nombre,paterno:paterno,materno:materno,profesion:profesion,puesto:puesto,distrito:distrito,centro:centro,jefe:jefe,extension:extension},
                                                    success: function( data ) 
                                                            {  
                                                             
                                                               if(data[0]='0')
                                                               {
                                                                alert('Exito al actualizar datos');                                                                                               
                                                                $('#personasModel').modal('hide');
                                                               }else
                                                               {
                                                          alert('Error al actualizar datos'); 
                                                    $('#personasModel').modal('hide');
                                                               }
                                                                  $("[name='personaEdNombre']").val('');
                                                                    $("[name='buscarEdPersona']").val('');
                                                                  
                                                                            $("[name='personaEdPaterno']").val('');
                                                                           $("[name='personaEdMaterno']").val('');
                                                                          $("[name='personaEdProfesion']").prop('selectedIndex',0);
                                                                          $("[name='personaEdPuesto']").prop('selectedIndex',0);
                                                                          $("[name='personaEdDistrito']").prop('selectedIndex',0);
                                                                          $("[name='personaEdCentro']").prop('selectedIndex',0);
                                                                          $("[name='personaEdJefe']").prop('selectedIndex',0);
                                                                          $("[name='personaEdExtension']").prop('selectedIndex',0);
                                                               
                                                            },
                                                    error: function()
                                                            {
                                                                console.log( 'respuesta incorrecta ajax' );
                                                            }
                                                      }
                                    );
                           }else{
              if( nombre.trim().length==0){ $('#personaEdNombreError').show();}
              if( paterno.trim().length==0 ){ $('#personaEdPaternoError').show();}
              if( materno.trim().length==0 ){ $('#personaEdMaternoError').show();}
              if( profesion=='default'){ $('#personaEdProfesionError').show();}
              if( puesto=='default'){ $('#personaEdPuestoError').show();}
              if( distrito=='default'){ $('#personaEdDistritoError').show();}
              if( centro=='default'){ $('#personaEdCentroError').show();}
              if( jefe=='default'){ $('#personaEdJefeError').show();}
              if( extension=='default'){ $('#personaEdExtensionError').show();}             
              }
    });


$("[name='buscarElPersona']").keydown(function() {
            var persona =$("[name='buscarElPersona']").val();
            var trHTML;
            if(persona.trim().length>1){
            $("#eliminarUsuarios").hide();
            $("#buscarEliminarUsuario").show();
             $.ajax( '/findpersona',{type: 'GET',dataType: 'json',data:{persona:persona},
                            success: function( data ) 
                                     {           
            $("#contenedorEliminarUsuarios").empty();
            $.each(data, function (i)  {
            trHTML += '<tr><td><button onclick="eliminarUsuario('+data[i].idpersona +')">Editar</button></td><td width="40%">' +data[i].abreviatura+' '+data[i].nombre+' '+data[i].apellidopaterno+' '+data[i].apellidomaterno+'<td width="20%">'+data[i].rol+'</td>'+'<td width="20%">'+data[i].descripcion+'</td></tr>';
                  });
            $("#contenedorEliminarUsuarios").append(trHTML);},
          error: function(  ){console.log( 'respuesta incorrecta ajax' );}});}
});
    
    //funcion ajax para buscar personas por ip
 function eliminarUsuario(idUsuario)
{
      
      var centrotrabajo;
       var nombre ;
      var paterno ;
      var materno; 
      var jefe;
      var profesion;
      var rol;
      var distrito;
      var extension;
      var idPersona;
        $.ajax( '/findpersonaid',{type: 'GET',dataType: 'json',data:{id:idUsuario},
                                  success: function( data ) 
                                                   {     

                                                 nombre =data[0].nombre;
                                                paterno=data[0].apellidopaterno ;
                                             materno=data[0].apellidomaterno;
                                                 centrotrabajo=data[0].centrotrabajo;
                                                jefe=data[0].idjefe;
                                              profesion=data[0].profesion;
                                                rol=data[0].rol;
                                               distrito=data[0].iddistrito;
                                                extension=data[0].descripcion;
                                                idPersona=data[0].idpersona;

                                  $("[name='personaElNombre']").val(nombre);
                                  $("[name='personaElPaterno']").val(paterno);
                                  $("[name='personaElMaterno']").val(materno);
                                  $('#personaElId').val(idPersona);
                                  $("[name='personaElProfesion'] ").val(profesion);
                                  $("[name='personaElPuesto']").val(rol);
                                  $("[name='personaElCentro']").val(centrotrabajo);          
                                  $("[name='personaElExtension']").val(extension);            
                                  $("#eliminarUsuarios").show();
                                  $("#buscarEliminarUsuario").hide();
                                                             },
                                   error: function(){console.log( 'respuesta incorrecta ajax' );}});
                                                  

      
                         
      }


//funcion ajax para eliminar personas por ip
 function eliminarUSuario(idUsuario)
{
           
        var idPersona;
        var centrotrabajo;
        var nombre ;
        var paterno ;
        var materno; 
        var jefe;
        var profesion;
        var rol;
        var distrito;
        var extension;
        var idPersona;

        $.ajax( '/eliminarpersonaid',{type: 'GET',dataType: 'json',data:{id:idUsuario},
                                  success: function( data ) 
                                                   {                                           
                                                 nombre =data[0].nombre;
                                                paterno=data[0].apellidopaterno ;
                                             materno=data[0].apellidomaterno;
                                                 centrotrabajo=data[0].idcentrotrabajo;
                                                jefe=data[0].idjefe;
                                              profesion=data[0].idprofesion;
                                                rol=data[0].idrol;
                                               distrito=data[0].iddistrito;
                                                extension=data[0].idextension;
                                                idPersona=data[0].idpersona;

                                                             },
                                   error: function(){console.log( 'respuesta incorrecta ajax' );},async:false});
                                                  

              $("[name='personaEdNombre']").val(nombre);
                $("[name='personaEdPaterno']").val(paterno);
                $("[name='personaEdMaterno']").val(materno);
              $('#personaEdId').val(idPersona);
                $("[name='personaEdProfesion'] option[value="+profesion+"]").attr('selected', 'selected');
                 $("[name='personaEdPuesto'] option[value="+rol+"]").attr('selected', 'selected');
                  $("[name='personaEdDistrito'] option[value="+distrito+"]").attr('selected', 'selected');

                    var idDistrito = distrito;
              var destino ="[name='personaEdCentro']";


        $.ajax( '/centros',{type: 'GET',dataType: 'json',data:{id:idDistrito},success: function( data ) 
                                                     {
                                                        var options = $(destino);$.each (data, function (i) {
                                                        options.append($("<option />").val(data[i].idcentrotrabajo).text(data[i].centrotrabajo));
                                                       
                                                         });   
                                                               },
                              error: function(  ){console.log( 'respuesta incorrecta ajax' );},
                              async:false});

          var destino1 ="[name='personaEdExtension']";
                var destino2 ="[name='personaEdJefe']";

        $.ajax( '/extensiones',{type: 'GET',dataType: 'json',data:{id:centrotrabajo},success: function( data ) 
                                                     {
                                                        var options = $(destino1);$.each (data, function (i) {
                                                        options.append($("<option />").val(data[i].idextension).text(data[i].descripcion));
                                                       
                                                         });   
                                                               },
                              error: function(  ){console.log( 'respuesta incorrecta ajax' );},
                             async:false});

        $.ajax( '/personas',{type: 'GET',dataType: 'json',data:{id:centrotrabajo},success: function( data ) 
                                                     {
                                                        var options = $(destino2);$.each (data, function (i) {
                                                                                                   options.append($("<option />").val(data[i].idpersona).text(
                                                            data[i].abreviatura+' '+data[i].nombre+' '+  data[i].apellidopaterno+' '+data[i].apellidomaterno   
                                                           ));
                                                         });   
                                                               },
                            error: function(  ){console.log( 'respuesta incorrecta ajax' );},  async:false});
                       $("[name='personaEdCentro'] option[value="+centrotrabajo+"]").attr('selected', 'selected');   
                       $("[name='personaEdJefe'] option[value="+jefe+"]").attr('selected', 'selected');
                       $("[name='personaEdExtension'] option[value="+extension+"]").attr('selected', 'selected');
                       $("#edicionUsuario").show();
                       $("#buscarUsuario").hide();
                         
      }


$("#personaElPersona").on("click", function(e) {
        e.preventDefault();


        
           var id=$('#personaElId').val();
        
           

                        if( id.trim().length>0 )
                          {
                      
                             $.ajax( '/eliminarpersonaid',{
                              type: 'GET',
                              dataType:'json',
                              data:{id:id},
                                                    success: function( data ) 
                                                            {  
                                                             
                                                               if(data[0]='0')
                                                               {
                                                                alert('Exito al eliminar persona');                                                                                               
                                                                $('#personasModel').modal('hide');
                                                               }else
                                                               {
                                                          alert('Error al actualizar datos'); 
                                                    $('#personasModel').modal('hide');
                                                               }
                                                                  $("[name='personaElNombre']").val('');
                                                                    $("[name='buscarElPersona']").val('');
                                                                  
                                                                            $("[name='personaElPaterno']").val('');
                                                                           $("[name='personaElMaterno']").val('');
                                                                          $("[name='personaElProfesion']").prop('selectedIndex',0);
                                                                          $("[name='personaElPuesto']").prop('selectedIndex',0);
                                                                          $("[name='personaElDistrito']").prop('selectedIndex',0);
                                                                          $("[name='personaElCentro']").prop('selectedIndex',0);
                                                                          $("[name='personaElJefe']").prop('selectedIndex',0);
                                                                          $("[name='personaElExtension']").prop('selectedIndex',0);
                                                               
                                                            },
                                                    error: function()
                                                            {
                                                                console.log( 'respuesta incorrecta ajax' );
                                                            }
                                                      }
                                    );
                           }
    });

$("#agregarExtensiones").on("click", function(e)
 {


          var idDistrito =  $("[name='extAgDistrito']").val();
          var idCentro =  $("[name='extAgCentro']").val();
          var extension =  $("[name='extAgExtension']").val();
           var notas = '';

           if($("[name='extAgNotas']").val())
            {$("[name='extAgNotas']").val();}
          

    var isValid = true;
              $("[name='extAgExtension']").each(function () {
              if ($.trim($(this).val()) == '') {
              isValid = false;
              $(this).css({
              "border": "1px solid red",
              "background": "#FFCECE"
              });
              }
              else {
              $(this).css({
              "border": "",
              "background": ""
              });
              }
              });
              $('#extAgDistritoError').hide();
              $('#extAgCentroError').hide();
              $('#extAgExtensionError').hide();
             
              

       if(validarNumeros("[name='extAgExtension']")&&idDistrito!='default'&&idCentro!='default'&&extension.trim().length>0)
       {

    $.ajax( '/saveextensiones',{
                              type: 'GET',
                              dataType:'json',
                              data:{idDistrito:idDistrito,idCentro:idCentro,extension:extension,notas:notas},
                                                    success: function( data ) 
                                                            {                                                         
                                                        
                                                               if(data["Exito"]=='0')
                                                               {
                                                                alert('Exito al agregar extension');                                                                                               
                                                                $('#extensionesModel').modal('hide');
                                                               }
                                                               if(data["Exito"]=='1')
                                                               {

                                                             if(data["Error"]=='23505')
                                                               {    alert('La extension ya existe en el sistema');        }

                                                          


                                                               }
                                                                  $("[name='extAgExtension']").val('');
                                                                            $("[name='extAgNotas']").val('');
                                                                           $("[name='extAgDistrito']").prop('selectedIndex',0);
                                                                          $("[name='extAgCentro']").prop('selectedIndex',0);
                                                                                            
                                                            },
                                                    error: function()
                                                            {
                                                                console.log( 'respuesta incorrecta ajax' );
                                                            }
                                                      }
                                    );
      }else{
              if( extension.trim().length==0){ $('#extAgExtensionError').show();}
              if( idDistrito=='default'){ $('#extAgDistritoError').show();}
              if( idCentro=='default'){ $('#extAgCentroError').show();}                      
              }


});

$('#extBuscarExtension').keyup(function() {
      var extension =$('#extBuscarExtension').val();
      var trHTML;
      if(extension.trim().length>3){

$("#buscarExtension").show();  $("#editarExtensionTabla").hide();
      $('#buscarExtension').show();
      $.ajax( '/findextension',{type: 'GET',dataType: 'json',data:{extension:extension},
      success: function( data ) 
      {      
      $("#contenedorExtension").empty();
      $.each(data, function (i)  {
      trHTML += '<tr><td><button onclick="editarExtension('+data[i].idextension +')">Editar</button></td><td width="40%">' +data[i].descripcion+'<td width="20%">'+data[i].centro.centrotrabajo+'</td></tr>';
      });
      $("#contenedorExtension").append(trHTML);
    },

      error: function(  ){console.log( 'respuesta incorrecta ajax' );}});}
});



 function editarExtension(id)
{      
        var centrotrabajo;
        var extension ;
        var distrito;
        var idextension;
      
        $.ajax( '/findextensionid',{type: 'GET',dataType: 'json',data:{id:id},
        success: function( data ) 
        {                                 
        centrotrabajo=data["centro"].idcentrotrabajo;
        distrito=data["centro"].iddistrito;
        extension=data["descripcion"];
        notas=data["notas"];
         idextension=data["idextension"];


        },
        error: function(){console.log( 'respuesta incorrecta ajax' );},async:false});
        $("[name='extEdDistrito'] option[value="+distrito+"]").attr('selected', 'selected');
        var destino ="[name='extEdCentro']";    
        $.ajax( '/centros',{type: 'GET',dataType: 'json',data:{id:distrito},success: function( data ) 
        {
        var options = $(destino);$.each (data, function (i) {
        options.append($("<option />").val(data[i].idcentrotrabajo).text(data[i].centrotrabajo));
        });   
        },
        error: function(  ){console.log( 'respuesta incorrecta ajax' );},
        async:false});
        $("[name='extEdCentro'] option[value="+centrotrabajo+"]").attr('selected', 'selected');
        $("[name='extEdExtension']").val(extension);
        $("[name='extEdNotas']").val(notas);
        $('#extensionesEdId').val(idextension);
        
        $("#buscarExtension").hide();  $("#editarExtensionTabla").show();                 
}


$("#personaEdExtension").on("click", function(e)
 {


          var idDistrito =  $("[name='extEdDistrito']").val();
          var idCentro =  $("[name='extEdCentro']").val();
          var extension =  $("[name='extEdExtension']").val();
           var notas = $("[name='extEdNotas']").val();
      var idextension=$('#extensionesEdId').val();


     

    var isValid = true;
              $("[name='extAgExtension']").each(function () {
              if ($.trim($(this).val()) == '') {
              isValid = false;
              $(this).css({
              "border": "1px solid red",
              "background": "#FFCECE"
              });
              }
              else {
              $(this).css({
              "border": "",
              "background": ""
              });
              }
              });
              $('#extEdDistritoError').hide();
              $('#extEdCentroError').hide();
              $('#extEdExtensionError').hide();
             
              

       if(validarNumeros("[name='extEdExtension']")&&idDistrito!='default'&&idCentro!='default'&&extension.trim().length>0)
       {

    $.ajax( '/editextensionid',{
                              type: 'GET',
                              dataType:'json',
                              data:{idextension:idextension,idDistrito:idDistrito,idCentro:idCentro,extension:extension,notas:notas},
                                                    success: function( data ) 
                                                            {                                                         
                                                        
                                                               if(data["Exito"]=='0')
                                                               {
                                                                alert('Exito al editar extension');                                                                                               
                                                                $('#extensionesModel').modal('hide');
                                                               }
                                                               if(data["Exito"]=='1')
                                                               {

                                                             if(data["Error"]=='23505')
                                                               {    alert('La extension ya existe en el sistema');        }

                                                          


                                                               }
                                                                  $("[name='extEdExtension']").val('');
                                                                            $("[name='extEdNotas']").val('');
                                                                           $("[name='extEdDistrito']").prop('selectedIndex',0);
                                                                          $("[name='extEdCentro']").prop('selectedIndex',0);
                                                                                    $("#buscarExtension").show();  $("#editarExtensionTabla").hide();                   
                                                            },
                                                    error: function()
                                                            {
                                                                console.log( 'respuesta incorrecta ajax' );
                                                            }
                                                      }
                                    );
      }else{
              if( extension.trim().length==0){ $('#extEdExtensionError').show();}
              if( idDistrito=='default'){ $('#extEdDistritoError').show();}
              if( idCentro=='default'){ $('#extEdCentroError').show();}                      
              }
});



$('#extEliminarExtension').keyup(function() {
      var extension =$('#extEliminarExtension').val();
      var trHTML;
      if(extension.trim().length>3){

 $("#eliminarExtensionTabla").hide();
      $('#eliminarExtensionPanel').show();
      $.ajax( '/findextension',{type: 'GET',dataType: 'json',data:{extension:extension},
      success: function( data ) 
      {      
      $("#contenedorEliminarExtension").empty();
      $.each(data, function (i)  {
      trHTML += '<tr><td><button onclick="eliminarExtension('+data[i].idextension +')">Ver</button></td><td width="40%">' +data[i].descripcion+'<td width="20%">'+data[i].centro.centrotrabajo+'</td></tr>';
      });
      $("#contenedorEliminarExtension").append(trHTML);     
    },

      error: function(  ){console.log( 'respuesta incorrecta ajax' );}});}
});


     

      function eliminarExtension(id)
{      
    var centrotrabajo;
    var extension ;
    var distrito;
    var idextension;
    var notas;      
    $.ajax( '/findextensionid',{type: 'GET',dataType: 'json',data:{id:id},
    success: function( data ) 
    {                                 
    centrotrabajo=data["centro"].centrotrabajo;
    extension=data["descripcion"];
    notas=data["notas"];
    idextension=data["idextension"];     
        $("[name='extElExtension']").val(extension);
    $("[name='extElNotas']").val(notas);
    $("[name='extElCentro1']").val(centrotrabajo);
    $("#extensionesElId").val(idextension);  
    },
    error: function(){console.log( 'respuesta incorrecta ajax' );}});   
      
    $("#eliminarExtensionTabla").show();     
    $("#eliminarExtensionPanel").hide();   
}



$("#extensionElExtension").on("click", function(e) {
            e.preventDefault();        
            var id=$('#extensionesElId').val();
            if( id.trim().length>0 )
            {
            $.ajax( '/eliminarextensionid',{
            type: 'GET',
            dataType:'json',
            data:{id:id},
            success: function( data ) 
            {                                                               
            if(data["Exito"]=='0')
            {
            alert('Exito al eliminar extension');                                                                                               
            $('#extensionesModel').modal('hide');
            }
            if(data["Exito"]=='1')
            {
            if(data["Error"]=='23503')
            {
            alert('La extension esta asignada a un usuario'); 
            $('#extensionesModel').modal('hide');
            }
            else{alert('No se pudo eliminar la extension'); 
            $('#extensionesModel').modal('hide');}
            }
            $("[name='extElCentro1']").val('');
            $("[name='extElExtension']").val('');

            $("[name='extElNotas']").val('');                                                                  
            },
            error: function()
            {
            console.log( 'respuesta incorrecta ajax' );
            }
            }
            );
            }
});





$("#agregarCentros").on("click", function(e)
 {


          var idDistrito =  $("[name='centroAgDistrito']").val();
          var centro =  $("[name='centroAgCentro']").val();
          var direccion =  $("[name='centroAgDireccion']").val();
          var marcacion =  $("[name='centroAgCodigo']").val();
          var idmateria =  $("[name='centroAgMateria']").val(); 
            var lada =  $("[name='centroAgLada']").val();
          var telefono =  $("[name='centroAgTelefono']").val(); 
               var tipo = $("[name='centroAgTipoCentro']").val(); 



     if(lada.trim().length==0) {lada='0';}
         if(telefono.trim().length==0) {telefono='0';}




                  var isValid = true;
            $("[name='centroAgDireccion'],[name='centroAgCentro']").each(function () {
                if ($.trim($(this).val()) == '') {
                    isValid = false;
                    $(this).css({
                        "border": "1px solid red",
                        "background": "#FFCECE"
                    });
                }
                else {
                    $(this).css({
                        "border": "",
                        "background": ""
                    });
                }
            });  
                 $('#centroAgDistritoError').hide();
              $('#centroAgMateriaError').hide();
              $('#centroAgCentroError').hide();
               $('#centroAgDireccionError').hide();
              $('#centroAgCodigoError').hide();
              $('#centroAgTipoError').hide();

       
          $('#agregarCentros').validator();

          if(marcacion.trim().length==0 ){  $("[name='centroAgCodigo']").val("0");}

       if( validarNumeros("[name='centroAgCodigo']")&&idmateria!='default'&&idDistrito!='default'&&tipo!='default'&&centro.trim().length>0&&direccion.trim().length>0 && isValid == true)
       {

         $.ajax( '/savecentros',{
                              type: 'GET',
                              dataType:'json',
                              data:{idDistrito:idDistrito,centro:centro,direccion:direccion,marcacion:marcacion,idmateria:idmateria,lada:lada,telefono:telefono,tipo:tipo},
                                                    success: function( data ) 
                                                            {                                                         
                                                        
                                                               if(data["Exito"]=='0')
                                                               {
                                                                alert('Exito al agregar centro de trabajo');                                                                                               
                                                                $('#centrosModel').modal('hide');
                                                               }
                                                               if(data["Exito"]=='1')
                                                               {

                                                           alert('Error: No se genero centro de trabajo');       

                                                          
                                                               }
                                                                  $("[name='centroAgCentro']").val('');
                                                                            $("[name='centroAgDireccion']").val('');
                                                                              $("[name='centroAgDireccion']").val('');
                                                                           $("[name='centroAgCodigo']").prop('selectedIndex',0);
                                                                          $("[name='centroAgMateria']").prop('selectedIndex',0);
                                                                                            
                                                            },
                                                    error: function()
                                                            {
                                                                console.log( 'respuesta incorrecta ajax' );
                                                            }
                                                      }
                                    );
      }else{
       
              if( centro.trim().length==0){ $('#centroAgCentroError').show();}
               if( direccion.trim().length==0){ $('#centroAgDireccionError').show();}
                if( idDistrito=='default'){ $('#centroAgDistritoError').show();}
              if( idmateria=='default'){ $('#centroAgMateriaError').show();}   
               if( tipo=='default'){ $('#centroAgTipoError').show();}  
                                 
              }

                  $("[name='centroAgCentro']").val('');
                                                                            $("[name='centroAgDireccion']").val('');
                                                                              $("[name='centroAgCodigo']").val('');

                                                                           $("[name='centroAgCodigo']").prop('selectedIndex',0);
                                                                          $("[name='centroAgMateria']").prop('selectedIndex',0);
});




//funciones para buscar personas en el modal edicion de personas







$('#extBuscarCentro').keyup(function() {
        var centro =$('#extBuscarCentro').val();
        var trHTML;
        if(centro.trim().length>2){
        $("#editarCentroTabla").hide();
        $('#agregarTelefonoPanel').hide(); 
        $('#buscarcentros').show();
        $.ajax( '/findcentro',{type: 'GET',dataType: 'json',data:{centro:centro},
        success: function( data ) 
        {      
        $("#contenedorCentros").empty();
        $.each(data, function (i)  {
        trHTML += '<tr><td><button onclick="editarCentro('+data[i].idcentrotrabajo +')">Editar</button></td><td><button onclick="agregarTelefono('+data[i].idcentrotrabajo +')">Telefonos</button></td><td width="60%">' +data[i].centrotrabajo+'<td width="20%">'+data[i].distrito+'</td></tr>';
        });
        $("#contenedorCentros").append(trHTML);      
        },
        error: function(  ){console.log( 'respuesta incorrecta ajax' );}});}
});



function editarTelefono(id)
{

  var lada=$('#lada'+id).val(); 
  var telefono=$('#tel'+id).val();

       $.ajax( '/editartelefonoid',{
            type: 'GET',
            dataType:'json',
            data:{id:id,lada:lada,telefono:telefono},
            success: function( data ) 
            {                                                               
            if(data["Exito"]=='0')
            {
            alert('Exito al actualizar telefono');                                                                                               
                      }else{ alert('No se actualizo el telefono');        }
                                                                        
            },
            error: function()
            {
            console.log( 'respuesta incorrecta ajax' );
            }
            
            });
      
}//fin de editar telefono por id
function eliminarTelefono(id)
{
       $.ajax( '/eliminartelefonoid',{
            type: 'GET',
            dataType:'json',
            data:{id:id},
            success: function( data ) 
            {                                                               
            if(data["Exito"]=='0')
            {
            alert('Exito al actualizar telefono');                                                                                               
                   $('#lada'+id).hide(); 
 $('#tel'+id).hide();
 $('#edit'+id).hide(); 
 $('#delete'+id).hide();
                      }else{ alert('No se actualizo el telefono');        }
                                                                        
            },
            error: function()
            {
            console.log( 'respuesta incorrecta ajax' );
            }
            
            });
      
}//fin de editar telefono por id

function editarCentro(id)
{      
       var idcentrotrabajo;
       var idmateria;
          var iddistrito;
       var centrotrabajo;
       var domicilio;
       var marcacion;
        var iddomicilio;
      
        $.ajax( '/findcentroid',{type: 'GET',dataType: 'json',data:{id:id},
        success: function( data ) 
        {                                 
        idcentrotrabajo=data[0].idcentrotrabajo;
        iddistrito=data[0].iddistrito;
          idmateria=data[0].idmateria;
        centrotrabajo=data[0].centrotrabajo;
        domicilio=data[0].domicilio;
        marcacion=data[0].codigomarcacion;
         iddomicilio=data[0].idcentrotrabajodomicilio;          
         idtipocentro=data[0].idtipocentro;      
        
       $("[name='centroEdDistrito'] option[value="+iddistrito+"]").attr('selected', 'selected');
        $("[name='centroEdMateria'] option[value="+idmateria+"]").attr('selected', 'selected');
         $("[name='centroEdTipo'] option[value="+idtipocentro+"]").attr('selected', 'selected');
        $("[name='centroEdCentro']").val(centrotrabajo);
        $("[name='centroEdDireccion']").val(domicilio);
         $("[name='centroEdCodigo']").val(marcacion);        
        $('#centroEdId').val(idcentrotrabajo);
         $('#centroEdDomicilioId').val(iddomicilio);
        },
        error: function(){console.log( 'respuesta incorrecta ajax' );}});
                $('#agregarTelefonoPanel').hide(); 
        $("#buscarcentros").hide(); $('#editarCentroTabla').show();             
}


function agregarTelefono(id)
{      
    $("#buscarcentros").hide(); $('#editarCentroTabla').hide();   
    $('#agregarTelefonoPanel').show();   
       $('#centroAgTelId').val(id);   
    
    $.ajax( '/findtelefonocentroid',{type: 'GET',dataType: 'json',data:{id:id},
                  success: function( data1 ) 
                  {   
                  $("#contenedorLada").empty();
                  $.each(data1, function (i)  {
                  $("#contenedorLada").append("<form class='form-inline'> <input type='text' class='form-control' id='lada"+ data1[i].idcentrotrabajotelefono+"'  size='10' value='"+data1[i].lada +"' /><input type='text' class='form-control' id='tel"+ data1[i].idcentrotrabajotelefono+"' value='"+data1[i].telefono +"' /><button type='button' id='edit"+ data1[i].idcentrotrabajotelefono+"' onclick='editarTelefono("+data1[i].idcentrotrabajotelefono+")' class='btn btn-success'> ✓</button><button type='button' id='delete"+ data1[i].idcentrotrabajotelefono+"'onclick='eliminarTelefono("+data1[i].idcentrotrabajotelefono+")'  class='btn btn-danger'>x</button></form>");
                  });
                  },
                  error: function(  ){console.log( 'respuesta incorrecta ajax' );}});      
    $('#agregarTelefonoPanel').show();    
}


$("#agregarTelefonoLada").on("click", function(e)
 {
                var id =  $("#centroAgTelId").val();
                var lada =  $("#agregarLadaCentro").val();
                var telefono =  $("#agregarTelCentro").val();
                var isValid = true;
                $("#agregarTelCentro").each(function () {
                if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                          "border": "1px solid red",
                          "background": "#FFCECE"
                          });
                }
                else {
                $(this).css({
                "border": "",
                "background": ""
                });
                }
                });  

                if(telefono.trim().length>0)
                {
                if(lada.trim().length==0)
                {lada="0";}
                }
                           $.ajax( '/agregartelefonoid',{type: 'GET',dataType: 'json',data:{id:id,lada:lada,telefono:telefono},
        success: function( data1 ) 
        {      
        $("#contenedorEliminarCentro").empty();
           $("#contenedorLada").empty();

                  $.each(data1, function (i)  {
                  $("#contenedorLada").append("<form class='form-inline'> <input type='text' class='form-control' id='lada"+ data1[i].idcentrotrabajotelefono+"'  size='10' value='"+data1[i].lada +"' /><input type='text' class='form-control' id='tel"+ data1[i].idcentrotrabajotelefono+"' value='"+data1[i].telefono +"' /><button type='button' id='edit"+ data1[i].idcentrotrabajotelefono+"' onclick='editarTelefono("+data1[i].idcentrotrabajotelefono+")' class='btn btn-success'> ✓</button><button type='button' id='delete"+ data1[i].idcentrotrabajotelefono+"'onclick='eliminarTelefono("+data1[i].idcentrotrabajotelefono+")'  class='btn btn-danger'>x</button></form>");
                  });
        
        },
        error: function(  ){console.log( 'respuesta incorrecta ajax' );}});

   $("#agregarLadaCentro").val('');
     $("#agregarTelCentro").val('');
 });



$("#centroEdCentro").on("click", function(e)
 {
      var idDistrito =  $("[name='centroEdDistrito']").val();
      var idMateria =  $("[name='centroEdMateria']").val();
       var idtipocentro =  $("[name='centroEdTipo']").val();      
      var centro =  $("[name='centroEdCentro']").val();
      var  Direccion = $("[name='centroEdDireccion']").val();
      var marcacion = $("[name='centroEdCodigo']").val();           
      var idCentro=$('#centroEdId').val(); 
      var idDomicilio=$('#centroEdDomicilioId').val(); 


        var isValid = true;
                  $("[name='centroEdCentro'],[name='centroEdDireccion']").each(function () {
                      if ($.trim($(this).val()) == '') {
                          isValid = false;
                          $(this).css({
                              "border": "1px solid red",
                              "background": "#FFCECE"
                          });
                      }
                      else {
                          $(this).css({
                              "border": "",
                              "background": ""
                          });
                      }
                  });  




                       $('#centroEdDistritoError').hide();
                    $('#centroEdMateriaError').hide();
                    $('#centroEdCentroError').hide();
                     $('#centroEdDireccionError').hide();
                     $('#centroEdTipoError').hide();
               


       if(idDistrito!='default'&&idMateria!='default'&&idtipocentro!='default'&&centro.trim().length>0&&Direccion.trim().length>0&&marcacion.trim().length>0&&idCentro.trim().length>0&&idDomicilio.trim().length>0)
       {
    $.ajax( '/editcentroid',{
                              type: 'GET',
                              dataType:'json',
                              data:{idDistrito:idDistrito,idMateria:idMateria,centro:centro,Direccion:Direccion,marcacion:marcacion,idCentro:idCentro,idDomicilio:idDomicilio,idtipocentro:idtipocentro},
                                                    success: function( data ) 
                                                            {                                                
                                                        
                                                               if(data["Exito"]=='0')
                                                               {
                                                                alert('Exito al editar centros de trabajo');                                                                                               
                                                              $('#centrosModel').modal('hide');
                                                               }
                                                               if(data["Exito"]=='1')
                                                               {

                                                              alert('Erro actualar Centros de trabajo');        }                                                        
                                                             

                                                     


                                                                  $("[name='extEdExtension']").val('');
                                                                            $("[name='extEdNotas']").val('');
                                                                           $("[name='extEdDistrito']").prop('selectedIndex',0);
                                                                          $("[name='extEdCentro']").prop('selectedIndex',0);
                                                                                    $("#buscarExtension").show();  $("#editarExtensionTabla").hide();                   
                                                            },
                                                    error: function()
                                                            {
                                                                console.log( 'respuesta incorrecta ajax' );
                                                            }
                                                      }
                                    );

      $("#buscarcentros").show(); $('#editarCentroTabla').hide();  
      }
      else
      {
              if( centro.trim().length==0){ $('#centroEdCentroError').show();}
               if( Direccion.trim().length==0){ $('#centroAgDireccionError').show();}
                if( idDistrito=='default'){ $('#centroEdDistritoError').show();}
              if( idMateria=='default'){ $('#centroEdMateriaError').show();}  
              if( idtipocentro=='default'){ $('#centroEdTipoError').show();}                        
      }
});







$('#extEliminarCentros').keyup(function() {
        var centro =$('#extEliminarCentros').val();
        var trHTML;
        if(centro.trim().length>2){
        $("#eliminarCentroTabla").hide();
        $('#eliminarCentroPanel').show();
        $.ajax( '/findcentro',{type: 'GET',dataType: 'json',data:{centro:centro},
        success: function( data ) 
        {      
        $("#contenedorEliminarCentro").empty();
        $.each(data, function (i)  {
        trHTML += '<tr><td><button onclick="eliminarCentro('+data[i].idcentrotrabajo +')">Editar</button></td><td width="60%">' +data[i].centrotrabajo+'<td width="20%">'+data[i].distrito+'</td></tr>';
        });
        $("#contenedorEliminarCentro").append(trHTML);      
        },
        error: function(  ){console.log( 'respuesta incorrecta ajax' );}});}
});

     


    function eliminarCentro(id)
{      
          var centrotrabajo;
          var idcentrotrabajo;
          var direccion ;
              var idDireccion ;
          var marcacion;
          var distrito;
          var materia;      
          $.ajax( '/findcentroid',{type: 'GET',dataType: 'json',data:{id:id},
          success: function( data ) 
          {                                 
             idcentrotrabajo=data[0].idcentrotrabajo;
             iddomicilio=data[0].idcentrotrabajodomicilio;
        distrito=data[0].distrito;
          materia=data[0].materia;
        centrotrabajo=data[0].centrotrabajo;
        direccion=data[0].domicilio;
        marcacion=data[0].codigomarcacion;
         
              $("[name='centroElDistrito']").val(distrito);
          $("[name='centroElMateria']").val(materia);
          $("[name='centroElCentro']").val(centrotrabajo);
            $("[name='centroElDireccion']").val(direccion);
              $("[name='centroElCodigo']").val(marcacion);

          $("#centroElId").val(idcentrotrabajo);  
          $("#centroElDomicilioId").val(iddomicilio);  
          },
          error: function(){console.log( 'respuesta incorrecta ajax' );}});   
            
          $("#eliminarCentroTabla").show();     
          $("#eliminarCentroPanel").hide();   
}



// funcion para eliminar centros de trabajo
$('#extEliminarCentrosId').on("click", function(e)
 {
    var idCentro= $("#centroElId").val();  
      var idDomicilio=    $("#centroElDomicilioId").val();  
        var trHTML;
        if(idCentro.trim().length>0&&idDomicilio.trim().length>0){
        $("#eliminarCentroTabla").hide();
        $('#eliminarCentroPanel').show();
        $.ajax( '/eliminarcentroid',{type: 'GET',dataType: 'json',data:{idCentro:idCentro,idDomicilio:idDomicilio},
        success: function( data ) 
        {      
      if(data["Exito"]=='0')
              {
              alert('Exito al eliminar centro de trabajo');                                                                                               
              $('#centrosModel').modal('hide');
              }
              if(data["Exito"]=='1')
              {
              if(data["Error"]=='23503')
              {
              alert('La extension esta asignada a un usuario'); 
              $('#centrosModel').modal('hide');
              }
              else{alert('Error: Nose puede eliminar, Centro actualmente en uso'); 
              $('#centrosModel').modal('hide');}
              }
              $("[name='centroElDistrito']").val('');
          $("[name='centroElMateria']").val('');
          $("[name='centroElCentro']").val('');
            $("[name='centroElDireccion']").val('');
              $("[name='centroElCodigo']").val('');        
        },
        error: function(  ){console.log( 'respuesta incorrecta ajax' );}});}
});






