<template>
  <div class="mod-oss">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button type="primary" @click="configHandle()">云存储配置</el-button>
        <el-button type="primary" @click="uploadHandle()">上传文件</el-button>
        <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="id" header-align="center" align="center" width="80" label="ID"></el-table-column>
      <el-table-column prop="url" header-align="center" align="center" label="URL地址"></el-table-column>
      <el-table-column prop="createDate" header-align="center" align="center" width="180" label="创建时间"></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- 弹窗, 云存储配置 -->
    <config v-if="configVisible" ref="config"></config>

    <!-- 弹窗, 上传文件 -->
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"></upload>

  </div>
</template>

<script>
  import Config from './oss-config'
  import Upload from './oss-upload'

  import request from '@/api/sys/oss'

  export default {
    data () {
      return {
        dataForm: {},
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        configVisible: false,
        uploadVisible: false
      }
    },
    components: {
      Config,
      Upload
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        let _this = this;
        _this.dataListLoading = true;
        let params = {
          'page': _this.pageIndex,
          'limit': _this.pageSize
        };
        request.getOssList(params).then(data => {
          if (data && data.code === 0) {
            _this.dataList = data.page.list;
            _this.totalPage = data.page.totalCount
          } else {
            _this.dataList = [];
            _this.totalPage = 0
          }
          _this.dataListLoading = false
        });
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val;
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 云存储配置
      configHandle () {
        this.configVisible = true;
        this.$nextTick(() => {
          this.$refs.config.init()
        })
      },
      // 上传文件
      uploadHandle () {
        this.uploadVisible = true;
        this.$nextTick(() => {
          this.$refs.upload.init()
        })
      },
      // 删除
      deleteHandle (id) {
        let _this = this;
        let ids = id ? [id] : _this.dataListSelections.map(item => {
          return item.id
        });
        _this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.deleteFile(ids).then(data => {
            if (data && data.code === 0) {
              _this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  _this.getDataList()
                }
              })
            } else {
              _this.$message.error(data.msg)
            }
          });
        }).catch(() => {
        })
      }
    }
  }
</script>
