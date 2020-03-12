<template>
  <section>
     <el-table 
     :data="tableData" 
     size='mini'
     style="width: 100%">
         <el-table-column label="属性" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="属性值" >
          <template slot-scope="scope">
            <el-checkbox-group v-if="scope.row.type==='checkbox'&&scope.row.checkboxs" v-model="tableValue[scope.row.prop]" @change="scope.row.handChange&&scope.row.handChange(scope.row.prop,tableValue[scope.row.prop])">
              <el-checkbox v-for="(ra,index) in scope.row.checkboxs" :label="ra.value" :key="index">{{ra.label}}</el-checkbox>
            </el-checkbox-group>
            <el-input v-if="scope.row.type==='input'" size="mini" style="width:300px;" v-model="tableValue[scope.row.prop]"/>
            <span 
              v-if="!scope.row.type"
             >{{ scope.row.propVal }}</span>
          </template>
        </el-table-column>
      </el-table>
  </section>
</template>

<!--表格组件2 特殊 表格 -->
<script>
export default {
  props: {
    loading: { type: Boolean, default: false },
    tableData: { type: Array, default: () => [] }, // 表格数据
    tableValue: {type:Object} // 绑定值
  },
  
};
</script>

