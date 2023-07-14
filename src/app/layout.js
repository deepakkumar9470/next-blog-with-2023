import Provider from '@/SessionProvider'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import './globals.css'
import {Nunito} from 'next/font/google'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const nunito = Nunito({ subsets: ['latin'], weight : ['400','500'] })

export const metadata = {
  title: 'Blog App',
  description: 'Blog nextjs app with next auth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <Provider>
      <ToastContainer/>
     <body className={nunito.className}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
     </Provider>
    </html>
  )
}
