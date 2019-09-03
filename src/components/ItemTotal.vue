<template>
  <div class="item-total">
    {{text}}:
    <span>{{ddd}}</span>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import { formatDate } from "@/utils/date.js";
import { arrayToStr } from "@/utils/utils.js";
export default {
  name: "ietmTotal",
  props: {
    text: String,
    column: String,
  },
  created(){
    //   console.log(this.computedColumn);
  },
  computed: {
    computedColumn() {
      return this.column.split(",");
    },
    ...mapState({
      ddd(state) {
        let key = [...this.computedColumn];
        const baseStr = `state.form.form`;
        // console.log(baseStr+"["+key[0]+"]")
        let parent = eval(baseStr+"["+key[0]+"]");
        // console.log(parent);
        let filterAry = parent.value
        // console.log(filterAry);
        let value = filterAry.reduce((pre,next)=>pre+ parseFloat(next.find(item=>item.name===this.text).value||"0"),0);
        // console.log(value);
        // this.changeFormData({ key: this.computedColumn, value });
        return value;
      }
    })
  },
  methods: {
    ...mapMutations("form", ["changeFormData"])
  }
};
</script>

<style lang="less" scoped>
.item-total {
    div {
      display: block;
      text-align: left;
      padding: 0 0.5em;
      span {
        color: #000;
      }
      // display: flex;
      // flex-direction: row;
    }
  }
</style>