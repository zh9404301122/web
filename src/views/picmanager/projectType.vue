/**
 * 产品类型
 * @author zdf
 * @date 2020-01-21
 */
<template>
  <el-card>
    <el-button type="primary" style="margin: 10px 0" @click="add"
      >新增</el-button
    >
    <el-table :data="tableData" v-loading="tableLoading" border>
      <el-table-column label="品名" prop="name"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px"
      >
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入类型名称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="okSure" :loading="btnLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  commodityAddType,
  commodityListType,
  commodityUpdateType,
  commodityDeleteType,
} from "@/api/pic";

export default {
  name: "projectType",
  data() {
    return {
      tableData: [],
      tableLoading: false,
      type: "",
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      title: "新增",
      addForm: {
        name: "",
      },
      addFormRules: {
        name: [{ required: true, message: "请输入类型名称", trigger: "blur" }],
      },
      btnLoading: false,
      dialogVisible: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    add() {
      this.type = "add";
      this.dialogVisible = true;
    },
    okSure() {
      const data = {
        name: this.addForm.name,
      };
      this.btnLoading = true;

      if (this.type == "add") {
        commodityAddType(data)
          .then((res) => {
            if (res.success) {
              this.$message.success("添加成功");
              this.handleClose();
              this.getList();
            } else {
              this.$message.error(res.msg);
            }
          })
          .finally(() => {
            this.btnLoading = false;
          });
      } else if (this.type == "edit") {
        data.id = this.addForm.id;

        commodityUpdateType(data)
          .then((res) => {
            if (res.success) {
              this.$message.success("修改成功");
              this.handleClose();
              this.getList();
            } else {
              this.$message.error(res.msg);
            }
          })
          .finally(() => {
            this.btnLoading = false;
          });
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.btnLoading = false;
      this.addForm = {
        name: "",
      };
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.addForm.name = row.name;
      this.addForm.id = row.id;
      this.title = "修改";
      this.type = "edit";
    },
    getList() {
      const data = {
        pageDataCount: this.page.pageSize,
        queryPageNum: this.page.currentPage,
      };

      this.tableLoading = true;
      commodityListType(data)
        .then((res) => {
          if (res.success) {
            this.tableData = res.list;
            this.page.total = res.page.totalCount;
          }
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    handleDel(row) {
      this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const f = new FormData();
          f.append('id', row.id);
          commodityDeleteType(f).then((res) => {
            if (res.success) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getList();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
  },
};
</script>

<style>
</style>