<template>
  <div class="contaner">
    <el-dialog
      title="动画管理"
      :visible.sync="dialogVisible"
      width="50%"
      :append-to-body="true"
      :before-close="handleClose"
    >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="动画名字" width="180">
          <template slot-scope="scope">
              <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            > -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      :page-size.sync="page.pageSize"
                layout="prev, pager, next"
                @current-change="currentChange"
                :total="page.total">
        </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import {getAnimateListPage,deleteAnimate} from "@/api/drawing.js"
export default {
  name:"manageAnimate",
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      page:{
        currentPage:1,
        pageSize:5,
        total:0
      }
    };
  },
  mounted(){
   
  },
  methods: {
    currentChange(e){
        console.log(e)
        this.page.currentPage = e
        this.init()
    },
    async open() {
      await this.init()
      this.dialogVisible = true;
    },
    async init(){
        let res = await getAnimateListPage({currentPage:this.page.currentPage,pageSize:this.page.pageSize})
        if(res.code==200){
            this.tableData = res.data.list
            this.page.total = res.data.total
        }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
    async handleDelete(index, row) {
        console.log(index, row);
        let res = await deleteAnimate({id:row.id})
        if(res.code==200){
            this.$message.success("删除成功")
            this.init()
        }
    }
  },
};
</script>