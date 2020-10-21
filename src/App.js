import React, {useState} from 'react';

function App() {

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  const uploadImage = async(e) => {
    // console.log('e.target.file', e.target.files[0])
    const uploadFile = e.target.files[0];
    const formData = new FormData();

    formData.append('file',uploadFile)
    formData.append('upload_preset','companyImages')

    setLoading(true)

    fetch(
        'https://api.cloudinary.com/v1_1/djt6ve0ac/image/upload',
      {
        method: 'POST',
        body: formData
      }
    )
    .then(res => res.json())
    .then(res => {
      console.log('api res: ',res)
      setImage(res.url)
      setLoading(false)
    })
    .catch(err => {
      alert('something went wrong')
      console.log('api error: ',err)
      setLoading(false)
    })

  }

  if(loading) {
    return (
      <img src={require('./assets/loader.gif')} alt="loader" style={{width:'100%'}} />
    )
  }

  return (
    <div className='App'>

      <h2>Upload Image to Cloudinay in React</h2>
      <input type='file' name='file' placeholder='Upload an Image'
      onChange={uploadImage} />

      {
        image ? (
            <div>
              <p>Uploaded Image Url: <b>{image}</b></p> 
              <img src={image} width='300' height='300' alt='uploaded img' />
            </div>
        ) : null
      }
      
    </div>
  );
}

export default App;
