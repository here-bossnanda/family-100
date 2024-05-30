import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./App.tsx"
import QuestionPage from "./pages/QuestionPage.tsx"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/:questionId",
    element: <QuestionPage />
  },
  {
    path: "/thankyou",
    element: (
      <div className=" w-full h-screen flex items-center justify-center">
        <h1 className=" text-3xl">Makasih yaa udah main 🩷🩷🩷</h1>
      </div>
    )
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
