import '../../css/dist/output.css'

export let root = {
    value: "A",
    children: [
        {
            value: "B",
            children: [
                {
                    value: "C",
                    children: [{
                        value: "L",
                        children: []
                    },
                    {
                        value: "M",
                        children: []
                    }]
                },
                {
                    value: "P",
                    children: [                {
                        value: "T",
                        children: []
                    },
                    {
                        value: "U",
                        children: []
                    },
                    {
                        value: "V",
                        children: []
                    }]
                },
                {
                    value: "Q",
                    children: []
                },
                {
                    value: "W",
                    children: []
                }
            ]
        },
        {
            value: "D",
            children: [
                {
                    value: "F",
                    children: [{
                        value: "N",
                        children: []
                    },
                    {
                        value: "O",
                        children: []
                    }]
                },
                {
                    value: "G",
                    children: []
                },
                {
                    value: "R",
                    children: []
                },
                {
                    value: "S",
                    children: []
                }
            ]
        },
        {
            value: "E",
            children: [
                {
                    value: "H",
                    children: []
                },
                {
                    value: "I",
                    children: []
                },
                {
                    value: "J",
                    children: []
                },
                {
                    value: "K",
                    children: []
                },
            ]
        },
    ]
};

class TreeNode {
    constructor(value) {
        this.id = this.makeid(10)
        this.type = `custom`
        this.data = {
            label : value,
            final : 0,
            modifier : 0,
            prevSibling : null,
            children : [] 
        }
        this.hidden = false;
        this.position = {x : 0 , y : 0 }

    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    visit(func) {
        func(this);
        for (let i = 0; i < this.data.children.length; i++) {
            this.data.children[i].visit(func);
        }
    }
}

export class TreeRender {

    constructor(dataRoot, width=1500, height=1500){
        this.NODE_SEP = 250;
        
        this.dataRoot = dataRoot

        this.width = width;
        this.height = height;

        this.nodeRoot = this.prepareData(this.dataRoot, 0, null)

        this.firstPass(this.nodeRoot);
        this.secondPass(this.nodeRoot, 0);
        this.fixNodeConflicts(this.nodeRoot);
    }

    flatten = (root) => {
        var stack = [], nodes = [], edges = [], hashMap = {};
        stack.push(root);

        const visitNode = (node, hashMap, array) => {
            if(!hashMap[node.data.label.id]){
                hashMap[node.data.label.id] = true;
                node.position.x = node.data.final 
                array.push(node)
            }
        }

        while(stack.length !== 0){
            var node = stack.pop()
            visitNode(node, hashMap, nodes)
            if(node.data.children.length > 0){
                for (var i = node.data.children.length - 1; i >= 0; i--){    
                    stack.push(node.data.children[i])
                    edges.push(this.buildEdge(node, node.data.children[i]))
                }
            }
        }
        return {nodes, edges}
    }

    prepareData(node, level, prevSibling) {
        let treeNode = new TreeNode(node.value);
        treeNode.position.y = level;
        treeNode.data.prevSibling = prevSibling;

        for (let i = 0; i < node.children.length; i++) {
            treeNode.data.children.push(
                this.prepareData(
                    node.children[i],
                    level + 400,
                    i >= 1 ? treeNode.data.children[i - 1] : null
                )
            );
        }
        return treeNode;
    }

    firstPass(node) {
        for (let i = 0; i < node.data.children.length; i++) {
            this.firstPass(node.data.children[i]);
        }

        if (node.data.prevSibling) {
            node.position.x = node.data.prevSibling.position.x + 250;
        } else {
            node.position.x = 0;
        }

        if (node.data.children.length === 1) {
            node.data.modifier = node.position.y;
        } else if (node.data.children.length >= 2) {
            let minY = Infinity;
            let maxY = -minY;
            for (let i = 0; i < node.data.children.length; i++) {
                minY = Math.min(minY, node.data.children[i].position.x);
                maxY = Math.max(maxY, node.data.children[i].position.x);
            }
            node.data.modifier = node.position.x - (maxY - minY) / 2;
        }
    }

    secondPass(node, modSum) {
        node.data.final = node.position.x + modSum;
        for (let i = 0; i < node.data.children.length; i++) {
            this.secondPass(node.data.children[i], node.data.modifier + modSum);
        }
    }
    fixNodeConflicts(node) {
        for (let i = 0; i < node.data.children.length; i++) {
            this.fixNodeConflicts(node.data.children[i]);
        }

        for (let i = 0; i < node.data.children.length - 1; i++) {
            // Get the bottom-most contour position of the current node
            let botContour = -Infinity;
            node.data.children[i].visit(
                node => (botContour = Math.max(botContour, node.data.final))
            );

            // Get the topmost contour position of the node underneath the current one
            let topContour = Infinity;
            node.data.children[i + 1].visit(
                node => (topContour = Math.min(topContour, node.data.final))
            );

            if (botContour >= topContour) {
                node.data.children[i + 1].visit(
                    node => (node.data.final += botContour - topContour + 250)
                );
            }
        }
    }

   
     /**
      * buld basic edge
      * @param {*} parent node of the parent
      * @param {*} child  node of the child
      */
     buildEdge = (parent, child) => {
        return {
           id : `e-${parent.id}-${child.id}`,
           class : ' animate-FadeMeOut', 
           source : parent.id,
           target : child.id,
           animated: true,
           type : "custom",
           style: { strokeWidth : "7px"},

        }
     }
}