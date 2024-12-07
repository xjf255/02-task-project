import './App.css'
import { Modal } from './components/Modal'
import Header from './components/Header'
import ListItems from './components/ListItems'


export default function App() {
  return (
    <>
      <Header />
      <main>
        <ListItems />
        <Modal />
      </main>
    </>
  )
}