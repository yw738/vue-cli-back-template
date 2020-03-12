<template>
  <div class="hello bgWhite">
    <bread :data="bread" />
    <cesTable 
      size='mini'
      :isSelection='true'
      :isIndex='true'
      :isPagination='true'
      :loading='false'
      :isHandle='true'
      :tableData='tableData' 
      :tableCols='tableCols' 
      :tableHandles='tableHandles'
      :pagination='pagination'/>
  </div>
</template>
      <!-- 首页 -->

<script>
import bread from "@/components/Module/Bread";
import cesTable from '@/components/Module/Table';
import {mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
      bread: [
        {
          link: "",
          name: "首页"
        },
        {
          link: "",
          name: "首页"
        }
      ],
      tableData:[
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'张三',age:'12',sex:'男',interst:'女'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'},
        {name:'筱华',age:'27',sex:'女',interst:'羽毛球'}
      ],
      tableCols:[
        {label:'姓名',prop:'name'},
        {label:'年龄',prop:'age'},
        {label:'性别',prop:'sex'},
        {label:'爱好',prop:'interst'},
        {label:'操作',type:'Button',btnList:[
          {type:'primary',label:'编辑',handle:(row,i)=>this.update(row,i)},
          {type:'danger',label:'删除',handle:(row,i)=>this.del(row,i)}
        ]}
      ],
      tableHandles:[
        {label:'新增',type:'primary',handle:row=>''},
         {label:'删除',type:'primary',handle:row=>''}
      ],
      pagination:{
        pageSize:10,
        pageNum:1,
        total:21
      }
    };
  },
  methods: {
    del(res){
      console.log(res)
    },
    update(res,i){
      console.log(res,i);
    }
  },
  computed:{
    ...mapState([
    'userObj'
  ])
  },
  mounted(){
    this.userObj;
  },
  components: {
    bread,
    cesTable
  }
};
</script>

<style scoped>
.hello {
  border: solid 1px #e6e6e6;
}
</style>
