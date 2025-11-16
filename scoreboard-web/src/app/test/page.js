"use client"
import React from 'react'

const Test = () => {
  const videoRef = React.useRef(null)
  const photoRef = React.useRef(null)
  const [hasPhoto, setHasPhoto] = React.useState(false) 
  const getVideo= ()=>{
    navigator.mediaDevices.getUserMedia({
      video:{width:1920, 
        height:1080}
    }).then(stream=>{
      let video=videoRef.current
      video.srcObject=stream
      video.play()
    }).catch(err=>{
      console.error(err)
    })
  }
  React.useEffect(()=>{
    getVideo()
  }, [videoRef])
  return (
    <div>
      <div className='camera'>

      <video ref={videoRef}></video>
      <button>Snap</button>
      </div>
      <div
      className={'result' + (hasPhoto?'hasphoto':"")}
      >
        
        <canvas ref={photoRef}></canvas>
        <button>Close</button>
      </div>

    </div>
  )
}

export default Test