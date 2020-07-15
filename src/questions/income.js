export default {
  type: "multiple",
  question: "Berapa Penghasilan Perbulan Anda ?",
  answers: [
    {
      text: "Belum Berpenghasilan",
      points: -250
    },
    {
      text: "Dibawah 3,5 Juta Rupiah",
      points: -50
    },
    {
      text: "3,5 - 10 Juta Rupiah",
      points: 0
    },
    {
      text: "10 - 25 Juta Rupiah",
      points: 10
    },
    {
      text: "25 - 100 Juta Rupiah",
      points: 100
    },
    {
      text: "Lebih dari 100 Juta Rupiah",
      points: 200
    },
    {
      text: "Lebih dari 250 Juta Rupiah",
      points: 250
    }
  ]
};
