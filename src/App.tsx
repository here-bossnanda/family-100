import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className=" w-full h-screen flex items-center justify-center">
      <div>
        <h1 className=" text-3xl mb-4">FAMILY 100 #ceritanya... 🤔</h1>
        <Link to="/1">
          <Button>Pertanyaan ke 1</Button>
        </Link>
      </div>
    </div>
  )
}

export default App
