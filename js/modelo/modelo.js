/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    var id;
    var ultimoValorId = this.preguntas.length;
    ultimoValorId > 0 ? id = ultimoValorId : id = 0;
    return id;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {
      'textoPregunta': nombre,
      'id': id,
      'cantidadPorRespuesta': respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    let preguntaBuscada = this.preguntas.find((pregunta) => pregunta.id == id);
    let indexId = this.preguntas.indexOf(preguntaBuscada);
    this.preguntas.splice(indexId, 1);
    this.preguntaEliminada.notificar();
    return this.preguntas;
  },

  //se guardan las preguntas
  guardar: function () {
  },
};
