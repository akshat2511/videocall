console.log(NAME);
let str = NAME.toString();
const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const viderid = document.getElementById('nameesss');

const myPeer = new Peer(undefined, {
  // host: '/',
  // port: '3001'
});
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};
const sendButton = document.getElementById('sendButton');
const muteButton = document.getElementById('muteButton');
const pauseButton = document.getElementById('pauseButton');
let isMuted = false;
let isPaused = false;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
  str: true,
}).then(stream => {
  addVideoStream(myVideo, stream);

  myPeer.on('call', async call => {
    call.answer(stream);
    const video = document.createElement('video');

    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream);
      let p = document.createElement('p');
      p.innerText = str;
      console.log(p.innerText);
      videoGrid.append(p);
    });
  });

  socket.on('user-connected', (userId, NAME) => {
    connectToNewUser(userId, stream, NAME);
  });

  // Chat functionality

});

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close();
});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id, NAME);
});

function connectToNewUser(userId, stream, NAME) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
    let p = document.createElement('p');
    p.innerText = NAME;
    videoGrid.append(p);
  });
  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;

  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);

}




// Mute/unmute audio
muteButton.addEventListener('click', () => {
  isMuted = !isMuted;
  myVideo.muted = isMuted;
  muteButton.innerText = isMuted ? 'Unmute' : 'Mute';
});

// Pause/resume video
pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  if (isPaused) {
    myVideo.pause();
    pauseButton.innerText = 'Resume';
  } else {
    myVideo.play();
    pauseButton.innerText = 'Pause';
  }
});

