export const fileUpload = async(file) => {

    if(!file) throw new Error('No tenemos ningún archivo a subir');

    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/react-aprendizaje/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal-2024');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });
        if(!resp.ok) throw Error('No se pudo subir imagen');

        const result = await resp.json();
        
        return result.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}