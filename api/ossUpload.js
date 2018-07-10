/**
 *
 * @param imgPath 图片路径
 * @param success 成功回调
 * @param fail  失败回调
 * @constructor
 */

const OSS_OPTION = {
  bucket: 'landa-mas'
};

export const OssUpload = ({imgPath, success, fail}) => {
    let name = getFileName(imgPath);
    AliyunOSS.asyncUpload(OSS_OPTION.bucket, `${name}/landa`, imgPath).then((res)=>{
            console.log(res)
           })
           .catch(err => console.log(err))

};

function getFileName (o) {
    let pos=o.lastIndexOf("/");
    return o.substring(pos+1);
};

// export const OssUpload = (imgPath, success, fail) => {
//     AsyncGet(ApiModule.utilityModel.oss_token, {}, true).promise.then((data) => {
//         const {
//             accessid,
//             host,
//             policy,
//             signature,
//             dir,
//         } = data;
//         let name = globalData.userId + "_" + fGetTs() + "." + 'jpg';
//         let file = {uri: imgPath, type: 'application/octet-stream', name: name};
//         let formData = new FormData();
//         formData.append('key', dir + name);
//         formData.append("OSSAccessKeyId", accessid);
//         formData.append("policy", policy);
//         formData.append("Signature", signature);
//         formData.append("file", file);
//         fetch(host, {
//             method: 'post',
//             'Content-Type': 'multipart/form-data; boundary=----theriverswine2017',
//             body: formData,
//         }).then((data) => {
//             LOG("图片上传成功");
//             LOG(JSON.stringify(data));
//             success(name);
//         }).catch((error) => {
//             LOG('图片上传失败' + JSON.stringify(error));
//             fail(error);
//         })
//     }).catch((error) => {
//         LOG('图片上传失败' + JSON.stringify(error));
//         fail(error);
//     })
// };
