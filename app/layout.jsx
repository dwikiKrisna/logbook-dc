import Provider from './Provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Log Book Ruang Server',
  description: 'Log Book Ruang Server - Pusat Pelaporan dan Analisis Transaksi Keuangan',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
