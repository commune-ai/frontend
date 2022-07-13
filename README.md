
# React-Flow Tree Builder

### Table of Contents
* [How To Run](https://github.com/LVivona/TreeBuilder/blob/main/README.md#how-to-run)
* [Data Format](https://github.com/LVivona/TreeBuilder/blob/main/README.md#Data-Format)
* [External Library](https://github.com/LVivona/TreeBuilder/blob/main/README.md#External-Library)

## How To Run
  This is a simple npx create-react-app so ``npm start`` will run the code; but if you do clone then please **NOTE** it's a older version of react so there is vulnerability so do not use this model for final development. I do just suggest copying the tree.js located **src/tools/build/\*\*.js** as that file does more of the heavy lifting in both creating the information for React-flow to render. 
 
## Data-Format
```python
import os
dir = [{"value" : { "id" : "A", "type" : "dir"}, "children" : None}]
for dirname, dirnames, filenames in os.walk('./A'):
        for currentdir in dirnames:
            dir.append({"value" : { "id" : currentdir, "type" : "dir", "parentId" : dirname.split("/")[-1]}, "children" : None})

        for files in filenames:
            dir.append({"value" : { "id" : files, "type" : files.split(".")[-1], "parentId" : dirname.split("/")[-1]}, "children" : None})


map, node, roots = {}, None, []

for idx, i in enumerate(dir):
    map[i["value"]["id"]] = idx
    i["children"] = []

for i in dir:
    node = i
    if "parentId" in node["value"]:
        dir[map[node["value"]["parentId"]]]["children"].append(node)
    else:
        roots.append(node)

print(roots)
```

```
 {'value': {
                    'id': 'A', 'type': 'dir'
                    }, 
                  'children': [
                    {'value': {
                      'id': 'C', 'type': 'dir', 'parentId': 'A'
                      }, 
                      'children': [
                        {'value': {
                          'id': 'C.txt', 'type': 'txt', 'parentId': 'C'
                          },
                          'children': []
                        },
                        {'value': {
                          'id': 'C.json', 'type': 'json', 'parentId': 'C'
                          },
                        'children': []}
                        ]},
                      {'value': {
                        'id': 'B', 'type': 'dir', 'parentId': 'A'
                        }, 
                      'children': [
                        {'value': {
                          'id': 'D', 'type': 'dir', 'parentId': 'B'
                          },
                          'children': [
                            {'value': {
                              'id': 'D.yaml', 'type': 'yaml', 'parentId': 'D'
                              },
                              'children': []
                            }]},
                            {'value': {
                              'id': 'B.txt', 'type': 'txt', 'parentId': 'B'
                            },
                            'children': []}
                        ]
                      },
                      {'value': {'id': 'A.txt', 'type': 'txt', 'parentId': 'A'},
                      'children': []
                      }
                    ]
                  }
```
### Visual Example 
![alt text](https://github.com/commune-ai/Tree-Bulder/blob/b68e8998ed608adb5bb07d57c1f806925d65ced0/example.png)

## Converted Data

### Node
```
[
  { id       : ...,
    type     : ...,
    data     : { ..., ... },
    position : { x : ..., y : ...},
  },
  ...
]
```

### Edge
```
[
 {  id       : ...,
    source   : parent.id,
    target   : child.id,
    animated : true,
    style    : { ... } 
  },
]
```

You can really put any information withing **value** in the tree you can put a whole new object it's really up to you, and with that you can access that info custom node with React-Flow given if you need to.


## External Library
* React Flow [https://reactflow.dev/]
