import { useState, useEffect, FormEvent } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/toaster"
import Answer from "@/components/Answer"

import questions from "@/lib/questions"

function QuestionPage() {
  const { toast } = useToast()
  const params = useParams()
  const navigate = useNavigate()

  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const questionId: number = +params.questionId!
  const [answers, setAnswers] = useState<Answer[]>(
    questions[questionId].answers.map((a) => ({
      ...a,
      isCorrect: false
    }))
  )
  const nextQuestionId = questionId + 1
  const totalQuestion = Object.keys(questions).length

  useEffect(() => {
    setAnswers(
      questions[questionId].answers.map((a) => ({
        ...a,
        isCorrect: false
      }))
    )
  }, [questionId])

  const goToNextQuestion = () => {
    setLoading(true)
    setAnswers(
      questions[questionId].answers.map((a) => ({
        ...a,
        isCorrect: false
      }))
    )

    // wait 1 second before navigate
    setTimeout(() => {
      setLoading(false)
      setAnswer("")
      navigate(`/${nextQuestionId}`)
    }, 1000)
  }

  const NextButton = () => {
    if (questionId === totalQuestion) {
      return (
        <Link to="/thankyou">
          <Button>Selesai</Button>
        </Link>
      )
    }
    return (
      <div>
        <Button onClick={() => goToNextQuestion()}>
          Pertanyaan ke {nextQuestionId}
        </Button>
      </div>
    )
  }

  const checkAnswer = (event: FormEvent) => {
    event.preventDefault()

    const currentAnswer = answer.toLowerCase()

    const indexCorrectAnswer = answers.findIndex(
      (a) => a.answer.toLowerCase() === currentAnswer
    )

    if (indexCorrectAnswer === -1) {
      toast({
        title: "Jawaban Salah",
        description: "Coba lagi ya!",
        variant: "destructive"
      })
      return
    } else {
      toast({
        title: "Jawaban Benar",
        description: "Selamat!"
      })
      setAnswers((prev) =>
        prev.map((ans, index) => {
          if (index === indexCorrectAnswer) {
            return {
              ...ans,
              isCorrect: true
            }
          }
          return ans
        })
      )
    }
  }

  if (questionId > totalQuestion) {
    return (
      <div>
        <h1>Selesai ~</h1>
      </div>
    )
  }

  return (
    <>
      <div className=" w-full h-screen flex items-center justify-center">
        <div className=" flex flex-col items-center">
          {loading ? (
            <Skeleton className=" h-8 w-[500px] mb-4" />
          ) : (
            <h1 className=" text-3xl mb-4">{questions[questionId].question}</h1>
          )}
          <div className=" mb-16 mx-auto">
            <form className=" flex space-x-2 mb-4" onSubmit={checkAnswer}>
              <Input
                type="text"
                placeholder="Apa Jawaban Kamu?"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button type="submit">Cek Jawaban 🧐</Button>
            </form>
            <div className=" grid grid-cols-2 gap-4">
              {answers.map((a, i) => (
                <Answer
                  key={i}
                  answer={a.answer}
                  score={a.score}
                  isCorrect={a.isCorrect!}
                  onClick={() => {
                    setAnswers((prev) =>
                      prev.map((ans, index) => {
                        if (index === i) {
                          return {
                            ...ans,
                            isCorrect: true
                          }
                        }
                        return ans
                      })
                    )
                  }}
                />
              ))}
            </div>
          </div>
          <NextButton />
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default QuestionPage
