const Hapi = require('@hapi/hapi');
const routes = require('./api/notes/routes');
const NotesService = require('./services/inMemory/notesService');
const notes = require('./api/notes');

const init = async () => {
  const noteService = new NotesService();

  const server = Hapi.server({
    port: '5000',
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['http://notesapp-v1.dicodingacademy.com'],
      },
    },
  });

  // server.route(routes);

  await server.register({
    plugin: notes,
    options: {
      service: noteService,
    },
  });

  await server.start();

  console.log(`server run at ${server.info.uri}`);
};

init();
