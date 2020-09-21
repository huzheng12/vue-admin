function sortOut(
  parentArr,
  dictionary,
  id,
  name,
  pid,
  staffs,
  isNeedStaff,
  isNeedStaffNum
) {
  let res = [];
  parentArr &&
    parentArr.forEach((item) => {
      let _id = item[id];
      let _staffs = [];
      let _staffsNum = 0;
      if (isNeedStaff) {
        _staffs = item[staffs]["items"]; // 父级员工
      }
      if (isNeedStaffNum) {
        _staffsNum = item[staffs]["page"]["totalElements"]; // 员工总数
      }
      let subDepartments = dictionary[_id]; // 子级部门
      // 拿到子级部门结果
      let subRes = sortOut(
        subDepartments,
        dictionary,
        id,
        name,
        pid,
        staffs,
        isNeedStaff,
        isNeedStaffNum
      );
      // 添加父级员工
      if (isNeedStaff && _staffs && _staffs.length) {
        _staffs.forEach((item) => {
          subRes.push({
            id: item[id],
            name: item[name],
            isStaff: true
          });
        });
      }
      // 添加树节点和子级节点
      res.push({
        id: item[id],
        parentId: item[pid],
        name: item[name],
        children: subRes,
        staffNum: _staffsNum || 0
      });
    });
  // console.log("res,", res)
  return res;
}

export function treeDataTranslate(
  data,
  isNeedStaff = false,
  isNeedStaffNum = false,
  id = "id",
  name = "name",
  pid = "pid",
  staffs = "staffs"
) {
  let topArr = [];
  let temp = {};
  // 先转换成用parentId表示的东西
  data.forEach((item) => {
    let parentId = item[pid];
    if (parentId === 0) {
      topArr.push(item);
    } else if (temp[parentId]) {
      temp[parentId].push(item);
    } else {
      temp[parentId] = [item];
    }
  });
  return sortOut(topArr, temp, id, name, pid, staffs, isNeedStaff, isNeedStaffNum);
  // 递归整理
}
/**
 * 转换tree结构数据的键名
 * @param {array} treeArr 要转换的树的数组
 * @param {object} mapKey 键值对映射
 * @param {object} tokey 转换的key  { label: 'title1', value: 'value1',pid: 'pid', children: 'children1' }) 非必传，不传的话默认value label children
 * @param {boolen} isReturnArr true 没有子元素的时候返回空数组，false没有子元素的时候返回null
 * @description 转换tree结构数据的键名
 */

export const convertTree = obj => {
  const result = []
  // 遍历 treeArr
  obj.treeArr.forEach(item => {
    // 读取 map 的键值映射
    const value = item[obj.mapKey.value]
    const pid = item[obj.mapKey.pid]
    const label = item[obj.mapKey.label]
    const sortNum = item[obj.mapKey.sortNum]
    let children =
      item[obj.mapKey.children] && item[obj.mapKey.children].length > 0 ? item[obj.mapKey.children] : obj.isReturnArr ? [] : null
    // debugger
    // 如果有子节点，递归
    if (children) {
      children = obj.tokey
        ? convertTree({
          treeArr: children,
          mapKey: obj.mapKey,
          tokey: obj.tokey,
          isReturnArr: obj.isReturnArr
        })
        : convertTree({
          treeArr: children,
          mapKey: obj.mapKey,
          isReturnArr: obj.isReturnArr
        })
    }
    let data = {}
    if (obj.tokey) {
      data[obj.tokey.value ? obj.tokey.value : 'value'] = value
      data[obj.tokey.label ? obj.tokey.label : 'label'] = label
      data[obj.tokey.pid ? obj.tokey.pid : 'pid'] = pid
      data[obj.tokey.sortNum ? obj.tokey.sortNum : 'sortNum'] = sortNum
      if (children && children.length > 0) {
        // 如果children没有值，则不要children这个字段
        data[obj.tokey.children ? obj.tokey.children : 'children'] = children
      }
      result.push(data)
    } else {
      result.push(
        children && children.length > 0 ? { value, label, pid, children, sortNum } : { value, label, pid, sortNum }
      )
    }
  })
  return result
}


export function arrayToJson(treeArray) {
  var r = [];
  var tmpMap = {};
  for (var i = 0, l = treeArray.length; i < l; i++) {
    // 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
    tmpMap[treeArray[i]["id"]] = treeArray[i];
  }
  for (i = 0, l = treeArray.length; i < l; i++) {
    var key = tmpMap[treeArray[i]["pid"]];
    //循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
    //如果这一项数据属于哪个数据的子级
    if (key) {
      // 如果这个数据没有children
      if (!key["children"]) {
        key["children"] = [];
        key["children"].push(treeArray[i]);
        // 如果这个数据有children
      } else {
        key["children"].push(treeArray[i]);
      }
    } else {
      //如果没有这个Key值，就代表找不到属于哪个数据，那就代表没有父级,直接放在最外层
      r.push(treeArray[i]);
    }
  }
  return r
}

export function arrayToJson2(treeArray, ids = 'mkey', pids = 'pkey') {
  let id = ids
  let pid = pids
  var r = [];
  var tmpMap = {};
  for (var i = 0, l = treeArray.length; i < l; i++) {
    // 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
    tmpMap[treeArray[i][id]] = treeArray[i];
  }
  for (i = 0, l = treeArray.length; i < l; i++) {
    var key = tmpMap[treeArray[i][pid]];
    //循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
    //如果这一项数据属于哪个数据的子级
    if (key) {
      // 如果这个数据没有children
      if (!key["children"]) {
        key["children"] = [];
        key["children"].push(treeArray[i]);
        // 如果这个数据有children
      } else {
        key["children"].push(treeArray[i]);
      }
    } else {
      //如果没有这个Key值，就代表找不到属于哪个数据，那就代表没有父级,直接放在最外层
      r.push(treeArray[i]);
    }
  }
  return r
}


export function dealWithData(data) {
  let c = [];
  let d = {};
  data.forEach(element => {
    if (!d[element.rootmenu]) {
      c.push({
        rootmenu: element.rootmenu,
        allData: [element]
      });
      d[element.rootmenu] = element;
    } else {
      c.forEach(ele => {
        if (ele.rootmenu == element.rootmenu) {
          ele.allData.push(element);
        }
      });
    }
  });
  return c;
}
