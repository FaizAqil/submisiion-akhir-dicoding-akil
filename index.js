const express = require('express');
const multer = require('multer');
// const { Storage } = require('@google-cloud/storage'); // Komentari ini jika tidak menggunakan Cloud Storage
// const admin = require('firebase-admin'); // Komentari ini jika tidak menggunakan Firestore
// const serviceAccount = require('./path/to/your/serviceAccountKey.json'); // Komentari ini jika tidak menggunakan Firestore

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://<your-database-name>.firebaseio.com" // Komentari ini jika tidak menggunakan Firestore
// });

const app = express();
const upload = multer({ limits: { fileSize: 1000000 } }); // Maksimal 1MB
// const storage = new Storage(); // Komentari ini jika tidak menggunakan Cloud Storage
// const bucket = storage.bucket('your-bucket-name'); // Komentari ini jika tidak menggunakan Cloud Storage

app.post('/predict', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'fail', message: 'Terjadi kesalahan dalam melakukan prediksi' });
    }

    // Simulasi inferensi model
    const result = Math.random() > 0.5 ? 'Cancer' : 'Non-cancer'; // Ganti dengan logika model Anda
    const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';
    const id = require('uuid').v4();
    const createdAt = new Date().toISOString();

    // Simpan hasil ke Firestore (komentari bagian ini jika tidak menggunakan Firestore)
    // await admin.firestore().collection('predictions').doc(id).set({
    //     id,
    //     result,
    //     suggestion,
    //     createdAt
    // });

    res.json({
        status: 'success',
        message: 'Model is predicted successfully',
        data: {
            id,
            result,
            suggestion,
            createdAt
        }
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
