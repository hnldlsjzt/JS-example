
function checkDeepChildren(array: any[], id: string): boolean {
    let flag = false;
    for (const item of array) {
        console.log('key: ', item);
        if (item?.id === id) {
            flag = true;
        } else if(item?.children?.length > 0) {
            flag = checkDeepChildren(item?.children, id);
        }
        if (flag) {
            return flag;
        }
    }
    return flag;
}
const flat = [
    {
        "id": "3a02f557-945a-1af0-5b31-25eec4059252",
        "name": "父级1",
        "position": [
            114.081314,
            22.536535
        ],
        "region": [
            "广东省",
            "深圳市",
            "福田区"
        ],
        "address": "广东省深圳市福田区福田街道福华路71号荣超城市春天花园",
        "children": []
    },
    {
        "id": "3a02f557-cdaf-48b1-0593-97dfb5fbb206",
        "name": "父级2",
        "position": [
            114.090065,
            22.542877
        ],
        "region": [
            "广东省",
            "深圳市",
            "福田区"
        ],
        "address": "广东省深圳市福田区华强北街道振中路深圳电子院",
        "children": [
            {
                "id": "3a02f557-945a-1af0-5b31-25eec4059252",
                "name": "父级2-1",
                "position": [
                    114.081314,
                    22.536535
                ],
                "region": [
                    "广东省",
                    "深圳市",
                    "福田区"
                ],
                "address": "广东省深圳市福田区福田街道福华路71号荣超城市春天花园",
                "children": []
            },
            {
                "id": "3a02f557-cdaf-48b1-0593-97dfb5fbb206",
                "name": "父级2-2",
                "position": [
                    114.090065,
                    22.542877
                ],
                "region": [
                    "广东省",
                    "深圳市",
                    "福田区"
                ],
                "address": "广东省深圳市福田区华强北街道振中路深圳电子院",
                "children": []
            }
        ]
    }
];
console.log('flat', checkDeepChildren(flat, '3a02f557-cdaf-48b1-0593-97dfb5fbb206'));