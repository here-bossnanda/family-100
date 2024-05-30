import { useState } from "react"
import { cn } from "@/lib/utils"

type AnswerProps = {
  answer: string
  score: number
  isCorrect: boolean
  onClick: () => void
}

function Answer({ answer, score, isCorrect, onClick }: AnswerProps) {
  return (
    <div
      className={cn(
        " w-56 cursor-pointer bg-white relative border transform transition ease-in-out shadow-xl shadow-black/40 [transform-style:preserve-3d] duration-1000",
        isCorrect && "[transform:rotateY(180deg)]"
      )}
      onClick={isCorrect ? undefined : onClick}
    >
      <div className="text-center">???</div>
      <div className="bg-white absolute inset-0 h-fit w-full [transform:rotateY(180deg)] [backface-visibility:hidden] flex justify-between px-4">
        <p>{answer}</p>
        <p>{score}</p>
      </div>
    </div>
  )
}

export default Answer
