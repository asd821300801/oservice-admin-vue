<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="参数名" prop="paramKey">
        <el-input v-model="dataForm.paramKey" placeholder="参数名"></el-input>
      </el-form-item>
      <el-form-item label="参数值" prop="paramValue">
        <el-input v-model="dataForm.paramValue" placeholder="参数值"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

  import request from "@/api/sys/config";

  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          paramKey: '',
          paramValue: '',
          remark: ''
        },
        dataRule: {
          paramKey: [
            {required: true, message: '参数名不能为空', trigger: 'blur'}
          ],
          paramValue: [
            {required: true, message: '参数值不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init (id) {
        let _this = this;
        _this.dataForm.id = id || 0;
        _this.visible = true;
        _this.$nextTick(() => {
          _this.$refs['dataForm'].resetFields();
          if (_this.dataForm.id) {
            request.getConfigInfo(_this.dataForm.id).then(data => {
              if (data && data.code === 0) {
                _this.dataForm.paramKey = data.config.paramKey;
                _this.dataForm.paramValue = data.config.paramValue;
                _this.dataForm.remark = data.config.remark
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        let _this = this;
        _this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let params = {
              'id': _this.dataForm.id || undefined,
              'paramKey': _this.dataForm.paramKey,
              'paramValue': _this.dataForm.paramValue,
              'remark': _this.dataForm.remark
            };
            request.saveOrUpdateConfig(_this.dataForm.id, params).then(data => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    _this.visible = false;
                    _this.$emit('refreshDataList')
                  }
                })
              } else {
                _this.$message.error(data.msg)
              }
            });
          }
        })
      }
    }
  }
</script>
