<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="bean名称" prop="beanName">
        <el-input v-model="dataForm.beanName" placeholder="spring bean名称, 如: testTask"></el-input>
      </el-form-item>
      <el-form-item label="方法名称" prop="methodName">
        <el-input v-model="dataForm.methodName" placeholder="方法名称"></el-input>
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="dataForm.params" placeholder="参数"></el-input>
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input v-model="dataForm.cronExpression" placeholder="如: 0 0 12 * * ?"></el-input>
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

  import request from '@/api/sys/job'

  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          beanName: '',
          methodName: '',
          params: '',
          cronExpression: '',
          remark: '',
          status: 0
        },
        dataRule: {
          beanName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          methodName: [
            {required: true, message: '方法名称不能为空', trigger: 'blur'}
          ],
          cronExpression: [
            {required: true, message: 'cron表达式不能为空', trigger: 'blur'}
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
            request.getScheduleInfo(this.dataForm.id).then(data => {
              if (data && data.code === 0) {
                _this.dataForm.beanName = data.schedule.beanName;
                _this.dataForm.methodName = data.schedule.methodName;
                _this.dataForm.params = data.schedule.params;
                _this.dataForm.cronExpression = data.schedule.cronExpression;
                _this.dataForm.remark = data.schedule.remark;
                _this.dataForm.status = data.schedule.status;
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
              'jobId': _this.dataForm.id || undefined,
              'beanName': _this.dataForm.beanName,
              'methodName': _this.dataForm.methodName,
              'params': _this.dataForm.params,
              'cronExpression': _this.dataForm.cronExpression,
              'remark': _this.dataForm.remark,
              'status': !_this.dataForm.id ? undefined : _this.dataForm.status
            };
            request.saveOrUpdateSchedule(_this.dataForm.id, params).then(data => {
              if (data && data.code === 0) {
                _this.$message({
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
