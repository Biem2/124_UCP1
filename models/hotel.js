// models/Hotel.js
module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    tipe_kamar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    kapasitas_tamu: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lantai: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fasilitas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggal_pesanan: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Hotels', // atau nama tabel kamu
    timestamps: false
  });

  return Hotel;
};

