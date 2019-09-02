<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
      </el-form-item>
      <el-form-item size="mini" label="授权">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {treeDataTranslate} from '@/utils'

  import menuRequest from "@/api/sys/menu";
  import roleRequest from '@/api/sys/role'

  export default {
    data () {
      return {
        visible: false,
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        dataForm: {
          id: 0,
          roleName: '',
          remark: ''
        },
        dataRule: {
          roleName: [
            {required: true, message: '角色名称不能为空', trigger: 'blur'}
          ]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      }
    },
    methods: {
      init (id) {
        let _this = this;
        _this.dataForm.id = id || 0;
        menuRequest.getMenuList().then(data => {
          _this.menuList = treeDataTranslate(data, 'menuId')
        }).then(() => {
          _this.visible = true;
          _this.$nextTick(() => {
            _this.$refs['dataForm'].resetFields();
            _this.$refs.menuListTree.setCheckedKeys([])
          })
        }).then(() => {
          if (_this.dataForm.id) {
            roleRequest.getRoleInfo(_this.dataForm.id).then(data => {
              if (data && data.code === 0) {
                _this.dataForm.roleName = data.role.roleName;
                _this.dataForm.remark = data.role.remark;
                let idx = data.role.menuIdList.indexOf(_this.tempKey);
                if (idx !== -1) {
                  data.role.menuIdList.splice(idx, data.role.menuIdList.length - idx)
                }
                _this.$refs.menuListTree.setCheckedKeys(data.role.menuIdList)
              }
            });
          }
        });
      },
      // 表单提交
      dataFormSubmit () {
        let _this = this;
        _this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let params = {
              'roleId': _this.dataForm.id || undefined,
              'roleName': _this.dataForm.roleName,
              'remark': _this.dataForm.remark,
              'menuIdList': [].concat(_this.$refs.menuListTree.getCheckedKeys(), [_this.tempKey], _this.$refs.menuListTree.getHalfCheckedKeys())
            };
            roleRequest.saveOrUpdateRole(_this.dataForm.id, params).then(data => {
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
            })
          }
        })
      }
    }
  }
</script>
