import { Component, OnInit } from '@angular/core';
// import { questions, title, results } from './../../../assets/data/quizz_questions.json'
import { questions, results, title } from './../../../assets/data/quizz_dev.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title: string = ''
  questions: any
  questionSelected: any

  awnsers: string[] = []
  awnserSelected: string = ''

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = true


  ngOnInit(): void {
    if (questions) {
      this.finished = false
      this.title = title
      this.questions = questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }
  playerChoice(value: string) {
    this.awnsers.push(value)
    this.nextStep()

  }

  async nextStep() {
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAwnser: string = await this.checkResult(this.awnsers)
      this.finished = true
      this.awnserSelected = results[finalAwnser as keyof typeof results]
    }
  }

  async checkResult(awnsers: string[]) {
    const result = awnsers.reduce((previous, current, i, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous
      } else {
        return current
      }
    })
    return result
  }
}
