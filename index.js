const module = require('module');

import { trim, concatenate } from "./@cloudinary/url-gen/actions/videoEdit.cjs";
import { videoSource } from "./@cloudinary/url-gen/qualifiers/concatenate.cjs"

const dropZone = document.getElementById('dropZone');
const dropZoneMessage = document.getElementById('dropZoneMessage');
const dropZoneMusicMessage = document.getElementById('dropZoneMusicMessage');
const quashButton = document.getElementById('quashButton');
const controls = document.getElementById('controls');
const introEffect = document.getElementById('introEffect');
const outroEffect = document.getElementById('outroEffect');
const nextButton = document.getElementById('nextButton');
const generateButton = document.getElementById('generateButton');
const finalPage = document.getElementById('finalPage');
const VideoSize = document.getElementById('VideoSize');
const dropZoneMusic = document.getElementById('dropZoneMusic');

const steps = ["片头", "玩法", "片尾"];
let currentStep = 0;
const uploadedIds = [[],[],[]]; // 保存所有的 public_id

const CLOUD_NAME = 'dhkncgrvz';
const API_KEY = '596928139163148';
const UPLOAD_PRESET = 'testVideo';

// 更新提示消息
function updateMessage() {
  if (currentStep < steps.length) {
    dropZoneMessage.textContent = `请拖入${steps[currentStep]}视频`;
  } else {
    dropZoneMessage.textContent = "所有视频已上传完成！";
  }
}

// 上传文件到 Cloudinary
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    return result;
}

let uploading = false;
async function uploadMusicToCloudinary(file) {
  dropZoneMusicMessage.textContent = " uploading...";
  uploading = true;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    dropZoneMusicMessage.textContent = "上传完成！";
    uploading = false;
    return result.public_id;
}

// 完成上传后显示转场选择
function finishUpload() {
  dropZone.style.display = 'none';
  progressBar.style.display = 'none';
  controls.style.display = 'flex';
}

// 存储 public_id 并更新界面
async function handleFiles(files) {
  if (currentStep >= steps.length) {
    alert("所有视频已上传完成！");
    return;
  }

  const validFiles = Array.from(files).filter(file => file.type.startsWith('video/'));
  if (validFiles.length === 0) {
    alert("请拖入有效的视频文件！");
    return;
  }
  dropZoneMessage.textContent = " uploading...";
  for (const file of validFiles) {
    const response = await uploadToCloudinary(file);
    publicId = response.public_id;
    console.log(publicId)
    if (publicId) {
      uploadedIds[currentStep].push(publicId); // 保存 public_id
    }
  }
  console.log(uploadedIds)
  currentStep++;
  updateMessage();
  if(currentStep > 2){
    finishUpload();
  }
}
// 生成视频编辑 URL
function generateEditUrl(videoIds, effect) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/fl_splice:transition_(name_${effect};du_1),l_video:${videoIds[1]}/fl_layer_apply/${videoIds[0]}`
}

// 设置视频尺寸
function generateVideo(videoid,size){
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/l_audio:${musicId}/b_blurred:400:15,c_pad,w_${size.split('x')[0]},h_${size.split('x')[1]}/${videoid}`
}
// `https://res.cloudinary.com/dhkncgrvz/video/upload/fl_splice/l_audio:ixtubjucabexek5pzt4u/zxs74pif6skqzp1ra3bz`
// `https://res.cloudinary.com/dhkncgrvz/video/upload/fl_splice:transition_(name_fade;du_1.0),l_video:h38ek8s2hw4thcn1zy32/fl_layer_apply/fl_splice:transition_(name_fade),l_video:r0jt5cobovje2i5fsp8y/fl_layer_apply/hk3mi6o0yjty7sdbmvi2.mp4`
// 拖放事件处理
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('active');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('active');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('active');
  handleFiles(e.dataTransfer.files);
});

quashButton.addEventListener('click', () => {
  if(currentStep > 0){
    if(currentStep > 1){
      dropZone.style.display = 'flex';
    progressBar.style.display = 'flex';
    controls.style.display = 'none';
    }
    currentStep--;
    updateMessage();
    uploadedIds[currentStep] = [];
    console.log(uploadedIds)
  }
});

dropZoneMusic.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZoneMusic.classList.add('active');
});

dropZoneMusic.addEventListener('dragleave', () => {
  dropZoneMusic.classList.remove('active');
});

let musicId = null;
dropZoneMusic.addEventListener('drop', async (e) => {
  e.preventDefault();
  dropZoneMusic.classList.remove('active');
  musicId = await uploadMusicToCloudinary(e.dataTransfer.files[0]);
});

let resultUrls = []
nextButton.addEventListener('click', async() => {
  quashButton.style.display = 'none';
  const selectedIntroEffect = introEffect.value;
  const selectedOutroEffect = outroEffect.value;
  nextButton.style.display = 'none';
  var text = document.createTextNode("正在拼接视频，请稍后...");
  document.body.appendChild(text);
  for(let video1 of uploadedIds[0]){
    for(let video2 of uploadedIds[1]){
      let url = generateEditUrl([video1, video2], selectedIntroEffect);
      const response0 = await uploadToCloudinary(url);
      publicId0 = response0.public_id;
      for(let video3 of uploadedIds[2]){
        const editUrl = generateEditUrl([publicId0, video3], selectedOutroEffect);
        const response1 = await uploadToCloudinary(editUrl);
        publicId1 = response1.public_id;
        resultUrls.push(publicId1);
        // 调用 Cloudinary 视频编辑 API 生成视频
        // 完成后下载视频文件并保存到本地
      }
    }
  }
  controls.style.display = 'none';
  finalPage.style.display = 'flex';
  text.remove();
});

  // 创建一个隐藏的a标签
  var a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  
generateButton.addEventListener('click', async() => {
  if(uploading){
    alert("请等待上传完成！");
    return;
  }
  generateButton.style.display = 'none';
  var text = document.createTextNode("正在生成视频，请稍后...");
  document.body.appendChild(text);
  for(let url of resultUrls){
    const finalUrl = generateVideo(url,VideoSize.value);
    var fileName = url; // 下载的文件名
    // 使用XMLHttpRequest下载视频
    var xhr = new XMLHttpRequest();
    xhr.open('GET', finalUrl, true);
    xhr.responseType = 'blob';

    xhr.onload = function() {
      if (xhr.status === 200) {
        // 将视频Blob对象创建一个临时URL
        var videoBlob = xhr.response;
        var url = window.URL.createObjectURL(videoBlob);

        // 设置a标签的属性，并触发点击事件进行下载
        a.href = url;
        a.download = fileName;
        a.click();

        // 释放URL对象
        window.URL.revokeObjectURL(url);
      }
    };
    xhr.send()
  }
  text.value = "生成完成！"
});

updateMessage();