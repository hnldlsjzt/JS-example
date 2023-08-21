void function () {
    const data = [
        {
            "id": "2243c2f2-ab51-11ed-b5d7-af390bed7a2f",
            "name": "w-test244",
            "level": 1,
            "children": []
        },
        {
            "id": "3c03e3c9-a932-11ed-b949-c5506d10f46a",
            "name": "maxLength maxLength maxLength maxLength maxLength ",
            "level": 1,
            "children": [
                {
                    "id": "ed0b2ecc-a934-11ed-8f1f-1d70c4f8e2a1",
                    "name": "vvvvvvvvvvvvvvvvv",
                    "level": 2,
                    "children": [
                        {
                            "id": "c3ac9b5c-ab47-11ed-9584-9588b3541c20",
                            "name": "科技公司",
                            "level": 3,
                            "children": [
                                {
                                    "id": "222899cf-ab51-11ed-b5d7-cf78bf89be3a",
                                    "name": "w-test111",
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "87fdd288-a936-11ed-91a5-776b96dbecc3",
                    "name": "ssdsaa",
                    "level": 2,
                    "children": [
                        {
                            "id": "a1ebb36b-a936-11ed-91a5-ff4e2bde1c05",
                            "name": "tttttt",
                            "level": 3,
                            "children": [
                                {
                                    "id": "5816f9a9-ab4f-11ed-a2df-8ff8bb4f73c7",
                                    "name": "w-test22",
                                    "level": 4,
                                    "children": []
                                },
                                {
                                    "id": "2232fa10-ab51-11ed-b5d7-d58ea0b4891e",
                                    "name": "w-test222",
                                    "level": 4,
                                    "children": []
                                }
                            ]
                        },
                        {
                            "id": "70f1b24e-ab4e-11ed-9584-b3a3c6d30202",
                            "name": "w-test3",
                            "level": 3,
                            "children": []
                        },
                        {
                            "id": "70f9efaf-ab4e-11ed-9584-d757793549fc",
                            "name": "w-test4",
                            "level": 3,
                            "children": []
                        },
                        {
                            "id": "5855d76a-ab4f-11ed-a2df-81c3cb7deed2",
                            "name": "w-test23",
                            "level": 3,
                            "children": []
                        },
                        {
                            "id": "223b3771-ab51-11ed-b5d7-7ba72a0c897f",
                            "name": "w-test233",
                            "level": 3,
                            "children": []
                        }
                    ]
                },
                {
                    "id": "919ae999-a936-11ed-91a5-e1d109ec294c",
                    "name": "yyyy",
                    "level": 2,
                    "children": []
                }
            ]
        }
    ]
    function findItem(list, id, key = 'id') {
        let result = null
        // for (const iterator of list || []) {
        //     console.log('iterator[key]: ', iterator[key], id, iterator[key] === id);
        //     if (iterator[key] === id) {
        //         result = iterator
        //         console.log('result: ', result);
        //     }
        //     if (iterator?.children?.length) {
        //         findItem(iterator?.children, id)
        //     }
        // }
        // list.forEach(iterator => {
        //     if (iterator[key] === id) {
        //         result = iterator
        //         console.log('result: ', result);
        //     }
        //     if (!result && iterator?.children?.length) {
        //         result =  findItem(iterator?.children, id)
        //     }
        // });
        for (const iterator of list || []) {
            console.log('iterator[key]: ', iterator[key], id, iterator[key] === id);
            if (iterator[key] === id) {
                result = iterator
                console.log('result: ', result);
                return result
            }
            if (!result && iterator?.children?.length) {
                result = findItem(iterator?.children, id)
            }
        }
        console.log('result:--- ', result);
        return result
    }
    console.log(findItem(data, '222899cf-ab51-11ed-b5d7-cf78bf89be3a'))
}()
