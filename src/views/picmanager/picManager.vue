<template>
  <el-card>
    <el-form :model="searchForm" label-width="120px" ref="searchForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="产品类型" prop="status">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择产品类型"
              style="width: 100%"
              size="small"
            >
              <el-option value="全部">全部</el-option>
              <el-option
                v-for="(item, index) of typeList"
                :key="index"
                :value="item.id"
                :label="item.name"
                >{{ item.name }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品名" prop="name">
            <el-input size="small" v-model="searchForm.name" placeholder="请输入品名" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="margin-left: 10px">
          <el-form-item label-width="0">
            <el-button type="primary" size="small" @click="handleSearch"
              >查询</el-button
            >
            <el-button type="warning" @click="reset('searchForm')" size="small"
              >重置</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" style="margin: 10px 0" @click="add"
      >新增产品</el-button
    >
    <el-table :data="tableData" v-loading="tableLoading" border>
      <el-table-column label="类型" prop="steelName"> </el-table-column>
      <el-table-column label="品名" prop="name"></el-table-column>
      <el-table-column label="说明" prop="steelExplain"></el-table-column>
      <el-table-column label="最新价格" prop="todayPrice">
        <template slot-scope="scope">
          <span
            :style="
              scope.row.todaySituation < 0
                ? 'color: #090'
                : scope.row.todaySituation > 0
                ? 'color: #F00'
                : ''
            "
            >{{ scope.row.todayPrice }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="昨日价格" prop="yesterdayPrice">
        <template slot-scope="scope">
          <span
            :style="
              scope.row.todaySituation < 0
                ? 'color: #090'
                : scope.row.todaySituation > 0
                ? 'color: #F00'
                : ''
            "
            >{{ scope.row.yesterdayPrice }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="涨跌" prop="todaySituation">
        <template slot-scope="scope">
          <span
            :style="
              scope.row.todaySituation < 0
                ? 'color: #090'
                : scope.row.todaySituation > 0
                ? 'color: #F00'
                : ''
            "
            >{{ scope.row.todaySituation }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)"
            >修改产品</el-button
          >
          <el-button size="mini" type="text" @click="history(scope.row)"
            >查看历史</el-button
          >
          <el-button size="mini" type="text" @click="addPic(scope.row.id)"
            >今日价格</el-button
          >
          <el-button size="mini" type="text" @click="handleDel(scope.row)">删除</el-button>
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

    <div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <el-form
          ref="addProjectform"
          :model="addProjectform"
          :rules="addProjectformRules"
          label-width="80px"
        >
          <el-form-item label="品名" prop="name">
            <el-input v-model="addProjectform.name" placeholder="请输入品名" />
          </el-form-item>
          <el-form-item label="产品类型" prop="type">
            <el-select
              v-model="addProjectform.type"
              placeholder="请选择产品类型"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) of typeList"
                :key="index"
                :value="item.id"
                :label="item.name"
                >{{ item.name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="说明" prop="steelExplain">
            <el-input
              v-model="addProjectform.steelExplain"
              placeholder="请输入说明"
            />
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input
              v-model="addProjectform.phone"
              placeholder="请输入联系方式"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="okSure" :loading="btnLoading"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        title="今日价格"
        :visible.sync="dialogPicVisible"
        width="50%"
        :before-close="handlePicClose"
      >
        <el-form
          ref="addPicForm"
          :model="addPicForm"
          :rules="addPicFormRules"
          label-width="80px"
        >
          <el-form-item label="今日价格" prop="pic">
            <el-input v-model="addPicForm.pic" placeholder="请输入今日价格" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handlePicClose">取 消</el-button>
          <el-button type="primary" @click="okPicSure" :loading="btnPicLoading"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import {
  commodityList,
  commodityAddSteel,
  commodityAddSteelPrice,
  commodityListType,
  commodityUpdateSteel,
  commodityDelete,
} from "@/api/pic";

export default {
  name: "picManager",
  data() {
    return {
      tableData: [],
      tableLoading: false,
      dialogVisible: false,
      btnLoading: false,
      dialogPicVisible: false,
      btnPicLoading: false,
      picId: "",
      type: "",
      title: "新增产品",
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
      },
      searchForm: {
        status: "全部",
        name: "",
      },
      addPicForm: {
        pic: "",
      },
      addPicFormRules: {
        pic: [{ required: true, message: "请输入今日价格", trigger: "blur" }],
      },
      addProjectform: {
        name: "",
        type: "",
        steelExplain: "",
        phone: "",
      },
      addProjectformRules: {
        name: [{ required: true, message: "请输入品名", trigger: "blur" }],
        type: [
          { required: true, message: "请选择产品类型", trigger: "change" },
        ],
      },
      typeList: [],
    };
  },
  mounted() {
    this.getTypeList();
    this.getList();
  },
  methods: {
    handleSearch() {
      this.getList();
    },
    reset(name) {
      this.$refs[name].resetFields();
    },
    getTypeList() {
      const data = {
        pageDataCount: 100,
        queryPageNum: 1,
      };

      commodityListType(data)
        .then((res) => {
          if (res.success) {
            this.typeList = res.list;
          }
        })
        .finally(() => {});
    },
    handleDel(row) {
      this.$confirm("此操作将永久删除该类型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const f = new FormData();
          f.append("id", row.id);
          commodityDelete(f).then((res) => {
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
    getList() {
      const data = {
        equal: {
          status:
            this.searchForm.status == "全部" ? "" : this.searchForm.status,
          name: this.searchForm.name,
        },
        pageDataCount: this.page.pageSize,
        queryPageNum: this.page.currentPage,
      };

      this.tableLoading = true;
      commodityList(data)
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
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.page.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
    add() {
      this.type = "add";
      this.title = "新增产品";

      this.getTypeList();

      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.type = "edit";
      this.getTypeList();
      this.dialogVisible = true;
      this.title = "修改产品";

      this.addProjectform = {
        name: row.name,
        type: row.steelStauts.toString(),
        steelExplain: row.steelExplain || "",
        phone: row.phone || "",
        id: row.id,
      };
    },
    handleClose() {
      this.$refs["addProjectform"].resetFields();
      this.dialogVisible = false;
    },
    handlePicClose() {
      this.$refs["addPicForm"].resetFields();
      this.dialogPicVisible = false;
    },
    okSure() {
      this.$refs["addProjectform"].validate((valid) => {
        if (valid) {
          const data = {
            name: this.addProjectform.name,
            steelExplain: this.addProjectform.steelExplain,
            phone: this.addProjectform.phone,
            steelStauts: parseInt(this.addProjectform.type),
          };
          this.btnLoading = true;

          if (this.type == "add") {
            commodityAddSteel(data)
              .then((res) => {
                if (res.success) {
                  this.$message.success("产品添加成功");
                  this.getList();
                  this.handleClose();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .finally(() => {
                this.btnLoading = false;
              });
          } else if (this.type == "edit") {
            data.id = this.addProjectform.id;

            commodityUpdateSteel(data)
              .then((res) => {
                if (res.success) {
                  this.$message.success("产品修改成功");
                  this.getList();
                  this.handleClose();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .finally(() => {
                this.btnLoading = false;
              });
          }
        }
      });
    },
    history(row) {
      this.$router.push("./history?id=" + row.id + "&name=" + row.name);
    },
    addPic(id) {
      this.picId = id;
      this.dialogPicVisible = true;
    },
    okPicSure() {
      this.$refs["addPicForm"].validate((valid) => {
        if (valid) {
          const data = {
            price: this.addPicForm.pic,
            createTime: this.formatData(),
            productId: this.picId,
          };
          this.btnPicLoading = true;

          commodityAddSteelPrice(data)
            .then((res) => {
              if (res.success) {
                this.$message.success("价格添加成功");
                this.getList();
                this.handlePicClose();
              } else {
                this.$message.error(res.msg);
              }
            })
            .finally(() => {
              this.btnPicLoading = false;
            });
        }
      });
    },
    formatData() {
      const d = new Date();
      const y = d.getFullYear();
      const m =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      return y + "-" + m + "-" + day;
    },
  },
};
</script>

<style>
</style>