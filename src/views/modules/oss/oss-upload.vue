<template>
  <el-dialog
    title="上传文件"
    :close-on-click-modal="false"
    @close="closeHandle"
    :visible.sync="visible">
    <el-upload
      drag
      :action="url"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      multiple
      :file-list="fileList"
      style="text-align: center;">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只支持jpg、png、gif格式的图片！</div>
    </el-upload>
  </el-dialog>
</template>

<script>

  import request from '@/api/sys/oss'

  export default {
    data () {
      return {
        visible: false,
        url: '',
        num: 0,
        successNum: 0,
        fileList: []
      }
    },
    methods: {
      init (id) {
        let _this = this;
        _this.url = request.getUploadUrl(_this.$cookie.get('token'));
        _this.visible = true
      },
      // 上传之前
      beforeUploadHandle (file) {
        let _this = this;
        if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          _this.$message.error('只支持jpg、png、gif格式的图片！');
          return false
        }
        _this.num++
      },
      // 上传成功
      successHandle (response, file, fileList) {
        let _this = this;
        _this.fileList = fileList;
        _this.successNum++;
        if (response && response.code === 0) {
          if (_this.num === _this.successNum) {
            _this.$confirm('操作成功, 是否继续操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).catch(() => {
              _this.visible = false
            })
          }
        } else {
          _this.$message.error(response.msg)
        }
      },
      // 弹窗关闭时
      closeHandle () {
        this.fileList = [];
        this.$emit('refreshDataList')
      }
    }
  }
</script>
