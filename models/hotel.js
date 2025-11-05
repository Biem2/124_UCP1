module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Tipe_Kamar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Kapasitas_Tamu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lantai: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Fasilitas: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Tanggal_Pesan: {
        type: DataTypes.DATE,
        allowNull: false,
    }
  }, {
    tableName: "Hotel",
    freezeTableName: true,
    timestamps: true,
  });

  return Hotel;
};