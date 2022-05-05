/*
 * @Author: 张涛
 * @Date: 2020-07-23 11:28:52
 * @LastEditTime: 2020-07-23 14:54:51
 * @Description: 
 * @FilePath: /算法与数据结构/掘金/真题.js
 */
void function () {
    //  两数求和问题
    // 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
    // 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

    //     示例: 给定 nums = [2, 7, 11, 15], target = 9
    // 因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]

    // 常规的做法
    function count(arr, target) {
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 1; j < len; j++) {
                if (arr[i] + arr[j] === target) {
                    console.log(arr[i], arr[j]);
                    return [i, j]
                }
            }
        }
    }
    // console.log(count([2, 7, 11, 15], 17))
    // 做算法题时，发现有2层循环时，都可以思考，利用空间换时间，优化为1层循环
    // 结论：所有求和的问题，都可以转化为求差问题。转化一下，事情会变得简单
    function mapCount(arr, target) {
        let diffs = {}
        let map = new Map();
        let len = arr.length
        for (let i = 0; i < len; i++) {
            // diffs中不存在该值
            // if (diffs[target - arr[i]] !== undefined) {
            //     return [diffs[target - arr[i]], i]
            // }
            // diffs[arr[i]] = i

            if (map.has(target - arr[i])) {
                return [map.get(target - arr[i]), i]
            }
            map.set(arr[i], i)
            console.log('map', map);
        }

    }
    console.log(mapCount([2, 7, 11, 15], 13))
}()


void function () {
    //  合并2个有序数组
    /**
     * 真题描述：给定2个有序整数nums1和nums2，请将nums2合并到nums1中，使nums1称为有序数组
     * 说明：初始化nums1和nums2的元素数量分为别m和n，可以假设nums1有足够的空间来保存nums2中的元素
     */
    /**
     * 示例：
     * nums1 = [1,2,3,0,0,0],m=3
     * nums2 = [2,5,6] n =3
     * 输出[1,2,2,3,5,6]
     */
    const merge = function (nums1, m, nums2, n) {
        // 初始化两个指针的指向，初始化nums1尾部索引k
        let i = m - 1, j = n - 1, k = m + n - 1;
        while (i >= 0 && j >= 0) {
            // 取较大的值，从末尾往前填补
            if (nums1[i] >= nums2[j]) {
                nums1[k] = nums1[i]
                i--;
            } else {
                nums1[k] = nums2[j]
                j--;
            }
            k--;
        }
        // 当nums2留下的情况
        while (j >= 0) {
            nums1[k] = nums2[j]
            k--;
            j--;
        }
    }
    const nums1 = [1, 2, 3, 0, 0, 0]
    const m = 3
    const nums2 = [2, 5, 6]
    const n = 3
    console.log(merge(nums1, m, nums2, n))
    console.log(nums1);
}()
