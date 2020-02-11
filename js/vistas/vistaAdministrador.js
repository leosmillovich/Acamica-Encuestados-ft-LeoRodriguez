/*
* Vista administrador
*/
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasBorradas.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function () {
    contexto.reconstruirLista();
  });


};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.modelo.recuperarDatos();
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    var nuevoItem;

    var nuevoItem = $('<li></li>');
    nuevoItem.addClass('list-group-item');
    nuevoItem.attr('id', pregunta.id)
    nuevoItem.text('pregunta.textoPregunta');
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;
    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function () {
        var respuesta = $(this).val();
        var cantVotos = 0;
        var nuevaRespuesta = {
          'textoRespuesta': respuesta,
          'cantidad': cantVotos
        };
        respuestas.push(nuevaRespuesta);
      });
      respuestas.pop();//saca el bug del ultimo radio vacio
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    e.botonBorrarPregunta.click(function () {
      let id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id);
    });

    e.borrarTodo.click(function () {
      contexto.controlador.borrarTodo();
    });

    e.botonEditarPregunta.click(function () {
      let id = parseInt($('.list-group-item.active').attr('id'));
      if (id) {
        let editada = prompt("Modifique la pregunta: ");
        contexto.controlador.editarPregunta(id, editada);
      } else {
        alert("Escoja una pregunta para editar");
      }
    });
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
