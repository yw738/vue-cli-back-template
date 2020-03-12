<template>
  <section class="ces-table-page">
    <!-- 表格操作按钮 -->
    <section class="ces-handle" v-if="isHandle">
      <el-button
        v-for="item in tableHandles"
        :size="item.size || size"
        :type="item.type"
        :icon="item.icon"
        @click="item.handle()"
      >{{item.label}}</el-button>
    </section>

    <!-- 数据表格 -->
    <section class="ces-table">
      <el-table
        :data="tableData"
        :size="size"
        height="100%"
        :stripe="true"
        :border="isBorder"
        @select="select"
        @select-all="selectAll"
        v-loading="loading"
        :defaultSelections="defaultSelections"
        @row-click="rowClick"
        ref="cesTable"
      >
        <el-table-column v-if="isSelection" type="selection" align="center"></el-table-column>
        <el-table-column v-if="isIndex" type="index" :label="indexLabel" align="center" width="50"></el-table-column>
        <!-- 数据栏 -->
        <el-table-column
          v-for="item in tableCols"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          show-overflow-tooltip
          :render-header="item.require?renderHeader:null"
        >
          <template slot-scope="scope">
            <!-- html -->
            <span v-if="item.type==='Html'" v-html="item.html(scope.row)"></span>
            <!-- 按钮 -->
            <span v-if="item.type==='Button'">
              <el-button
                v-for="(btn,i) in item.btnList"
                v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row,scope.$index))"
                :key="i"
                :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                :type="btn.type"
                :size="btn.size || size"
                :icon="btn.icon"
                @click="btn.handle(scope.row,scope.$index)"
              >{{(btn.formatter && btn.formatter(scope.row))||btn.label}}</el-button>
            </span>
            <!-- 输入框 -->
            <el-input
              v-if="item.type==='Input'"
              v-model="scope.row[item.prop]"
              :size="size"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @focus="item.focus && item.focus(scope.row)"
            ></el-input>
            <!-- 下拉框 -->
            <el-select
              v-if="item.type==='Select'"
              v-model="scope.row[item.prop]"
              :size="size"
              :props="item.props"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-option
                v-for="op in item.options"
                :label="op[item.props.label]"
                :value="op[item.props.value]"
                :key="op[item.props.value]"
              ></el-option>
            </el-select>
            <!-- 单选 -->
            <el-radio-group
              v-if="item.type==='Radio'"
              v-model="scope.row[item.prop]"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-radio v-for="ra in item.radios" :label="ra.value">{{ra.label}}</el-radio>
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type==='Checkbox'"
              v-model="scope.row[item.prop]"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-checkbox v-for="ra in item.checkboxs" :label="ra.value">{{ra.label}}</el-checkbox>
            </el-checkbox-group>
            <!-- 评价 -->
            <el-rate
              v-if="item.type==='Rate'"
              v-model="scope.row[item.prop]"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            ></el-rate>
            <!-- 开关 -->
            <el-switch
              v-if="item.type==='Switch'"
              v-model="scope.row[item.prop]"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            ></el-switch>
            <!-- 图像 -->
            <img
              style="width:50px;height:50px;float: left;"
              v-if="item.type==='Image'"
              :src="scope.row[item.prop]"
              @click="item.handle && item.handle(scope.row)"
            />
            <!-- 滑块 -->
            <el-slider
              v-if="item.type==='Slider'"
              v-model="scope.row[item.prop]"
              :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            ></el-slider>
            <!-- 文字链接 -->
            <el-link type="primary" v-if="item.type==='TxtDown'&&item.show && item.show(scope.row)" @click="item.handle && item.handle(scope.row)" target="_blank">{{item.prop}}</el-link>
            <!-- 默认 -->
            <span
              v-if="!item.type"
              :style="item.itemStyle && item.itemStyle(scope.row)"
              :class="item.itemClass && item.item.itemClass(scope.row)"
            >{{(item.formatter && item.formatter(scope.row)) || scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <!-- 分页 -->
    <section class="ces-pagination" v-if="isPagination">
      <el-pagination
        style="display: flex;justify-content: center;height: 100%;align-items: center;"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        :page-sizes="pagination.sizesArr || [15, 20, 30, 40, 50, 100]"
        layout="total,sizes ,prev, pager, next,jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.pageNum"
        :total="pagination.total"
      ></el-pagination>
    </section>

  </section>
</template>

<!--表格通用组件 -->

<script>
export default {
  props: {
    size: { type: String, default: "mini" }, // 表格型号：mini,medium,small
    isBorder: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    isHandle: { type: Boolean, default: false }, // 是否启用 表格操作
    tableHandles: { type: Array, default: () => [] },//表格操作 按钮列表
    tableData: { type: Array, default: () => [] }, // 表格数据
    tableCols: { type: Array, default: () => [] }, // 表格列配置
    isSelection: { type: Boolean, default: false }, // 是否显示表格复选框
    defaultSelections: { type: [Array, Object], default: () => null },
    isIndex: { type: Boolean, default: false }, // 是否显示表格索引
    indexLabel: { type: String, default: "序号" },
    isPagination: { type: Boolean, default: true },  // 是否显示分页
    pagination: {
      type: Object,
      default: () => ({ pageSize: 10, pageNum: 1, total: 0 })
    } // 分页数据
  },
  data() {
    return {};
  },
  watch: {
    defaultSelections(val) {
      this.$nextTick(function() {
        if (Array.isArray(val)) {
          val.forEach(row => {
            this.$refs.cesTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.cesTable.toggleRowSelection(val);
        }
      });
    }
  },
  methods: {
    // 表格勾选
    select(rows, row) {
      console.log(rows, row);
      this.$emit("select", rows, row);
    },
    // 全选
    selectAll(rows) {
      console.log(rows);
      this.$emit("select", rows);
    },
    //点击表格的某一行
    rowClick(rows){
       this.$emit("rowClick", rows);
    },
    //分页页数改变
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      console.log(val);
      this.$emit("refresh");
    },
    //分页每页条数改变
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit("refresh");
    },
    renderHeader(h, obj) {
      return h("span", { class: "ces-table-require" }, obj.column.label);
    }
  }
};
</script>


<style>
.ces-table-require::before {
  content: "*";
  color: red;
}
.ces-handle{
  margin-bottom: 20px;
}
.ces-pagination{
  margin-top: 20px; 
}
</style>
