<template>
  <div class="container py-4">
    <div class="d-flex align-items-center justify-content-between flex-wrap">
      <div class="mx-auto mx-sm-0 mb-5 mb-sm-0">
        <h2>
          Privilege Counter
        </h2>
        <em>Made By Rukanda</em>
      </div>
      <RadialProgressBar
        :diameter="150"
        :strokeWidth="5"
        :completedSteps="isDone ? currentQuestion + 1 : currentQuestion"
        :totalSteps="totalQuestions"
        startColor="#28a745"
        stopColor="#28a745"
        class="mx-auto mx-sm-0"
      >
        <h3 class="mb-0">
          {{ currentQuestion + 1 }}
        </h3>
      </RadialProgressBar>
    </div>
    <template v-if="!isDone">
      <div class="row mt-4 pt-5 mt-sm-5">
        <div class="col-12 text-center">
          <h3>
            <strong>
              <em>{{ question }}</em>
            </strong>
          </h3>
        </div>
      </div>
      <div class="row align-content-stretch mt-5">
        <template v-if="questions[questionsIndex].type === 'multiple'">
          <div
            v-for="(answer, answerIdx) in questions[questionsIndex].answers"
            :key="`answer-${questionsIndex}-${answerIdx}`"
            class="col-6 mx-auto"
          >
            <button
              @click="addPoints(answer.points)"
              class="btn btn-outline-primary btn-block mb-3"
            >
              {{ answer.text }}
            </button>
          </div>
        </template>
        <template v-if="questions[questionsIndex].type === 'boolean'">
          <div class="col-6">
            <button
              @click="
                addBooleanPoints(
                  questions[questionsIndex].data[questionsBooleanIndex]
                    .truePoints
                )
              "
              class="btn btn-outline-success btn-block"
            >
              Ya
            </button>
          </div>
          <div class="col-6">
            <button
              @click="
                addBooleanPoints(
                  questions[questionsIndex].data[questionsBooleanIndex]
                    .falsePoints
                )
              "
              class="btn btn-outline-danger btn-block"
            >
              Tidak
            </button>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="row mt-5 pt-5 text-center">
        <div class="col-12">
          <h3 class="mb-5">
            <strong>
              <em>Level Privilege Anda</em>
            </strong>
          </h3>
          <img class="privilege-image mb-5" :src="privilegeLevelImage" />
          <h5>{{ privilegeLevel }} ({{ totalPoints }})</h5>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

import Etnicity from "@/questions/etnicity";
import Religion from "@/questions/religion";
import Domicile from "@/questions/domicile";
import Income from "@/questions/income";
import Profession from "@/questions/profession";
import Gender from "@/questions/gender";
import Education from "@/questions/education";
import SexOrientation from "@/questions/sex-orientation";
import Attractiveness from "@/questions/attractiveness";

export default {
  components: {
    RadialProgressBar
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      questions: [
        Gender,
        Etnicity,
        Religion,
        Domicile,
        Income,
        Profession,
        Education,
        SexOrientation,
        Attractiveness
      ],
      questionsIndex: 0,
      questionsBooleanIndex: 0,
      currentQuestion: 0,
      totalPoints: 0,
      isDone: false
    };
  },
  computed: {
    question() {
      if (this.questions[this.questionsIndex].type === "multiple") {
        return this.questions[this.questionsIndex].question;
      }

      if (this.questions[this.questionsIndex].type === "boolean") {
        return this.questions[this.questionsIndex].data[
          this.questionsBooleanIndex
        ].question;
      }

      return "";
    },
    totalQuestions() {
      let total = 0;

      this.questions.forEach(question => {
        if (question.type === "multiple") {
          total += 1;
        }

        if (question.type === "boolean") {
          total += question.data.length;
        }
      });

      return total;
    },
    privilegeLevel() {
      if (this.totalPoints < 50) {
        return "Tidak Memiliki Privilege";
      }

      if (this.totalPoints < 199) {
        return "Memiliki Privilege Rendah";
      }

      if (this.totalPoints < 400) {
        return "Memiliki Privilege Menengah";
      }

      if (this.totalPoints >= 400) {
        return "Memiliki Privilege Tinggi";
      }

      return "";
    },
    privilegeLevelImage() {
      if (this.totalPoints < 50) {
        return `${this.publicPath}images/death.png`;
      }

      if (this.totalPoints < 199) {
        return `${this.publicPath}images/sad.png`;
      }

      if (this.totalPoints < 400) {
        return `${this.publicPath}images/feelings.png`;
      }

      if (this.totalPoints >= 400) {
        return `${this.publicPath}images/emoji.png`;
      }

      return "";
    }
  },
  methods: {
    nextBooleanQuestion() {
      if (
        this.questions[this.questionsIndex].data[this.questionsBooleanIndex + 1]
      ) {
        this.questionsBooleanIndex += 1;
        this.currentQuestion += 1;
      } else {
        this.nextQuestion();
      }
    },
    nextQuestion() {
      if (this.questions[this.questionsIndex + 1]) {
        this.questionsIndex += 1;
        this.currentQuestion += 1;
      } else {
        this.isDone = true;
      }
    },
    addBooleanPoints(points) {
      this.totalPoints += points;
      this.nextBooleanQuestion();
    },
    addPoints(points) {
      this.totalPoints += points;
      this.nextQuestion();
    }
  }
};
</script>

<style scoped>
.privilege-image {
  height: 110px;
}
</style>
