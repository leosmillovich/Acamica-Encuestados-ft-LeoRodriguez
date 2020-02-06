/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    let id;
    let ultimoValorId = this.preguntas.length;
    ultimoValorId > 0 ? id = ultimoValorId : id = 0;
    return id;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    let id = this.obtenerUltimoId();
    id++;
    let nuevaPregunta = {
      'textoPregunta': nombre,
      'id': id,
      'cantidadPorRespuesta': respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function (id) {
    //se filtar  y retorna las preguntas que no son iguales al id pasado por parametro
    this.preguntas = this.preguntas.filter((pregunta) => pregunta.id !== id);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodo: function () {
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    //   localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
    //   let preguntasString = localStorage.getItem('preguntas');
    //   let preguntasRecuperadas = JSON.parse(preguntasString);
    //   return preguntasRecuperadas;
  }

};
