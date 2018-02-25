/*
** 利用addDiyDom初始化zTree
*/
function init_tabular_ztree(obj, zSetting, nodes, tSetting)
{
    // tabular_ztree配置参数
    default_setting = {
        cols:[{
            key:"", 
            name:"TREE_NODES", 
            width:0.4
        },{
            key:"k1", 
            name:"COL1", 
            width:0.2
        },{
            key:"k2", 
            name:"COL2", 
            width:0.2
        },{
            key:"k3", 
            name:"COL3", 
            width:0.2
        }],

        config: {
            switch: true, /*zTree展开/折叠图标*/
            space: 20     /*不同层级基础边距*/
        }
    };

    tSetting = $.extend(default_setting, tSetting);

    // 自定义dom
    zSetting.view.addDiyDom = function(treeId, treeNode){
        diyDom(treeId, treeNode, tSetting)
    };

    // 初始化zTree
    var treeObj = $.fn.zTree.init(obj, zSetting, nodes);

    // 添加表头
    var header = treeHeader(tSetting.cols);
    if (obj.find('li')) obj.prepend(header);

    // 设置样式
    obj.addClass("tabular_ztree");

    return treeObj;
}

/*
** 根据配置参数生成表头结构
*/
function treeHeader(cols)
{
    var header = '<li class="tabular_head"><a>';
    for(k in cols){
        header += '<div class="tabular_col" style="width:'+cols[k].width*100+'%;">'+cols[k].name+'</div>';
    }
    header += '</a></li>';

    return header;
}

/*
** 重新组织zTree节点结构，以便配合样式文件显示表格样式
*/
function diyDom(treeId, treeNode, tSetting)
{    
    var spaceWidth = tSetting.config.space; // 左边距控制

    // zTree节点主要dom        
    var liObj = $("#" + treeNode.tId);
    var switchObj = $("#" + treeNode.tId + "_switch"); // 展开/折叠图标
    var checkObj = $("#" + treeNode.tId + "_check");   // checkbox
    var aObj = $("#" + treeNode.tId + "_a");           // 节点
    var icoObj = $("#" + treeNode.tId + "_ico");       // 节点图标
    var spanObj = $("#" + treeNode.tId + "_span");     // 节点名称

    // 删除原位置dom
    switchObj.remove();
    checkObj.remove();
    icoObj.remove();  
    spanObj.remove();              

    // 转移到<div>标签下作为第一列
    var node = $('<div class="tabular_col" style="width:'+tSetting.cols[0].width*100+'%;"></div>');
    var spaceSpan = $('<span style="height:1px;display: inline-block;width:' + (spaceWidth * treeNode.level) + 'px"></span>');
    node.append(spaceSpan);
    if(tSetting.config.switch) node.append(switchObj);
    if(checkObj.length) node.append(checkObj);
    node.append(icoObj);
    node.append(spanObj);
    aObj.append(node);

    // 添加新列
    var editStr = '';
    for(k in tSetting.cols){
        if(k==0) continue;
        editStr += '<div class="tabular_col" style="width:'+tSetting.cols[k].width*100+'%;">' + getData(treeNode[tSetting.cols[k].key], "") + '</div>';
    }
    aObj.append(editStr);
};

/*
** 获取节点属性值
*/
function getData(val, empty){
    return val==null ? empty : val;
}