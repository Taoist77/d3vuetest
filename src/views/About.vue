<template>
  <div>
    <svg>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    name: 'about',
    data() {
      return {
        graphData: {}
      }
    },
    created() {
      this.graphData_req()
    },
    computed: {},
    methods: {
      graphData_req() {
        this.$store
          .dispatch('graphData_get')
          .then(this.graph_draw())
      },
      graph_draw() {
        this.graphData = this.$store.getters.graphData
        const svg = d3.select('svg')
        const force = d3.forceSimulation()
        d3.json(this.graphData, function (error, json) {
          if (error) throw error
          force
            .nodes(json.nodes)
            .links(json.links)
            .start()
          let link = svg.selectAll(".link")
            .data(json.links)
            .enter().append("line")
            .attr("class", "link")
          let node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);
          node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) {
              return d.name
            })
          force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
              })
              .attr("y1", function (d) {
                return d.source.y;
              })
              .attr("x2", function (d) {
                return d.target.x;
              })
              .attr("y2", function (d) {
                return d.target.y;
              })
            node.attr("transform", function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            })
          })
        })
      }
    }
  }
</script>

<style>
  .svg {
    height: 500px;
  }
</style>