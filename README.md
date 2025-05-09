# SPMB Backup Service

Service untuk melakukan backup otomatis dari API SPMB SMK Cokroaminoto Wanadadi.

## Persyaratan

-   Node.js (versi 14 atau lebih tinggi)
-   NPM (Node Package Manager)

## Instalasi

1. Clone repository ini:

```bash
git clone <repository-url>
cd spmb-backup
```

2. Install dependencies:

```bash
npm install
```

3. Buat file `.env`:

```bash
cp env.example .env
```

4. Edit file `.env` dan sesuaikan konfigurasi:

```env
# API Configuration
API_URL=<URL>
API_TOKEN=<TOKEN>

# Backup Configuration
BACKUP_DIR=backup
TIMEZONE=Asia/Jakarta

# Schedule Configuration (cron format)
CRON_SCHEDULE=0 */4 * * *
```

## Penggunaan

1. Jalankan service:

```bash
npm start
```

Service akan berjalan dan melakukan backup secara otomatis sesuai jadwal yang ditentukan di file `.env`.

## Konfigurasi

### Format Cron Schedule

Format cron yang digunakan: `* * * * *`

-   Menit (0-59)
-   Jam (0-23)
-   Tanggal (1-31)
-   Bulan (1-12)
-   Hari dalam seminggu (0-6, 0 = Minggu)

Contoh jadwal:

-   `0 */4 * * *` - Setiap 4 jam (00:00, 04:00, 08:00, 12:00, 16:00, 20:00)
-   `0 19 * * *` - Setiap hari pukul 19:00
-   `35 23 * * *` - Setiap hari pukul 23:35

### Timezone

Timezone default adalah `Asia/Jakarta` (WIB). Anda dapat mengubahnya di file `.env` sesuai kebutuhan.

## Struktur File

-   `index.js` - File utama service
-   `.env` - File konfigurasi (buat dari env.example)
-   `backup/` - Direktori untuk menyimpan file backup
-   `package.json` - Konfigurasi project dan dependencies

## Catatan

-   Pastikan server memiliki akses internet untuk melakukan request ke API
-   File backup akan disimpan dengan format: `spmb_backup_YYYY-MM-DD_HH-mm-ss_WIB.sql`
-   Service akan berjalan terus menerus sampai dihentikan (Ctrl+C)
