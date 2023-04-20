/**
 * Impresoras.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'impresoras',
  attributes: {
    idImpresora: {
      type: 'number',
      columnName: 'idImpresora',
      allowNull: false,
      required: true
    },
    negro: {
      type: 'number',
      columnName: 'negro',
      allowNull: false,
      required: true
    },
    amarillo: {
      type: 'number',
      columnName: 'amarillo',
      allowNull: false,
      required: true
    },
    cian: {
      type: 'number',
      columnName: 'cian',
      allowNull: false,
      required: true
    },
    magenta: {
      type: 'number',
      columnName: 'magenta',
      allowNull: false,
      required: true
    },
    imagen: {
      type: 'string',
      columnName: 'imagen',
      allowNull: false,
      required: true
    }
  },
  datastore: 'mysql',

  getDatastore: function () {
    return Impresoras.getDatastore();
  }
};

