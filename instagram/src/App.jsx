import './App.css'
import SideBar from './sideBar'

function App() {
  return (
    <div className='d-flex vh-100'>
      <div className='w-20'><SideBar/></div>
      <div className='w-50 bg-secondary'>feed</div>
      <div className='w-30'>suggestions</div>
    </div>
  )
}

export default App
