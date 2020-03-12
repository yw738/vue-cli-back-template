<template>
  <section>
    <el-dialog :title="title" :visible.sync="diaLog" width="30%" :before-close="diaLogData.handle">
      <section>
        <searchForm 
        ref="div2"
        :searchData="SearchData" 
        :labelWidth="diaLogData.labelWidth || '100px'" 
        :size="diaLogData.size || 'mini'" 
        :searchForm="SearchForm"
        :refName="diaLogData.ref"/>
        <!-- 传入，被绑定数据以及 要生成的表单 -->
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="item in Handle"
          :icon="item.icon || ''"
          @click="item.handle(diaLogData.ref)"
          :type="item.type"
        >{{item.label}}</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import searchForm from "@/components/Module/From";

export default {
  data(){
    return{
      diaLog:false
    }
  },
  props: {
    that: { type: Object, default: this },
    Handle: { type: Array,default: () => []},
    SearchData: {type: Object, default: () => {}},
    SearchForm: { type: Array,default: () => []},
    diaLogData:{type: Object, default: () => {}},
    diaLogName:{type:Boolean,default:()=>false},
    title:{
      type:String,
      default:''
    }
  },
  methods: {
    init(){
      this.diaLog = true;
    },
    cancel(){
      this.diaLog = false;
    },
    submit(){
      
    }
  },
  components: {
    searchForm
  }
};
</script>

<style lang='less' scoped>
</style>