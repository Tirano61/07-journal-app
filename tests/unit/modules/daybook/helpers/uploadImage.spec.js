

import axios from 'axios'
import cloudinary from 'cloudinary'
import uploadImage from "../../../../../src/modules/daybook/helpers/uploadImage";

cloudinary.config({
    cloud_name: 'ddkavwbkd',
    api_key: '161583326911261',
    api_secret: '6jPVrs2iXCZGJ6sZ_DnFTYGbIhM'
})

describe('Pruebas en el UploadImage', () => {
    
    test('Debe cargar un archivo y retornar el url', async ( done ) => {
        
        const { data } = await axios.get('https://res.cloudinary.com/ddkavwbkd/image/upload/v1631393312/fpjkr9lodkbwvwkv5ivm.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.jpg');

        const url = await uploadImage(file)

        expect(typeof url).toBe('string')

        // Tomar el id
        const segments = url.split('/')
        const imagId = segments[segments.length -1].replace('.jpg', '' )
        cloudinary.v2.api.delete_resources(imagId, {}, () => {
            done()
        })

    })
    

})
