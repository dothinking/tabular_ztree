function init_tabular_ztree(obj, setting, nodes, cols)
{
    obj.addClass("table_ztree");

    // 自定义dom
    setting.view.addDiyDom = function(treeId, treeNode){
        diyDom(treeId, treeNode, cols)
    };

    // 初始化树
    var treeObj = $.fn.zTree.init(obj, setting, nodes);

    // 添加表头
    var header = treeHeader(cols);
    if (obj.find('li')) obj.prepend(header);

    return treeObj;
}

function treeHeader(cols)
{
    var tree_head = '<li class="tree_head"><a>';
    tree_head +='<div class="diy" style="width:'+cols.title.width*100+'%;">'+cols.title.name+'</div>';

    for(k in cols.contents){
        tree_head += '<div class="diy" style="width:'+cols.contents[k].width*100+'%;">'+cols.contents[k].name+'</div>';
    }

    tree_head += '</a></li>';

    return tree_head;
}

function diyDom(treeId, treeNode, cols)
{    
    var spaceWidth = 15; // 左边距控制

    // ztree节点主要dom        
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
    var node = $('<div class="diy" style="width:'+cols.title.width*100+'%;"></div>');
    var spaceSpan = $('<span style="height:1px;display: inline-block;width:' + (spaceWidth * treeNode.level) + 'px"></span>');
    node.append(spaceSpan);
    node.append(switchObj);
    if(checkObj.length)node.append(checkObj);
    node.append(icoObj);
    node.append(spanObj);
    aObj.append(node);

    // 添加新列
    var editStr = '';
    for(k in cols.contents){
        editStr += '<div class="diy" style="width:'+cols.contents[k].width*100+'%;">' + getData(treeNode[cols.contents[k].key], "") + '</div>';
    }
    aObj.append(editStr);
};

function getData(val, empty){
    return val==null ? empty : val;
}