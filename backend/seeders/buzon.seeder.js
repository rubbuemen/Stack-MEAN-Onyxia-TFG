const { Seeder } = require('mongoose-data-seed');
const { Buzon } = require('../models/buzon.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '5f1843ed6dcb57a61ef4f7d4',
    esPorDefecto: true,
    notificaciones: ['617d8d17116642291cadc0d7', '617d8d4c116642291cadc114', '617d8d78116642291cadc14d', '617d92f4116642291cadc682'],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '5f18443545a65f09bd6a0e19',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '5f18442749489cf33164546a',
    esPorDefecto: true,
    notificaciones: ['617d8d17116642291cadc0d7', '617d8d4c116642291cadc114', '617d8d78116642291cadc14d', '617d92f4116642291cadc682'],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d7a5848838a3cd89c3ffb',
    esPorDefecto: true,
    notificaciones: [
      '617d7ebf90d73963f412f7bc',
      '617d8d17116642291cadc0dc',
      '617d8d4c116642291cadc119',
      '617d8d78116642291cadc152',
      '617d92f4116642291cadc687',
    ],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '617d7a5848838a3cd89c3ffd',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d7a5848838a3cd89c3fff',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '617d85de116642291cadbb91',
    esPorDefecto: true,
    notificaciones: ['617d8965116642291cadbd5d', '617d8d17116642291cadc0e1', '617d8d4c116642291cadc11e', '617d8d78116642291cadc157'],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '617d85de116642291cadbb93',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d85de116642291cadbb95',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '617d8871116642291cadbcd2',
    esPorDefecto: true,
    notificaciones: ['617d8968116642291cadbd69', '617d8d17116642291cadc0e6', '617d8d4c116642291cadc123', '617d8d78116642291cadc15c'],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '617d8871116642291cadbcd4',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d8871116642291cadbcd6',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '617d88f0116642291cadbd06',
    esPorDefecto: true,
    notificaciones: ['617d896a116642291cadbd75', '617d8d17116642291cadc0eb', '617d8d4c116642291cadc128', '617d8d78116642291cadc161'],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '617d88f0116642291cadbd08',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d88f0116642291cadbd0a',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '617d8b10116642291cadbeff',
    esPorDefecto: true,
    notificaciones: ['617d8b63116642291cadbf7b', '617d8d4c116642291cadc12d'],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '617d8b10116642291cadbf01',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d8b10116642291cadbf03',
    esPorDefecto: true,
    notificaciones: ['617d8d17116642291cadc0f0'],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '617d8c42116642291cadc00d',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '617d8c42116642291cadc00f',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d8c42116642291cadc011',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '617d8ca1116642291cadc03b',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de entrada',
  },
  {
    _id: '617d8ca1116642291cadc03d',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de salida',
  },
  {
    _id: '617d8ca1116642291cadc03f',
    esPorDefecto: true,
    notificaciones: [],
    nombre: 'Buzón de eliminados',
  },
  {
    _id: '617d92fa116642291cadc6c7',
    esPorDefecto: false,
    notificaciones: ['617d92f4116642291cadc67f'],
    nombre: 'Mis cosas',
  },
];

class BuzonesSeeder extends Seeder {
  async shouldRun() {
    return Buzon.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Buzon.create(data);
  }
}

module.exports.Buzones = BuzonesSeeder;
