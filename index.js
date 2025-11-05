const express = require('express');
const app = express();
const port = process.env.PORT || 5200;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create
app.post('/Hotel', async (req, res) => {
  const { tipe_kamar, kapasitas_tamu, lantai,fasilitas, tanggal_pesanan} = req.body;
  
  if (!tipe_kamar || !kapasitas_tamu|| !lantai || !fasilitas || !tanggal_pesanan) {
    return res.status(400).json({ error: 'Masih' });
  }

  try {
    const Hotel = await db.Hotel.create({ tipe_kamar, kapasitas_tamu, lantai, fasilitas, tanggal_pesanan });
    res.status(201).json(Hotel);
  } catch (error) {
    console.error('POST /Sudah Penuh:', error);
    res.status(500).json({ error: 'Tanggal tersebut sudah terisi', details: error.message });
  }
});

// Read all
app.get('/Hotel', async (req, res) => {
  try {
    const Hotel = await db.Hotel.findAll();
    res.status(200).json(Hotel);
  } catch (error) {
    console.error('GET /Hotel Penuh:', error);
    res.status(500).json({ error: 'Cie Gagal'});
  }
});

// Update
app.put('/Hotel/:id', async (req, res) => {
  const HotelId = req.params.id;
  const { tipe_kamar, kapasitas_tamu, lantai, fasilitas, tanggal_pesanan } = req.body;

  try {
    const Hotel = await db.Hotel.findByPk(HotelId);
    if (!Hotel) return res.status(404).json({ error: 'Hotel sudah terpesan' });

    await Hotel.update({ tipe_kamar, kapasitas_tamu, lantai, fasilitas, tanggal_pesanan });
    res.status(200).json(Hotel);
  } catch (error) {
    console.error(`PUT /Hotel/${HotelId} error:`, error);
    res.status(500).json({ error: 'Gagal memperbarui' });
  }
});

// Delete
app.delete('/Hotel/:id', async (req, res) => {
  const HotelId = req.params.id;
  try {
    const Hotel = await db.Hotel.findByPk(HotelId);
    if (!Hotel) return res.status(404).json({ error: 'Nomer Hotel tidak ditemukan' });

    await Hotel.destroy();
    res.status(200).json({ message: 'Nomer Hotel berhasil dihapus' });
  } catch (error) {
    console.error(`DELETE /Hotel/${HotelId} error:`, error);
    res.status(500).json({ error: 'Gagal menghapus' });
  }
});

// Initialize DB and start server
db.sequelize
  .authenticate()
  .then(() => db.sequelize.sync())
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('DB connection or sync error:', err);
    process.exit(1);
  });


  