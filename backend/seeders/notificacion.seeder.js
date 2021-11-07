const { Seeder } = require('mongoose-data-seed');
const { Notificacion } = require('../models/notificacion.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d7ebf90d73963f412f7bc',
    leido: true,
    receptoresVisitantes: [],
    receptoresMiembros: ['617d7a5848838a3cd89c4001'],
    asunto: 'Solicitud para ser miembro aceptada',
    cuerpo:
      '!Felicidades! Tu solicitud para ser miembro ha sido aceptada, a continuación procede a realizar el pago para formalizar la inscripción y pasar a ser miembro',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 17:19:59'),
  },
  {
    _id: '617d8965116642291cadbd5d',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: ['617d85de116642291cadbb97'],
    asunto: 'Solicitud para ser miembro aceptada',
    cuerpo:
      '!Felicidades! Tu solicitud para ser miembro ha sido aceptada, a continuación procede a realizar el pago para formalizar la inscripción y pasar a ser miembro',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:05:25'),
  },
  {
    _id: '617d8968116642291cadbd69',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: ['617d8871116642291cadbcd8'],
    asunto: 'Solicitud para ser miembro aceptada',
    cuerpo:
      '!Felicidades! Tu solicitud para ser miembro ha sido aceptada, a continuación procede a realizar el pago para formalizar la inscripción y pasar a ser miembro',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:05:28'),
  },
  {
    _id: '617d896a116642291cadbd75',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: ['617d88f0116642291cadbd0c'],
    asunto: 'Solicitud para ser miembro aceptada',
    cuerpo:
      '!Felicidades! Tu solicitud para ser miembro ha sido aceptada, a continuación procede a realizar el pago para formalizar la inscripción y pasar a ser miembro',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:05:30'),
  },
  {
    _id: '617d8b63116642291cadbf7b',
    leido: true,
    receptoresVisitantes: [],
    receptoresMiembros: ['617d8b10116642291cadbf05'],
    asunto: 'Solicitud para ser miembro aceptada',
    cuerpo:
      '!Felicidades! Tu solicitud para ser miembro ha sido aceptada, a continuación procede a realizar el pago para formalizar la inscripción y pasar a ser miembro',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:13:55'),
  },
  {
    _id: '617d8d17116642291cadc0d7',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 31/10/2021',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 31/10/2021 aproximadamente de 11:00 a 13:00 en Sevilla este, cede principal. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:21:11'),
  },
  {
    _id: '617d8d17116642291cadc0dc',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 31/10/2021',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 31/10/2021 aproximadamente de 11:00 a 13:00 en Sevilla este, cede principal. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:21:11'),
  },
  {
    _id: '617d8d17116642291cadc0e1',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 31/10/2021',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 31/10/2021 aproximadamente de 11:00 a 13:00 en Sevilla este, cede principal. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:21:11'),
  },
  {
    _id: '617d8d17116642291cadc0e6',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 31/10/2021',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 31/10/2021 aproximadamente de 11:00 a 13:00 en Sevilla este, cede principal. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:21:11'),
  },
  {
    _id: '617d8d17116642291cadc0eb',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 31/10/2021',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 31/10/2021 aproximadamente de 11:00 a 13:00 en Sevilla este, cede principal. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:21:11'),
  },
  {
    _id: '617d8d17116642291cadc0f0',
    leido: true,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 31/10/2021',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 31/10/2021 aproximadamente de 11:00 a 13:00 en Sevilla este, cede principal. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:21:11'),
  },
  {
    _id: '617d8d4c116642291cadc114',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 30/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 30/1/2022 aproximadamente de 10:00 a 13:30 en Sevilla este, en la sede. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:04'),
  },
  {
    _id: '617d8d4c116642291cadc119',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 30/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 30/1/2022 aproximadamente de 10:00 a 13:30 en Sevilla este, en la sede. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:04'),
  },
  {
    _id: '617d8d4c116642291cadc11e',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 30/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 30/1/2022 aproximadamente de 10:00 a 13:30 en Sevilla este, en la sede. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:04'),
  },
  {
    _id: '617d8d4c116642291cadc123',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 30/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 30/1/2022 aproximadamente de 10:00 a 13:30 en Sevilla este, en la sede. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:04'),
  },
  {
    _id: '617d8d4c116642291cadc128',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 30/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 30/1/2022 aproximadamente de 10:00 a 13:30 en Sevilla este, en la sede. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:04'),
  },
  {
    _id: '617d8d4c116642291cadc12d',
    leido: true,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
      '617d8b10116642291cadbf05',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 30/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 30/1/2022 aproximadamente de 10:00 a 13:30 en Sevilla este, en la sede. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:04'),
  },
  {
    _id: '617d8d78116642291cadc14d',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 5/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 5/1/2022 aproximadamente de 18:00 a 20:00 en Casa de Danlok. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:48'),
  },
  {
    _id: '617d8d78116642291cadc152',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 5/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 5/1/2022 aproximadamente de 18:00 a 20:00 en Casa de Danlok. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:48'),
  },
  {
    _id: '617d8d78116642291cadc157',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 5/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 5/1/2022 aproximadamente de 18:00 a 20:00 en Casa de Danlok. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:48'),
  },
  {
    _id: '617d8d78116642291cadc15c',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 5/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 5/1/2022 aproximadamente de 18:00 a 20:00 en Casa de Danlok. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:48'),
  },
  {
    _id: '617d8d78116642291cadc161',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: [
      '6176fb9fbb184b72d44bd108',
      '617d7a5848838a3cd89c4001',
      '617d85de116642291cadbb97',
      '617d8871116642291cadbcd8',
      '617d88f0116642291cadbd0c',
    ],
    asunto: 'Una nueva reunión ha sido publicada para el día 5/1/2022',
    cuerpo:
      'Se ha publicado una reunión que se celebrará el día 5/1/2022 aproximadamente de 18:00 a 20:00 en Casa de Danlok. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
    emisorMiembro: '6176fb9fbb184b72d44bd108',
    fecha: new Date('2021/10/30 18:22:48'),
  },
  {
    _id: '617d92f4116642291cadc67f',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: ['6176fb9fbb184b72d44bd108', '617d7a5848838a3cd89c4001'],
    asunto: 'Creación de evento',
    cuerpo: 'Buenas, he creado el evento como me pediste.',
    emisorMiembro: '617d85de116642291cadbb97',
    fecha: new Date('2021/10/30 18:46:12'),
  },
  {
    _id: '617d92f4116642291cadc682',
    leido: false,
    receptoresVisitantes: [],
    receptoresMiembros: ['6176fb9fbb184b72d44bd108', '617d7a5848838a3cd89c4001'],
    asunto: 'Creación de evento',
    cuerpo: 'Buenas, he creado el evento como me pediste.',
    emisorMiembro: '617d85de116642291cadbb97',
    fecha: new Date('2021/10/30 18:46:12'),
  },
  {
    _id: '617d92f4116642291cadc687',
    leido: true,
    receptoresVisitantes: [],
    receptoresMiembros: ['6176fb9fbb184b72d44bd108', '617d7a5848838a3cd89c4001'],
    asunto: 'Creación de evento',
    cuerpo: 'Buenas, he creado el evento como me pediste.',
    emisorMiembro: '617d85de116642291cadbb97',
    fecha: new Date('2021/10/30 18:46:12'),
  },
];

class NotificacionesSeeder extends Seeder {
  async shouldRun() {
    return Notificacion.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Notificacion.create(data);
  }
}

module.exports.Notificaciones = NotificacionesSeeder;
