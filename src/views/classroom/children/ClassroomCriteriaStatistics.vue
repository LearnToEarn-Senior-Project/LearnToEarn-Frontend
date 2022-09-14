<template>
  <div class="p-8" v-if="classroom && criteria">
    <div class="flex items-center justify-between">
      <span class="font-bold text-[48px] truncate mb-2">
        "{{ classroom.name }}" Token Criteria Statistics
      </span>
    </div>

    <Bar
      :chart-data="{
        labels: ['First Criteria', 'Second Criteria', 'Third Criteria'],
        datasets: [
          {
            label: 'Number of students who pass each criteria',
            backgroundColor: '#00017a',
            data: [
              criteria.first.statCount,
              criteria.second.statCount,
              criteria.third.statCount,
            ],
          },
        ],
      }"
      width="150"
      height="50"
    />
  </div>
</template>
<script>
import ClassroomServices from "@/services/ClassroomServices";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  components: { Bar },
  data() {
    return {
      classroom: null,
      criteria: null,
      chartData: {
        labels: ["First", "Second", "Third"],
        datasets: [
          {
            label: "Number of students who pass each criteria",
            backgroundColor: "#00017a",
            data: [],
          },
        ],
      },
    };
  },
  async created() {
    await ClassroomServices.getClassroomCriteria(this.$route.params.id).then(
      () => {
        this.criteria = JSON.parse(
          JSON.stringify(this.$store.getters.getCriteria)
        );
      }
    );
    await ClassroomServices.getClassroom(this.$route.params.id).then(() => {
      this.classroom = this.$store.getters.getClassroom;
    });
  },
};
</script>
