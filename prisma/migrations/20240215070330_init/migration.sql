-- CreateTable
CREATE TABLE `Logbook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `janisServer` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `institusi` VARCHAR(255) NOT NULL,
    `noIdentitas` VARCHAR(255) NOT NULL,
    `keperluan` VARCHAR(1000) NOT NULL,
    `waktuMasuk` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `waktuKeluar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `namaPemberiIzin` VARCHAR(255) NOT NULL,
    `parafPemberiIzin` TEXT NOT NULL,
    `namaPendamping` VARCHAR(255) NOT NULL,
    `parafPendamping` TEXT NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'masuk',
    `keterangan` VARCHAR(1000) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
